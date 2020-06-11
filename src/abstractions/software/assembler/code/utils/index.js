/**
 * @param {number|string} num number we want to pad
 * @param {number} length
 */
export const leftPadWithZeros = (num, length) => String(num).padStart(length, '0')

/**
 * @param {string|number} num number we want to convert it to binary
 * @returns {string} binary representation of the given number
 */
export const convertToBinary = num => parseInt(num, 10).toString(2)
