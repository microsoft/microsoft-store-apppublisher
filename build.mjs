// Unified bundler for both distributables, replacing @vercel/ncc.
//
// Both the GitHub Action and the Azure DevOps task are bundled with esbuild as
// CommonJS. CommonJS is required for the ADO task (the Azure Pipelines agent
// loads task entry points via require(); an ESM entry point fails to load), and
// it works equally well for the node24 GitHub Action runtime. esbuild happily
// bundles the ESM-only @actions/* toolkit into the CommonJS output, so a single
// tool and module format now cover both targets.
import * as esbuild from 'esbuild'
import {copyFileSync, existsSync, readFileSync, writeFileSync} from 'node:fs'
import path from 'node:path'

const common = {
  bundle: true,
  platform: 'node',
  format: 'cjs',
  // Target the lowest runtime we ship to (ADO Node20_1 handler); the output also
  // runs unchanged on the node24 GitHub Action runtime and the ADO Node24 handler.
  target: 'node20',
  legalComments: 'none'
}

// GitHub Action bundle -> dist/index.js (referenced by action.yml).
await esbuild.build({
  ...common,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js'
})

// Azure DevOps task bundle -> setup-msstore-cli-task/index.js (referenced by task.json).
const adoResult = await esbuild.build({
  ...common,
  entryPoints: ['src/azure-devops-task.ts'],
  outfile: 'setup-msstore-cli-task/index.js',
  metafile: true
})

// azure-pipelines-task-lib / azure-pipelines-tool-lib read their localized string
// resources (lib.json) from disk at runtime relative to the bundle, so place them
// next to the generated index.js.
copyFileSync(
  'node_modules/azure-pipelines-task-lib/lib.json',
  'setup-msstore-cli-task/lib.json'
)
copyFileSync(
  'node_modules/azure-pipelines-tool-lib/lib.json',
  'setup-msstore-cli-task/lib2.json'
)

// Third-party license notice for the published Marketplace extension
// (vss-extension.json references licenses.txt as its thirdpartynotice).
writeThirdPartyNotices(adoResult.metafile, 'setup-msstore-cli-task/licenses.txt')

function writeThirdPartyNotices(metafile, outFile) {
  const packages = new Set()
  for (const input of Object.keys(metafile.inputs)) {
    const match = input
      .replace(/\\/g, '/')
      .match(/node_modules\/((?:@[^/]+\/)?[^/]+)/)
    if (match) packages.add(match[1])
  }

  let notice = 'THIRD-PARTY SOFTWARE NOTICES AND INFORMATION\n\n'
  for (const name of [...packages].sort()) {
    const dir = path.join('node_modules', name)
    let version = ''
    try {
      version = JSON.parse(
        readFileSync(path.join(dir, 'package.json'), 'utf8')
      ).version
    } catch {
      // ignore packages without a readable manifest
    }
    const licenseFile = [
      'LICENSE',
      'LICENSE.md',
      'LICENSE.txt',
      'license',
      'license.md',
      'LICENCE'
    ]
      .map(f => path.join(dir, f))
      .find(existsSync)
    const text = licenseFile ? readFileSync(licenseFile, 'utf8').trim() : ''
    notice += `${'='.repeat(72)}\n${name}${version ? '@' + version : ''}\n${'='.repeat(72)}\n${text}\n\n`
  }
  writeFileSync(outFile, notice)
}
