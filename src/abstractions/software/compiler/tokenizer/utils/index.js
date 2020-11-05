import { COMMENT_REGEX } from './regex'

/**
 * @param {string} jackCode jack code
 */
export const removeComments = jackCode => {
  return jackCode.replace(COMMENT_REGEX, '').trim()
}

/**
 * This function is only used for test purpose.
 * Since `removeComments` function replaces all comments with `''`,
 * the identation makes it hard to test. Rather we can check the
 * equality of each jack code instructions.
 * @param {string} jackCode jack code
 * @returns {string[]} jack code instructions splitted by new line
 */
export const getJackCodeInstructions = jackCode => {
  const instructions = []
  removeComments(jackCode).split('\n').forEach(instruction => {
    instruction = instruction.trim()
    if (instruction === '') return
    instructions.push(instruction)
  })
  return instructions
}

// Four of the symbols used in the Jack language (<, >, “, &) are also used
// for XML markup, and thus they cannot appear as data in XML files.
// To solve the problem, we require the tokenizer to output these tokens as
// &lt;, &gt;, &quot;, and &amp;, respectively.

export const SPECIAL_SYMBOLS = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '&': '&amp;'
}
