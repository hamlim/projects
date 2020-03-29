#!/usr/bin/env node

let minimist = require('minimist')

let argv = minimist(process.argv.slice(2))

let originalArgs = process.argv.slice(3)

let { log } = require('./utils.js')

try {
  switch (argv._[0]) {
    case 'init': {
      return require('./init.js')(originalArgs)
    }
    case 'build': {
      return require('./build.js')(originalArgs)
    }
    case 'run': {
      return require('./run.js')(originalArgs)
    }
    case 'exec': {
      return require('./exec.js')(originalArgs)
    }
    case 'run-all': {
      return require('./run-all.js')(originalArgs)
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
