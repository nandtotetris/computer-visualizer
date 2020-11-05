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
