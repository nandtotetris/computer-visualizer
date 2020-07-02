import { getJackCodeInstructions } from './index'

describe('removeComments function', () => {
  it('should remove comments and return instructions', () => {
    const expectedJackCode = [
      'class Main {',
      'function void main() {',
      'do Output.printString("Hello world");',
      'do Output.println();',
      'return;',
      '}',
      '}'
    ]

    expect(
      getJackCodeInstructions(getJackCode())
    ).toStrictEqual(expectedJackCode)
  })
})

describe('getTokens function', () => {
  // it('should return all the tokens in a jack code', () => {
  //   const expectedTokens = [
  //     'class', 'Main', '{',
  //     'function', 'void', 'main', '(', ')', '{',
  //     'do', 'Output', '.', 'printString', '(', '"Hello world"', ')', ';',
  //     'do', 'Output', '.', 'println', '(', ')', ';',
  //     'return', ';',
  //     '}',
  //     '}'
  //   ]
  //   expect(
  //     getTokens(getJackCode())
  //   ).toEqual(expectedTokens)
  // })

  // TODO
  // currently the way we get the tokens only matches valid tokens,
  // so if there is an invalid token, it will proccess it with
  // the wrong way, but it should throw an exception in that case.
  // eg. `1abcd` is not either a keyword or an identifier (since it begins with a digit)
  // but in the current implementation it will be processed as valid token,
  // `1` and `abcd` though this is not what we inteded to be.
  // it('should throw an execption when there is unexpected token', () => {
  //   const expectedTokens = Error()
  //   expect(
  //     getTokens(getInvalidJackCode())
  //   ).toEqual(expectedTokens)
  // })
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
