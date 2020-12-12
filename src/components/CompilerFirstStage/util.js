const getModalContent = code => {
  return `<div class='code-wrapper'><pre><code>${code}</code></pre>`
}

const getModalHeader = header => {
  return `<span class='modal-header'>${header}</span>`
}

export const MODAL_INFOS = [
  {
    title: 'Code',
    content: `${getModalHeader('User inputed program')}${getModalContent('// This is an empty jack code\nclass Main {}')}`
  },
  {
    title: 'Preprocessor',
    content: `${getModalHeader('The next step is a preprocessor which removes comments from the input stream')}${getModalContent('// This is a comment\n /* This is also a multiline comment */')}`
  },
  {
    title: 'Tokenizer',
    content: `${getModalHeader('The next step is to remove all comments and white space from the input stream and breaks it into Jack-language tokens, as specified by the Jack grammar\n')}${getModalContent('class  =>  Keyword\nMain   =>  Identifier\n{      =>  Symbol\n}      =>  Symbol')}`
  }
]
