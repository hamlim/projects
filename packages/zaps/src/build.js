let fs = require('fs')
let path = require('path')
let {
  log,
  makeDiagnostic,
  VERSION,
  readRootPackageJson,
  readZapsConfig,
} = require('./utils.js')
let mkdirp = require('mkdirp')
let glob = require('glob')
let prettier = require('prettier')

function sortByLocalDependencies(
  [, { localDependencies: localDependenciesA }],
  [, { localDependencies: localDependenciesB }],
) {
  if (localDependenciesA.length < localDependenciesB.length) {
    return -1
  } else if (localDependenciesA.length > localDependenciesB.length) {
    return 1
  }
  return 0
}

module.exports = function(argv, { requireImpl = require } = {}) {
  log('Beginning Zaps build...')

  // Checking to see if we are running in the Project
  readRootPackageJson()

  let { graph: zapsGraph } = readZapsConfig()

  // We have the zaps config file and the zaps graph file
  // we want to construct an array of tuples, each tuple will
  // be an array of packages that we can build following the
  // items before them, this way we build packages that depend
  // on other packages after those other packages are built

  // To determine this we need to look at the zaps graph, find all packages
  // with shared `localDependencies`, and then group by the number of those I think
  let buildOrder = Object.entries(zapsGraph)
    .sort(sortByLocalDependencies)
    .reduce((buildOrder, entry) => {
      let [packageDir, { localDependencies, name }] = entry
      console.log(packageDir, localDependencies)
    })
}
