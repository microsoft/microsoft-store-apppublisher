import * as path from 'path'
import * as os from 'os'
import * as crypto from 'crypto'
import * as fs from 'fs'

export function getConfig(version: string): MSStoreCLIConfigurator {
  return new MSStoreCLIConfigurator(version || 'latest')
}

export interface IPipeline {
  debug(message: string): void
  addPath(p: string): void
  mkdirP(p: string): Promise<void>
  downloadTool(url: string): Promise<string>
  extractTar(archivePath: string, dest: string): Promise<string>
  extractZip(archivePath: string, dest: string): Promise<string>
  rmRF(p: string): Promise<void>
  exec(command: string, args: string[]): Promise<number>
  moveSync(downloadPath: string, toolPath: string): void
}

export class MSStoreCLIConfigurator {
  version: string

  constructor(version: string) {
    this.version = version
  }

  async configure(pipeline: IPipeline): Promise<void> {
    this.validate()

    let platform: string
    let extension: string

    if (process.platform === 'win32') {
      platform = 'win'
      extension = '.zip'
    } else if (process.platform === 'darwin') {
      platform = 'osx'
      extension = '.tar.gz'
    } else if (process.platform === 'linux') {
      platform = 'linux'
      extension = '.tar.gz'
    } else {
      throw new Error(`Unsupported platform: ${process.platform}`)
    }

    let versionString: string

    if (this.version === 'latest') {
      versionString = `latest/download`
    } else {
      versionString = `download/${this.version}`
    }

    const downloadURL = `https://github.com/microsoft/msstore-cli/releases/${versionString}/MSStoreCLI-${platform}-${process.arch}${extension}`

    pipeline.debug(`Downloading tool from ${downloadURL}`)
    const randomDir: string = crypto.randomUUID()
    const tempDir = path.join(os.tmpdir(), 'tmp', 'runner', randomDir)
    pipeline.debug(`Creating tempdir ${tempDir}`)
    await pipeline.mkdirP(tempDir)
    const downloadPath: string = await pipeline.downloadTool(downloadURL)

    let name: string
    if (process.platform === 'win32') {
      name = 'msstore.exe'
    } else {
      name = 'msstore'
    }

    const archivePath: string =
      extension === '.tar.gz'
        ? await pipeline.extractTar(downloadPath, tempDir)
        : await pipeline.extractZip(downloadPath, tempDir)

    await this.moveToPath(archivePath, name, pipeline)

    return pipeline.rmRF(tempDir)
  }

  async moveToPath(
    downloadPath: string,
    name: string,
    pipeline: IPipeline
  ): Promise<void> {
    const toolPath = binPath()
    await pipeline.mkdirP(toolPath)

    const dest = path.join(toolPath, name)
    if (!fs.existsSync(dest)) {
      pipeline.moveSync(downloadPath, toolPath)
    }

    if (process.platform !== 'win32') {
      await pipeline.exec('chmod', ['+x', dest])
    }

    pipeline.addPath(toolPath)
  }

  validate(): void {
    if (
      process.platform !== 'win32' &&
      process.platform !== 'darwin' &&
      process.platform !== 'linux'
    ) {
      throw new Error(`Unsupported platform: ${process.platform}`)
    }
  }
}

export function binPath(): string {
  let baseLocation: string
  if (process.platform === 'win32') {
    baseLocation = process.env['USERPROFILE'] || 'C:\\'
  } else {
    if (process.platform === 'darwin') {
      baseLocation = '/Users'
    } else {
      baseLocation = '/home'
    }
  }

  return path.join(baseLocation, os.userInfo().username, 'msstorecli')
}
