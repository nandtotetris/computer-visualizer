export const And = (a, b) => (a & b).toString()

// Assuming first and second are 16 bits
export const And16 = (first, second) => {
  return [...first].map((a, i) => And(a, second[i])).join('')
}
