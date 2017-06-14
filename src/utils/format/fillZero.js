/**
 *
 * @category format
 * @param {number}
 * @returns {string}
 *
 * fillZero(1)
 * // => '01'
 *  * fillZero(12)
 * // => '12'
 */
function fillZero (number) {
  return number < 10 ? "0" + number : "" + number;
}

export default fillZero
