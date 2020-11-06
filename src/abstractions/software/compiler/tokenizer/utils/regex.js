// This regex also handles API comments
export const MULTI_LINE_COMMENT_REGEX = /\/\*([^]*?)\*\//g
export const SINGLE_LINE_COMMENT_REGEX = /\/\/[^\n]*/g
export const COMMENT_REGEX = new RegExp(
  `${SINGLE_LINE_COMMENT_REGEX.source}|${MULTI_LINE_COMMENT_REGEX.source}`,
  'g'
)

export const KEYWORDS = {
  CLASS: 'class',
  CONSTRUCTOR: 'constructor',
  FUNCTION: 'function',
  METHOD: 'method',
  FIELD: 'field',
  STATIC: 'static',
  VAR: 'var',
  INT: 'int',
  CHAR: 'char',
  BOOLEAN: 'boolean',
  VOID: 'void',
  TRUE: 'true',
  FALSE: 'false',
  NULL: 'null',
  THIS: 'this',
  LET: 'let',
  DO: 'do',
  IF: 'if',
  ELSE: 'else',
  WHILE: 'while',
  RETURN: 'return'
}

export const SYMBOLS = [
  '{', '}', '(', ')', '[', ']', '.', ',', ';',
  '+', '-', '*', '/', '&', '|', '<', '>', '=', '~'
]

/**
 * It will add `\\` before the terms,
 * inorder to consider them as a valid regex term.
 * @param {string[]} terms array of term we want to bypass
 * @returns {string[]} escaped terms
 */
export const escapeTermsForRegex = terms => {
  return terms.map(term => `\\${term}`)
}

export const KEYWORD_REGEX = new RegExp(`\\b(${Object.values(KEYWORDS).join('|')})\\b`)
export const SYMBOL_REGEX = new RegExp((escapeTermsForRegex(SYMBOLS)).join('|'))
export const INTEGER_CONSTANT_REGEX = /\d+/
export const STRING_CONSTANT_REGEX = /"[^"]*"/
export const IDENTIFIER_REGEX = /[A-Za-z_]+\w*/

/**
 * Creates a token regex which includes all the five types of terminal elements(tokens).
 * 1. `KEYWORD`
 * 2. `SYMBOL`
 * 3. `INTEGER_CONSTANT`
 * 4. `STRING_CONSTANT`
 * 5. `IDENTIFIER`.
 *
 * Order matters here, keyword regex should come first, since keywords
 * may also be considered as identifiers, if idenfifer comes before keyword.
 * eg. `leta` will be considered as `leta` if identifier comes first,
 * but it will be `let` and `a` if keyword comes first.
 */
export const TOKEN_REGEX = new RegExp(
  `${KEYWORD_REGEX.source}|(${SYMBOL_REGEX.source})|(${INTEGER_CONSTANT_REGEX.source})|(${STRING_CONSTANT_REGEX.source})|(${IDENTIFIER_REGEX.source})`,
  'g'
)
