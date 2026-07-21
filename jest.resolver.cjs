// Jest (CommonJS) cannot resolve the ESM-only @actions/* packages because their
// package.json "exports" only expose the "import" condition. This resolver adds the
// "import" condition for @actions/* specifiers only, so they resolve; babel-jest then
// transforms the ESM output to CommonJS. All other packages use the default resolution.
module.exports = (request, options) => {
  if (request.startsWith('@actions/')) {
    return options.defaultResolver(request, {
      ...options,
      conditions: [...(options.conditions ?? []), 'import']
    })
  }
  return options.defaultResolver(request, options)
}
