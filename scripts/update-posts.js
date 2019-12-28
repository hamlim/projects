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
      acc[parts[0]] = parts[1].startsWith("'")
        ? parts[1].replace(/'/g, '')
        : parts[1]
      return acc
    }, {})
}

try {
  fs.mkdirSync(path.join('packages', 'blog', 'src', 'posts'))
} catch (e) {
  // ignored
}

getFrontMatter(fs.readFileSync(posts[0]).toString())

function getPostData(posts) {
  return posts.reverse().reduce((acc, post) => {
    let contents = fs.readFileSync(post).toString()
    let frontmatter = getFrontMatter(contents)
    fs.writeFileSync(
      post.replace(path.join('src', 'content'), path.join('src', 'posts')),
      contents.split('---')[2],
    )
    return [
      ...acc,
      {
        ...frontmatter,
        filepath: post,
      },
    ]
  }, [])
}

let res = getPostData(posts).sort((a, b) => {
  let aDate = new Date(a.date)
  let bDate = new Date(b.date)

  if (aDate < bDate) {
    return 1
  } else if (bDate < aDate) {
    return -1
  }
  return 0
})

let postsPath = path.join('packages', 'blog', 'src', 'auto-posts.js')

function camel(str) {
  return str.toLowerCase().replace(/ /g, '-')
}

fs.writeFileSync(
  postsPath,
  `import {lazy} from 'react'

export default [
  ${res.map(
    res => `{
  to: '${camel(res.title).replace('"', '')}',
  title: '${res.title.replace('"', '')}',
  component: lazy(() => import('${getLocalPath(res.filepath).replace(
    'content',
    'posts',
  )}'))
}`,
  ).join(`,
`)}
]`,
)
