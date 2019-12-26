let fs = require('fs')
let path = require('path')

function find(base, ext, files, result) {
  files = files || fs.readdirSync(base)
  result = result || []

  files.forEach(function(file) {
    let newbase = path.join(base, file)
    if (fs.statSync(newbase).isDirectory()) {
      result = find(newbase, ext, fs.readdirSync(newbase), result)
    } else {
      if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
        result.push(newbase)
      }
    }
  })
  return result
}

let contentPath = path.join('packages', 'blog', 'src', 'content')

let posts = find(contentPath, 'mdx')

function getLocalPath(p) {
  return '.' + p.split('src')[1]
}

function getFrontMatter(content) {
  let frtmtr = content.split('---')[1]
  return frtmtr
    .split('\n')
    .filter(Boolean)
    .reduce((acc, line) => {
      let parts = line.split(': ')
      console.log(parts[1])
      acc[parts[0]] = parts[1].startsWith("'")
        ? parts[1].replace(/'/g, '')
        : parts[1]
      return acc
    }, {})
}

console.log(getFrontMatter(fs.readFileSync(posts[0]).toString()))
