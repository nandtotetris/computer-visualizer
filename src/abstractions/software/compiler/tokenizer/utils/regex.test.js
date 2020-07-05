import {
  SINGLE_LINE_COMMENT_REGEX,
  MULTI_LINE_COMMENT_REGEX,
  KEYWORD_REGEX,
  KEYWORDS,
  SYMBOL_REGEX,
  SYMBOLS,
  INTEGER_CONSTANT_REGEX,
  STRING_CONSTANT_REGEX,
  IDENTIFIER_REGEX,
  TOKEN_REGEX
} from './regex'

describe('SINGLE LINE COMMENT REGEX', () => {
  it('return true if there is a single line comment', () => {
    const jackCode = getTestSingleLineCommentJackCode()
    expect(
      SINGLE_LINE_COMMENT_REGEX.test(jackCode)
    ).toBe(true)
    expect(
      jackCode.match(SINGLE_LINE_COMMENT_REGEX).length
    ).toBe(4)
  })

  it('return false if there is no single line comment', () => {
    const jackCode = getTestNoCommentJackCode()
    expect(
      SINGLE_LINE_COMMENT_REGEX.test(jackCode)
    ).toBe(false)
  })
})

describe('MULTI LINE COMMENT REGEX', () => {
  it('return true if there is a multi line comment', () => {
    const jackCode = getTestMultiLineCommentJackCode()
    expect(
      MULTI_LINE_COMMENT_REGEX.test(jackCode)
    ).toBe(true)
    expect(
      jackCode.match(MULTI_LINE_COMMENT_REGEX).length
    ).toBe(2)
  })

  it('return false if there is no single line comment', () => {
    const jackCode = getTestNoCommentJackCode()
    expect(
      MULTI_LINE_COMMENT_REGEX.test(jackCode)
    ).toBe(false)
  })
})

describe('API COMMENT REGEX', () => {
  it('return true if there is an API line comment', () => {
    const jackCode = getTestAPICommentJackCode()
    expect(
      MULTI_LINE_COMMENT_REGEX.test(jackCode)
    ).toBe(true)
    expect(
      jackCode.match(MULTI_LINE_COMMENT_REGEX).length
    ).toBe(1)
  })

  it('return false if there is no API comment', () => {
    const jackCode = getTestNoCommentJackCode()
    expect(
      MULTI_LINE_COMMENT_REGEX.test(jackCode)
    ).toBe(false)
  })
})

describe('KEYWORD REGEX', () => {
  it('should return true if token is keyword', () => {
    Object.values(KEYWORDS).forEach(keyword => {
      expect(KEYWORD_REGEX.test(keyword)).toBe(true)
    })
  })

  it('should return false if token is not a keyword', () => {
    expect(KEYWORD_REGEX.test('age')).toBe(false)
  })
})

describe('SYMBOL REGEX', () => {
  it('should return true if token is symbol', () => {
    SYMBOLS.forEach(symbol => {
      expect(SYMBOL_REGEX.test(symbol)).toBe(true)
    })
  })

  it('should return false if token is not symbol', () => {
    expect(SYMBOL_REGEX.test('1')).toBe(false)
  })
})

describe('INTEGER_CONSTANT REGEX', () => {
  it('should return true if token is integer constant', () => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1000].forEach(number => {
      expect(INTEGER_CONSTANT_REGEX.test(number)).toBe(true)
    })
  })

  it('should return false if token is not integer constant', () => {
    expect(INTEGER_CONSTANT_REGEX.test('name')).toBe(false)
  })
})

describe('STRING_CONSTANT REGEX', () => {
  it('should return true if token is string constant', () => {
    ['"Hello"', '"My name is: "'].forEach(string => {
      expect(STRING_CONSTANT_REGEX.test(string)).toBe(true)
    })
  })

  it('should return false if token is not string constant', () => {
    expect(STRING_CONSTANT_REGEX.test('')).toBe(false)
  })
})

describe('IDENTIFIER REGEX', () => {
  it('should return true if token is identifier', () => {
    ['age', 'sum'].forEach(string => {
      expect(IDENTIFIER_REGEX.test(string)).toBe(true)
    })
  })

  it('should return false if token is not identifier', () => {
    expect(IDENTIFIER_REGEX.test('')).toBe(false)
  })
})

describe('TOKEN REGEX', () => {
  it('should return all the tokens in a jack code', () => {
    const expectedTokens = [
      'class', 'Main', '{',
      'function', 'void', 'main', '(', ')', '{',
      'do', 'Output', '.', 'printString', '(', '"Hello world"', ')', ';',
      'do', 'Output', '.', 'println', '(', ')', ';',
      'return', ';',
      '}',
      '}'
    ]
    expect(
      getTestNoCommentJackCode().match(TOKEN_REGEX)
    ).toEqual(expectedTokens)
  })

  // TODO
  // currently the way we get the tokens only matches valid tokens,
  // so if there is an invalid token like `1name` it will be considered as
  // a valid token `1` and `name` though we inteded it to be an invalid identifier.
  // It should throw an exception if there is an invalid token.
  // But I think we are right, the parser will detect any syntax error.
  // The tokenizer should only divide the jack code into jack tokens,
  // without detecting any errors.
  // it('should throw an execption when there is unexpected token', () => {
  //   const expectedTokens = Error()
  //   expect(
  //     getTestInvalidJackCode().match(TOKEN_REGEX)
  //   ).toEqual(expectedTokens)
  // })
})

const getTestNoCommentJackCode = () => `
    class Main {
        function void main() {
            do Output.printString("Hello world");
            do Output.println();
            return;
        }
    } 
`

const getTestSingleLineCommentJackCode = () => `
    // This file is part of www.nand2tetris.org
    // and the book "The Elements of Computing Systems"
    // by Nisan and Schocken, MIT Press.

    class Main {
        function void main() {
            do Output.printString("Hello world");
            do Output.println();  //New line
            return;
        }
    }    
`

const getTestMultiLineCommentJackCode = () => `
    class Main {
        function void main() {
            /* Prints some text using the standard library. 
               This is a multi line comment
            */
            do Output.printString("Hello world");
            /* Prints new line using the standard library. */
            do Output.println();
            return;
        }
    }    
`

const getTestAPICommentJackCode = () => `
    /** Hello world program 
     * This is an API comment
    */
    class Main {
        function void main() {
            do Output.printString("Hello world");
            do Output.println();  //New line
            return;
        }
    }    
`

// eslint-disable-next-line
const getTestInvalidJackCode = () => `
    class Main {
        function void main() {
            var int 1invalid;
            return;
        }
    } 
`
