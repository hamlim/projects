let fs = require('fs')
let path = require('path')
let { log, makeDiagnostic, VERSION } = require('./utils.js')
let mkdirp = require('mkdirp')
let glob = require('glob')
let prettier = require('prettier')

module.exports = function(argv, { requireImpl = require } = {}) {
  log('Starting Zaps...')

  // Checking to see if we are running in the Project
  let projectPackageJson
  try {
    projectPackageJson = requireImpl(path.join(process.cwd(), 'package.json'))
  } catch (err) {
    throw makeDiagnostic({
      message: 'Failed to find or read Project package.json file.',
      error: err,
      suggestion:
        'Ensure Zaps is being run at the root of your project / monorepo.',
    })
  }

  if (!Array.isArray(projectPackageJson.workspaces)) {
    throw makeDiagnostic({
      message:
        '`workspaces` key in package.json is not an array of package globs',
      error: {},
      suggestion: `Ensure Project package.json follows the correct shape:

\`\`\`json
"workspaces": [
  "packages/*"
]
\`\`\`
`,
    })
  }

  // Create the config directory
  let configDir = path.join(process.cwd(), '.zaps')
  mkdirp.sync(configDir)

  let zapsJson = {}

  zapsJson.version = VERSION
  zapsJson.workspaces = projectPackageJson.workspaces

  // find all directories with package.json files matching the globs
  let packages = projectPackageJson.workspaces.reduce((acc, workspace) => {
    let packageDirs = glob.sync(workspace)

    return [...acc, ...packageDirs]
  }, [])

  zapsJson.packages = packages

  // Write to the zaps.json file
  fs.writeFileSync(
    path.join(configDir, 'zaps.json'),
    prettier.format(JSON.stringify(zapsJson), { parser: 'json' }),
  )

  log(`Created Zaps config file. Next steps:

* Ensure the \`.zaps\` 📂  directory is checked into git

* Run \`yarn zaps link\` to link dependencies
* Run \`yarn zaps build\` to build packages in the project`)
}
