// Insert a string in a text at a specific index
export const replaceTokenByIndex = (txt, index, str) => {
  return txt.slice(0, index) +
    `<span class='highlight-token'>${str}</span>` +
    txt.slice(index + str.length)
}
