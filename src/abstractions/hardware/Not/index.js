export const Not16 = bits => {
  return [...bits].map(bit => bit ^ 1).join('')
}
