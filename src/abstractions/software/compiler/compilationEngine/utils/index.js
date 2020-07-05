export const convertToArray = value => {
  if (Array.isArray(value)) return value
  return [value]
}

export const OPERATORS = ['+', '-', '*', '/', '&', '|', '<', '>', '=']

/**
 * checks if two texts are equal ignoring their indentations
 * @param {string} text1
 * @param {string} text2
 * @returns {boolean} true if text1 and text2 have the same content
 */
export const areTextsEqual = (text1, text2) => {
  const text1Lines = text1.trim().split('\n').map(line => line.trim()).filter(Boolean)
  const text2Lines = text2.trim().split('\n').map(line => line.trim()).filter(Boolean)

  if (text1Lines.length !== text2Lines.length) return false
  let areEqual = true
  for (let i = 0; i < text1Lines.length; i++) {
    if (text1Lines[i] !== text2Lines[i]) return (areEqual = false)
  }

  return areEqual
}
