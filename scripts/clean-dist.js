let { execSync } = require('child_process')

execSync('cd packages/ && find . -name dist -exec rm -rf {} \\;')
execSync('cd packages/ && find . -name public -exec rm -rf {} \\;')
execSync('cd packages/ && find . -name .cache -exec rm -rf {} \\;')
