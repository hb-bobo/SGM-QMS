/**
 * Checks if `value` is Array.
 *
 * @category types
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a Array, else `false`.
 * @example
 *
 * isArray([1, 2, 3])
 * // => true
 *
 * isArray(document.body.children)
 * // => false
 *
 * isArray('abc')
 * // => false
 *
 * isArray(Function)
 * // => false
 */

export default Array.isArray
