let { readZapsConfig } = require('./utils.js')
let nfzf = require('node-fzf')
let { execSync } = require('child_process')
let path = require('path')

module.exports = async function run({ _: [, command] }) {
  let zapsConfig = readZapsConfig({ command: 'run' })

  let workspaces = zapsConfig.packages

  let {
    selected: { value: selectedWorkspace },
  } = await nfzf(workspaces)

  execSync(`yarn ${command}`, {
    cwd: path.join(process.cwd(), selectedWorkspace),
    stdio: 'inherit',
  })
}
