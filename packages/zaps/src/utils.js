let chalk = require('chalk')

module.exports = {
  log(msg) {
    console.log(chalk.green(`⚡  ${msg}`))
  },
  makeDiagnostic({ message, error, suggestion }) {
    return {
      message,
      suggestion,
      __error: error,
    }
  },
  VERSION: '0.0.1',
}
