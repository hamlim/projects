let { readZapsConfig } = require('./utils.js')
let nfzf = require('node-fzf')
let { execSync } = require('child_process')
let path = require('path')

module.exports = async function add(commands) {
  let zapsConfig = readZapsConfig({ command: 'add' })

  let workspaces = zapsConfig.packages

  let {
    selected: { value: selectedWorkspace },
  } = await nfzf(workspaces)

  execSync(`yarn add ${commands.join(' ')}`, {
    cwd: path.join(process.cwd(), selectedWorkspace),
    stdio: 'inherit',
  })
}
