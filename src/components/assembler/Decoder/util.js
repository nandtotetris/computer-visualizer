export const highlightAtIndex = (str, index) => {
  return str.substring(0, index) +
  `<span class='highlight-bit'>${str[index]}</span>` +
  str.substring(index + 1)
}
