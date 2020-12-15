export const revertObject = obj => {
  const result = {}
  Object.keys(obj).forEach(k => (result[obj[k]] = k))

  return result
}
