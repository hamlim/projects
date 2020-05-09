let fs = require('fs')

let pjson = require('./package.json')

pjson.alias = undefined

fs.writeFileSync('./package.json', JSON.stringify(pjson, null, 2))
