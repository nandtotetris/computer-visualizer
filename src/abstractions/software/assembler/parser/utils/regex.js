const symbolChars = 'A-Za-z_.$:'
export const COMMENT_REGEX = /\/\/[^\n]*/g
export const LABEL_INSTR_REGEX = new RegExp(
  String.raw`^\(\s*([${symbolChars}][${symbolChars}\d]*)\s*\)`)
export const ADRESS_INSTR_REGEX = new RegExp(String.raw`^@([${symbolChars}\d]*$)`)
