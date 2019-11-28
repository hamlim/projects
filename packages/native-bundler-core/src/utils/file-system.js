/**
 * File System utils
 *
 * this file exports a few file system utils
 * they are thin wrappers around the fs module
 * that are promise based instead of callback based
 */

import fs from 'fs'
import util from 'util'

const { promisify } = util

export const readFile = promisify(fs.readFile)

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })

export const makeDirectory = promisify(fs.mkdir)

export const stat = promisify(fs.stat)

export const exists = filepath => Promise.resolve(fs.existsSync(filepath))
