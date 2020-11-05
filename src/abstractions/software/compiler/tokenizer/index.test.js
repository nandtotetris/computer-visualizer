import JackTokenizer from './index'

describe('JackTokenizer class', () => {
  it('should return all tokens from jack code', () => {
    const tokenizer = new JackTokenizer(getJackCode())

    const expectedTokens = [
      'class', 'Main', '{', 'function', 'void', 'main', '(', ')', '{',
      'do', 'Output', '.', 'printString', '(', '"Hello world"', ')', ';',
      'do', 'Output', '.', 'println', '(', ')', ';',
      'return', ';', '}', '}'
    ]

    tokenizer.tokens.forEach((token, i) => {
      expect(
        token.value()
      ).toBe(expectedTokens[i])
    })
  })

  it('should return correct keyword, identifier, symbol, integer and string for tokens', () => {
    const tokenizer = new JackTokenizer('class Main < 5 & "Hello"')

    tokenizer.advance()
    expect(tokenizer.keyword()).toBe('class') // Keyword test
    tokenizer.advance()
    expect(tokenizer.identifier()).toBe('Main') // Identifier test
    tokenizer.advance()
    expect(tokenizer.symbol()).toBe('&lt;') // Symbol test
    tokenizer.advance()
    expect(tokenizer.intVal()).toBe(5) // Integer constant test
    tokenizer.advance()
    expect(tokenizer.symbol()).toBe('&amp;') // Symbol test
    tokenizer.advance()
    expect(tokenizer.stringVal()).toBe('Hello') // String constant test
  })

  it('should reset current token', () => {
    const tokenizer = new JackTokenizer('class Main < 5 & "Hello"')

    tokenizer.advance()
    expect(tokenizer.keyword()).toBe('class')
    tokenizer.advance()
    expect(tokenizer.identifier()).toBe('Main')
    tokenizer.advance()

    tokenizer.reset()
    expect(tokenizer.currentToken).toBe(null)
    expect(tokenizer.currentTokenIndex).toBe(-1)
  })

  it('should throw an error if symbol() is called for keyword token', () => {
    const tokenizer = new JackTokenizer('class')

    tokenizer.advance()

    expect.assertions(1)
    try {
      tokenizer.symbol()
    } catch (e) {
      expect(e.message).toBe(`\`symbol()\` should be called only when tokenType is \`SYMBOL\`,
      but it is called with token type: KEYWORD.`)
    }
  })
})

const getJackCode = () => `
    // This file is part of www.nand2tetris.org
    // and the book "The Elements of Computing Systems"
    // by Nisan and Schocken, MIT Press.
    class Main {
        /**
         * 
         * This is an API comment
         * 
        */
        function void main() {
            /* Prints some text using the standard library. 
               This is a multi line comment
            */
            do Output.printString("Hello world");
            do Output.println();  //New line
            return;
        }
    }    
`
