// Doesn't work yet

let { readZapsConfig } = require('./utils.js')
let { exec } = require('child_process')
let path = require('path')

function asyncExec(...args) {
  return new Promise((resolve, reject) => {
    exec(...args, (err, stdout) => {
      if (err) {
        reject(err)
      }
      resolve(stdout)
    })
  })
}

module.exports = async function runAll({ _: [, command] }) {
  let zapsConfig = readZapsConfig({ command: 'run-all' })

  let workspaces = zapsConfig.packages

  Promise.all(
    workspaces.map(workspace => {
      return asyncExec(`yarn ${command}`, {
        cwd: path.join(process.cwd(), workspace),
        stdio: 'inherit',
      }).then(
        res => [workspace, res],
        err => [workspace, err],
      )
    }),
  ).then(
    () => {
      console.log('Finished')
    },
    errors => {
      console.log('Failed!')
      console.log(errors)
      process.exit()
    },
  )
}
