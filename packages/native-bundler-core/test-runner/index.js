/**
 * This is a simple hacky test running program
 *
 * All it will do is:
 *
 * 1. for each directory in `fixtures`
 * 2. run native-bundler against the src directory
 * 3. output the result to a temp directory within the fixture called `actual`
 * 4. verify that the folder structure matches between `expected` and `actual`
 * 5. verify the files match between `expected` and `actual`
 */

let dirTree = require('directory-tree')
let { mkdirSync } = require('fs')
let { bundler } = require('../dist/bundler.js')

function makeError({ message, meta }) {
  return {
    __type: 'custom-error',
    message,
    meta,
  }
}

function dirDiff(dirA, dirB) {
  return { err: null }
  let dirATree = dirTree(dirA)
  let dirBTree = dirTree(dirB)
  let diffFiles = []
  let directoryQueue = dirATree.children

  for (let entry of directoryQueue) {
    if (entry.type === 'directory') {
      entry.children.forEach(child => {
        directoryQueue.push(child)
      })
    } else if (
      !dirBTree.children.find(
        item => item.name === entry.name && item.type === entry.type,
      )
    ) {
      diffFiles.push(entry)
    }
  }

  let res
  if (diffFiles.length > 0) {
    res = makeError({
      meta: diffFiles,
      message: 'Folder content is not equal',
    })
  } else {
    res = null
  }
  return {
    err: res,
  }
}

function fileDiff(dirA, dirB) {
  return { err: null }
}

async function run(fixtureDirectory) {
  let { name, children } = fixtureDirectory
  // get the src and expected directories
  let src = children.find(dir => dir.name === 'src')
  let expected = children.find(dir => dir.name === 'expected')
  // construct our actual path
  let actualPath = `${fixtureDirectory.path}/actual`
  // check if we don't have an actual directory yet
  if (!children.find(dir => dir.name === 'actual')) {
    // if we don't lets make it
    mkdirSync(actualPath)
  }

  let getConfig = cfg => cfg

  if (children.find(file => file.name === 'native-bundler.config.js')) {
    getConfig = require(`../${fixtureDirectory.path}/native-bundler.config.js`)
  }

  // bundle the code
  await bundler(
    getConfig({
      entry: `${src.path}/src.js`,
      out: `fixtures/${name}/actual`,
      cache: new Map(),
    }),
  )

  // grab any diffs between directories
  let { err: dirDiffErr } = dirDiff(expected.path, actualPath)
  // grab any diffs in file content
  let { err: fileContentDiffErr } = fileDiff(expected.path, actualPath)
  // flatten the errors down to an array
  let errs = [dirDiffErr, fileContentDiffErr].filter(Boolean)
  // throw them
  if (errs.length > 0) {
    throw errs
  }
}

async function setup() {
  let fixtures = dirTree('./fixtures').children
  for (let fixture of fixtures) {
    let testName = fixture.name
    let caught = false
    try {
      await run(fixture)
    } catch (e) {
      if (Array.isArray(e) && e.some(err => !!err.__type)) {
        caught = true
        e.forEach(err => {
          console.error('\n')
          console.error(
            `Error ⚠️: ${testName} Failed with message: ${err.message}`,
            err.meta,
          )
          console.error('\n')
        })
      } else {
        throw e
      }
    } finally {
      if (!caught) {
        console.log('Tests passed!')
      }
    }
  }
}
setup()
