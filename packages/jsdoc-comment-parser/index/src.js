function skipWhitespace(str) {
  let i = 0
  do {
    if (str[i] !== ' ' && str[i] !== '\t') {
      return i
    }
  } while (++i < str.length)
  return i
}

function parseTagImpl(str) {
  let result = str.match(/^\s*@(\S+)/)
  if (!result) {
    throw new Error('Invalid `@tag`, missing @ symbol')
  }

  return {
    source: result[0],
    data: { tag: result[1] },
  }
}

function parseType(str, data) {
  if (data.errors && data.errors.length) {
    return null
  }

  let pos = skipWhitespace(str)
  let res = ''
  let curlies = 0

  if (str[pos] !== '{') {
    return null
  }

  while (pos < str.length) {
    curlies += str[pos] === '{' ? 1 : str[pos] === '}' ? -1 : 0
    res += str[pos]
    pos++
    if (curlies === 0) {
      break
    }
  }

  if (curlies !== 0) {
    throw new Error('Invalid `{type}`, unpaired curlies')
  }

  return {
    source: str.slice(0, pos),
    data: { type: res.slice(1, -1) },
  }
}

function parseName(str, data) {
  if (data.errors && data.errors.length) {
    return null
  }

  let pos = skipWhitespace(str)
  let name = ''
  let brackets = 0
  let res = { optional: false }

  // if it starts with quoted group assume it is a literal
  let quotedGroups = str.slice(pos).split('"')
  if (
    quotedGroups.length > 1 &&
    quotedGroups[0] === '' &&
    quotedGroups.length % 2 === 1
  ) {
    name = quotedGroups[1]
    pos += name.length + 2
    // assume name is non-space string or anything wrapped into brackets
  } else {
    while (pos < str.length) {
      brackets += str[pos] === '[' ? 1 : str[pos] === ']' ? -1 : 0
      name += str[pos]
      pos++
      if (brackets === 0 && /\s/.test(str[pos])) {
        break
      }
    }

    if (brackets !== 0) {
      throw new Error('Invalid `name`, unpaired brackets')
    }

    res = { name: name, optional: false }

    if (name[0] === '[' && name[name.length - 1] === ']') {
      res.optional = true
      name = name.slice(1, -1)

      if (name.indexOf('=') !== -1) {
        let parts = name.split('=')
        name = parts[0]
        res.default = parts[1].replace(/^(["'])(.+)(\1)$/, '$2')
      }
    }
  }

  res.name = name

  return {
    source: str.slice(0, pos),
    data: res,
  }
}

function parseDescription(str, data) {
  if (data.errors && data.errors.length) {
    return null
  }

  let result = str.match(/^\s+((.|\s)+)?/)

  if (result) {
    return {
      source: result[0],
      data: { description: result[1] === undefined ? '' : result[1] },
    }
  }

  return null
}

let MARKER_START = '/**'
let MARKER_START_SKIP = '/***'
let MARKER_END = '*/'

function find(list, filter) {
  let i = list.length
  let matchs = true

  while (i--) {
    for (let k in filter) {
      if ({}.hasOwnProperty.call(filter, k)) {
        matchs = filter[k] === list[i][k] && matchs
      }
    }
    if (matchs) {
      return list[i]
    }
  }
  return null
}

/**
 * Parses "@tag {type} name description"
 * @param {string} str Raw doc string
 * @param {Array<function>} parsers Array of parsers to be applied to the source
 * @returns {object} parsed tag node
 */
function parseTag(str, parsers) {
  if (typeof str !== 'string' || !/\s*@/.test(str)) {
    return null
  }

  let data = parsers.reduce(
    function(state, parser) {
      let result

      try {
        result = parser(state.source, { ...state.data })
      } catch (err) {
        state.data.errors = [
          ...(state.data.errors || []),
          parser.name + ': ' + err.message,
        ]
      }

      if (result) {
        state.source = state.source.slice(result.source.length)
        state.data = { ...state.data, ...result.data }
      }

      return state
    },
    {
      source: str,
      data: {},
    },
  ).data

  data.optional = !!data.optional
  data.type = data.type === undefined ? '' : data.type
  data.name = data.name === undefined ? '' : data.name
  data.description = data.description === undefined ? '' : data.description

  return data
}

/**
 * Parses comment block (array of String lines)
 */
function parseBlock(source, opts) {
  let trim = opts.trim ? s => s.trim() : s => s

  let toggleFence =
    typeof opts.fence === 'function'
      ? opts.fence
      : line => line.split(opts.fence).length % 2 === 0

  let sourceStr = source
    .map(line => {
      return trim(line.source)
    })
    .join('\n')

  sourceStr = trim(sourceStr)

  let start = source[0].number

  // merge source lines into tags
  // we assume tag starts with "@"
  source = source
    .reduce(
      function(state, line) {
        line.source = trim(line.source)

        // start of a new tag detected
        if (line.source.match(/^\s*@(\S+)/) && !state.isFenced) {
          state.tags.push({
            source: [line.source],
            line: line.number,
          })
          // keep appending source to the current tag
        } else {
          let tag = state.tags[state.tags.length - 1]
          if (
            opts.join !== undefined &&
            opts.join !== false &&
            opts.join !== 0 &&
            !line.startWithStar &&
            tag.source.length > 0
          ) {
            let source
            if (typeof opts.join === 'string') {
              source = opts.join + line.source.replace(/^\s+/, '')
            } else if (typeof opts.join === 'number') {
              source = line.source
            } else {
              source = ' ' + line.source.replace(/^\s+/, '')
            }
            tag.source[tag.source.length - 1] += source
          } else {
            tag.source.push(line.source)
          }
        }

        if (toggleFence(line.source)) {
          state.isFenced = !state.isFenced
        }
        return state
      },
      {
        tags: [{ source: [] }],
        isFenced: false,
      },
    )
    .tags.map(tag => {
      tag.source = trim(tag.source.join('\n'))
      return tag
    })

  // Block description
  let description = source.shift()

  // skip if no descriptions and no tags
  if (description.source === '' && source.length === 0) {
    return null
  }

  let tags = source.reduce(function(tags, tag) {
    let tagNode = parseTag(tag.source, opts.parsers)
    if (!tagNode) {
      return tags
    }

    tagNode.line = tag.line
    tagNode.source = tag.source

    if (opts.dotted_names && tagNode.name.includes('.')) {
      let parent_name
      let parent_tag
      let parent_tags = tags
      let parts = tagNode.name.split('.')

      while (parts.length > 1) {
        parent_name = parts.shift()
        parent_tag = find(parent_tags, {
          tag: tagNode.tag,
          name: parent_name,
        })

        if (!parent_tag) {
          parent_tag = {
            tag: tagNode.tag,
            line: Number(tagNode.line),
            name: parent_name,
            type: '',
            description: '',
          }
          parent_tags.push(parent_tag)
        }

        parent_tag.tags = parent_tag.tags || []
        parent_tags = parent_tag.tags
      }

      tagNode.name = parts[0]
      parent_tags.push(tagNode)
      return tags
    }

    return tags.concat(tagNode)
  }, [])

  return {
    tags,
    line: start,
    description: description.source,
    source: sourceStr,
  }
}

/**
 * Produces `extract` function with internal state initialized
 */
function makeExtract() {
  let chunk = null
  let indent = 0
  let number = 0

  let opts = {
    trim: true,
    dotted_names: false,
    fence: '```',
    parsers: [parseTagImpl, parseType, parseName, parseDescription],
  }

  /**
   * Read lines until they make a block
   * Return parsed block once fullfilled or null otherwise
   */
  return function extract(line) {
    let result = null
    let startPos = line.indexOf(MARKER_START)
    let endPos = line.indexOf(MARKER_END)

    // if open marker detected and it's not, skip one
    if (startPos !== -1 && line.indexOf(MARKER_START_SKIP) !== startPos) {
      chunk = []
      indent = startPos + MARKER_START.length
    }

    // if we are on middle of comment block
    if (chunk) {
      let lineStart = indent
      let startWithStar = false

      // figure out if we slice from opening marker pos
      // or line start is shifted to the left
      let nonSpaceChar = line.match(/\S/)

      // skip for the first line starting with /** (fresh chunk)
      // it always has the right indentation
      if (chunk.length > 0 && nonSpaceChar) {
        if (nonSpaceChar[0] === '*') {
          let afterNonSpaceCharIdx = nonSpaceChar.index + 1
          let extraCharIsSpace = line.charAt(afterNonSpaceCharIdx) === ' '
          lineStart = afterNonSpaceCharIdx + (extraCharIsSpace ? 1 : 0)
          startWithStar = true
        } else if (nonSpaceChar.index < indent) {
          lineStart = nonSpaceChar.index
        }
      }

      // slice the line until end or until closing marker start
      chunk.push({
        number,
        startWithStar,
        source: line.slice(lineStart, endPos === -1 ? line.length : endPos),
      })

      // finalize block if end marker detected
      if (endPos !== -1) {
        result = parse_block(chunk, opts)
        chunk = null
        indent = 0
      }
    }

    number += 1
    return result
  }
}

export default function parse(source) {
  let blocks = []
  let extract = makeExtract()
  let lines = source.split(/\n/)

  lines.forEach(line => {
    let block = extract(line)
    if (block) {
      blocks.push(block)
    }
  })

  return blocks
}
