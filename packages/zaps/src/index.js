#!/usr/bin/env node

let minimist = require('minimist')

let argv = minimist(process.argv.slice(2))

let { log } = require('./utils.js')

try {
  switch (argv._[0]) {
    case 'init': {
      return require('./init.js')(argv)
    }
    case 'build': {
      return require('./build.js')(argv)
    }
    default: {
      console.log('No command provided')
    }
  }
} catch (diagnostic) {
  if (typeof diagnostic.__error !== 'undefined') {
    log(`${diagnostic.message}
    
${diagnostic.suggestion}`)
  } else {
    console.log(diagnostic)
  }
}
