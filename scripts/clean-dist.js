let { execSync } = require('child_process')

execSync('cd packages/ && find . -name dist -exec rm -rf {} \\;')
