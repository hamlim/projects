let fs = require('fs')
let path = require('path')
let { log, makeDiagnostic, VERSION } = require('./utils.js')
let mkdirp = require('mkdirp')
let glob = require('glob')
let prettier = require('prettier')

module.exports = function(argv, { requireImpl = require } = {}) {
  log('Beginning Zaps build...')

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

  // Create the config directory
  let configDir = path.join(process.cwd(), '.zaps')

  let zapsJson = {}
  let zapsGraph = {}
  try {
    zapsJson = require(`${process.cwd()}/.zaps/zaps.json`)
    zapsJson = require(`${process.cwd()}/.zaps/zaps-graph.json`)
  } catch (error) {
    throw makeDiagnostic({
      message: 'Failed to find or read zaps.json file.',
      error: err,
      suggestion:
        'Ensure a .zaps directory exists within this project root and this command is being run at the root of your project / monorepo.',
    })
  }

  // We have the zaps config file and the zaps graph file
  // we want to construct an array of tuples, each tuple will
  // be an array of packages that we can build following the
  // items before them, this way we build packages that depend
  // on other packages after those other packages are built

  // To determine this we need to look at the zaps graph, find all packages
  // with shared `localDependencies`, and then group by the number of those I think
  let buildOrder = Object.entries(zapsGraph).reduce((buildOrder, entry) => {
    let [packageDir, { localDependencies, name }] = entry
  })
}
