export const ALU_MAPPING = {
  101010: 0,
  111111: 1,
  111010: '-1',
  '001100': 'x',
  110000: 'y',
  '001101': '!x',
  110001: '!y',
  '001111': '-x',
  110011: '-y',
  '011111': 'x+1',
  110111: 'y+1',
  '001110': 'x-1',
  110010: 'y-1',
  '000010': 'x+y',
  '0101011': 'x-y',
  '000111': 'y-x',
  '000000': 'x&y',
  '010101': 'x|y'
}

export const replaceByIndex = (start, end, txt) => {
  return txt.slice(0, start) + `<span class='highlight-bits'>${txt.slice(start, end + 1)}</span>` + txt.slice(end + 1)
}
