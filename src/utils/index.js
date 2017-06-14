import * as array from './array'
import * as dom from './dom'
import * as math from './math'
import * as number from './number'
import * as object from './object'
import * as format from './format'
import * as types from './types'
import * as tools from './tools'

let utils = {}

utils.array = array
utils.dom = dom
utils.math = math
utils.number = number
utils.object = object
utils.format = format
utils.types = types
utils.tools = tools

// export {
//   array,
//   dom,
//   math,
//   number,
//   object,
//   format,
//   types,
//   tools
// } 
module.exports = utils
