let { readZapsConfig } = require('./utils.js')
let nfzf = require('node-fzf')
let { execSync } = require('child_process')
let path = require('path')

module.exports = async function exec(commands) {
  let zapsConfig = readZapsConfig({ command: 'exec' })

  let workspaces = zapsConfig.packages

  let {
    selected: { value: selectedWorkspace },
  } = await nfzf(workspaces)

  execSync(commands.join(' '), {
    cwd: path.join(process.cwd(), selectedWorkspace),
    stdio: 'inherit',
  })
}
