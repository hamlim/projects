let path = require('path')
let chalk = require('chalk')

function makeDiagnostic({ message, error, suggestion }) {
  return {
    message,
    suggestion,
    __error: error,
  }
}

function readRootPackageJson({ requireImpl = require } = {}) {
  // Checking to see if we are running in the Project
  try {
    return requireImpl(path.join(process.cwd(), 'package.json'))
  } catch (err) {
    throw makeDiagnostic({
      message: 'Failed to find or read Project package.json file.',
      error: err,
      suggestion:
        'Ensure Zaps is being run at the root of your project / monorepo.',
    })
  }
}

function readZapsConfig({ requireImpl = require } = {}) {
  let configDir = path.join(process.cwd(), '.zaps')

  try {
    return requireImpl(`${configDir}/zaps.json`)
  } catch (err) {
    throw makeDiagnostic({
      message: 'Failed to find or read zaps.json file.',
      error: err,
      suggestion:
        'Ensure a .zaps directory exists within this project root and this command is being run at the root of your project / monorepo.',
    })
  }
}

module.exports = {
  log(msg) {
    console.log(chalk.green(`⚡  ${msg}`))
  },
  makeDiagnostic,
  readRootPackageJson,
  readZapsConfig,
  VERSION: '0.0.1',
}
