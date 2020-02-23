let path = require('path')
let chalk = require('chalk')

function makeDiagnostic({ message, error, suggestion }) {
  return {
    message,
    suggestion,
    __error: error,
  }
}

function ensureProjectRoot({ command = 'init' } = {}) {
  try {
    let pjson = require(path.join(process.cwd(), 'package.json'))

    if (!pjson.workspaces) {
      throw 'No Workspaces'
    }
  } catch (err) {
    if (typeof err === 'string') {
      throw makeDiagnostic({
        message: `Ran command ${command} not inside the root of your project. Ensure you are running the Zaps command from the root.`,
        error: {},
        suggestion:
          'Ensure you are running from the root of your project. If you are running from the root of your project, ensure you have configured your workspaces.',
      })
    } else {
      throw makeDiagnostic({
        message: `Failed to read root package.json when running ${command}.`,
        error: err,
        suggestion:
          'Ensure you have a valid package.json file with workspaces configured at the root of your project.',
      })
    }
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

function readZapsConfig({ requireImpl = require, command = 'init' } = {}) {
  ensureProjectRoot({ command })
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
  ensureProjectRoot,
  VERSION: '0.0.1',
}
