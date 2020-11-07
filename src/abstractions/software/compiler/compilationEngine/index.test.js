import CompilationEngine from './index'
import Writer from '../writer'
import { areTextsEqual } from './utils'

describe('CompilationEngine class', () => {
  const writer = new Writer()

  afterEach(() => {
    writer.reset()
  })

  // empty jack class test
  it('should correctly parse empty jack class', () => {
    const jackCode = getJackCodeTemplate()
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getParseTokensXml()

    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should throw an error if there is an extra token after class declaration', () => {
    const jackCode = 'class Main {}}'
    const compilationEngine = new CompilationEngine(jackCode, writer)

    try {
      compilationEngine.compileClass()
    } catch (e) {
      expect(e.message).toBe('Found an extra token \'}\'')
    }
  })

  // class fields (static | field)
  it('should correctly parse classVarDecs(class fields)', () => {
    const classFields = 'field int x,y,z;\nfield char age;'
    const jackCode = getJackCodeTemplate(classFields)
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getParseTokensXml(`
      <classVarDec>
        <keyword> field </keyword>
        <keyword> int </keyword>
        <identifier> x </identifier>
        <symbol> , </symbol>
        <identifier> y </identifier>
        <symbol> , </symbol>
        <identifier> z </identifier>
        <symbol> ; </symbol>
      </classVarDec>
      <classVarDec>
        <keyword> field </keyword>
        <keyword> char </keyword>
        <identifier> age </identifier>
        <symbol> ; </symbol>
      </classVarDec>
    `)
    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should correctly parse empty subroutineDecs', () => {
    const subroutineDefination = 'function void getName () {}\n constructor SquareGame new () {}'
    const jackCode = getJackCodeTemplate(subroutineDefination)
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getParseTokensXml(`
      <subroutineDec>
        <keyword> function </keyword>
        <keyword> void </keyword>
        <identifier> getName </identifier>
        <symbol> ( </symbol>
        <parameterList>
        </parameterList>
        <symbol> ) </symbol>
        <subroutineBody>
        <symbol> { </symbol>
        <symbol> } </symbol>
        </subroutineBody>
      </subroutineDec>
      <subroutineDec>
        <keyword> constructor </keyword>
        <identifier> SquareGame </identifier>
        <identifier> new </identifier>
        <symbol> ( </symbol>
        <parameterList>
        </parameterList>
        <symbol> ) </symbol>
        <subroutineBody>
        <symbol> { </symbol>
        <symbol> } </symbol>
        </subroutineBody>
      </subroutineDec>
    `)
    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should correctly parse varDecs', () => {
    const jackCode = getFunctionJackCodeTemplate('var int height, width;\n var char x;')
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getFunctionParseTokensXml(`
      <varDec>
        <keyword> var </keyword>
        <keyword> int </keyword>
        <identifier> height </identifier>
        <symbol> , </symbol>
        <identifier> width </identifier>
        <symbol> ; </symbol>
      </varDec>
      <varDec>
        <keyword> var </keyword>
        <keyword> char </keyword>
        <identifier> x </identifier>
        <symbol> ; </symbol>
      </varDec>
    `)
    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should correctly parse parameterList', () => {
    const jackCode = getFunctionJackCodeTemplate('', 'int x, char y')
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getFunctionParseTokensXml('', `
      <keyword> int </keyword>
      <identifier> x </identifier>
      <symbol> , </symbol>
      <keyword> char </keyword>
      <identifier> y </identifier>
    `)
    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should throw an expected SYMBOL error while parsing parameterList', () => {
    // There should be comma between parameter lists(int x, boolean y)
    const jackCode = getFunctionJackCodeTemplate('', 'int x boolean y')
    const compilationEngine = new CompilationEngine(jackCode, writer)

    try {
      compilationEngine.compileClass()
    } catch (e) {
      expect(e.message).toBe('Expected SYMBOL, \')\', but found KEYWORD \'boolean\'')
    }
  })

  it('should correctly parse let statement', () => {
    const jackCode = getFunctionJackCodeTemplate('let age = i;')
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getFunctionParseTokensXml(`
      <statements>
        <letStatement>
          <keyword> let </keyword>
          <identifier> age </identifier>
          <symbol> = </symbol>
          <expression>
            <term>
              <identifier> i </identifier>
            </term>
          </expression>
          <symbol> ; </symbol>
        </letStatement>
      </statements>
    `)
    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should throw an expected = SYMBOL while parsing let statement', () => {
    const jackCode = getFunctionJackCodeTemplate('let age i;')
    const compilationEngine = new CompilationEngine(jackCode, writer)

    try {
      compilationEngine.compileClass()
    } catch (e) {
      expect(e.message).toBe('Expected SYMBOL, \'=\', but found IDENTIFIER \'i\'')
    }
  })

  it('should correctly if statement', () => {
    const jackCode = getFunctionJackCodeTemplate('if (x) {}')
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getFunctionParseTokensXml(`
      <statements>
        <ifStatement>
          <keyword> if </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> x </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <symbol> } </symbol>
        </ifStatement>
      </statements>
    `)
    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should throw an expected SYMBOL ) if parenthesis is not closed', () => {
    const jackCode = getFunctionJackCodeTemplate('if (x {}')
    const compilationEngine = new CompilationEngine(jackCode, writer)

    try {
      compilationEngine.compileClass()
    } catch (e) {
      expect(e.message).toBe('Expected SYMBOL, \')\', but found SYMBOL \'{\'')
    }
  })

  it('should correctly parse if/else statement', () => {
    const jackCode = getFunctionJackCodeTemplate('if (x) {} else {}')
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getFunctionParseTokensXml(`
      <statements>
        <ifStatement>
          <keyword> if </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> x </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <symbol> } </symbol>
          <keyword> else </keyword>
          <symbol> { </symbol>
          <symbol> } </symbol>
        </ifStatement>
      </statements>
    `)
    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should correctly parse while statement', () => {
    const jackCode = getFunctionJackCodeTemplate('while (x) {}')
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getFunctionParseTokensXml(`
      <statements>
        <whileStatement>
          <keyword> while </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> x </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <symbol> } </symbol>
        </whileStatement>
      </statements>
    `)

    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should correctly parse do statement(function call)', () => {
    const jackCode = getFunctionJackCodeTemplate('do play();')
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getFunctionParseTokensXml(`
      <statements>
        <doStatement>
          <keyword> do </keyword>
          <identifier> play </identifier>
          <symbol> ( </symbol>
          <expressionList>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
      </statements>
    `)

    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should correctly parse do statement(method call)', () => {
    const jackCode = getFunctionJackCodeTemplate('do a.play();')
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getFunctionParseTokensXml(`
      <statements>
        <doStatement>
          <keyword> do </keyword>
          <identifier> a </identifier>
          <symbol> . </symbol>
          <identifier> play </identifier>
          <symbol> ( </symbol>
          <expressionList>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
      </statements>
    `)

    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should correctly parse return statement', () => {
    const jackCode = getFunctionJackCodeTemplate('return;')
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getFunctionParseTokensXml(`
      <statements>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
    `)

    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should correctly parse expression(identifier term only)', () => {
    const jackCode = getFunctionJackCodeTemplate('return a+b;')
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getFunctionParseTokensXml(`
      <statements>
        <returnStatement>
            <keyword> return </keyword>
            <expression>
              <term>
                <identifier> a </identifier>
              </term>
              <symbol> + </symbol>
              <term>
                <identifier> b </identifier>
              </term>
            </expression>
            <symbol> ; </symbol>
        </returnStatement>
      </statements>
    `)

    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should correctly parse let and do statements together', () => {
    const jackCode = getFunctionJackCodeTemplate('let x = x + y;\n do play();')
    const compilationEngine = new CompilationEngine(jackCode, writer)
    const expectedXml = getFunctionParseTokensXml(`
      <statements>
        <letStatement>
          <keyword> let </keyword>
          <identifier> x </identifier>
          <symbol> = </symbol>
          <expression>
            <term> 
              <identifier> x </identifier>
            </term>
            <symbol> + </symbol>
            <term> 
              <identifier> y </identifier>
            </term>
          </expression>
          <symbol> ; </symbol>
        </letStatement>
        <doStatement>
          <keyword> do </keyword>
          <identifier> play </identifier>
          <symbol> ( </symbol>
          <expressionList>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
      </statements>
    `)

    compilationEngine.compileClass()
    expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
  })

  it('should throw a type error', () => {
    const jackCode = getFunctionJackCodeTemplate('var;')
    const compilationEngine = new CompilationEngine(jackCode, writer)

    try {
      compilationEngine.compileClass()
    } catch (e) {
      expect(e.message).toBe('Expected KEYWORD OR IDENTIFIER, \'int,char,boolean\', but found SYMBOL \';\'')
    }
  })

  describe('expression', () => {
    it('should correctly parse integer constant expression', () => {
      const jackCode = getFunctionJackCodeTemplate('return 1-5;')
      const compilationEngine = new CompilationEngine(jackCode, writer)
      const expectedXml = getFunctionParseTokensXml(`
        <statements>
          <returnStatement>
            <keyword> return </keyword>
            <expression>
              <term>
                <integerConstant> 1 </integerConstant>
              </term>
              <symbol> - </symbol>
              <term>
                <integerConstant> 5 </integerConstant>
              </term>
            </expression>
            <symbol> ; </symbol>
          </returnStatement>
        </statements>
      `)

      compilationEngine.compileClass()
      expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
    })

    it('should correctly parse string constant expression', () => {
      const jackCode = getFunctionJackCodeTemplate('return "RIGHT";')
      const compilationEngine = new CompilationEngine(jackCode, writer)
      const expectedXml = getFunctionParseTokensXml(`
        <statements>
          <returnStatement>
            <keyword> return </keyword>
            <expression>
              <term>
                <stringConstant> RIGHT </stringConstant>
              </term>
            </expression>
            <symbol> ; </symbol>
          </returnStatement>
        </statements>
      `)

      compilationEngine.compileClass()
      expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
    })

    it('should correctly parse identifier', () => {
      const jackCode = getFunctionJackCodeTemplate('return a+b;')
      const compilationEngine = new CompilationEngine(jackCode, writer)
      const expectedXml = getFunctionParseTokensXml(`
        <statements>
          <returnStatement>
              <keyword> return </keyword>
              <expression>
                <term>
                  <identifier> a </identifier>
                </term>
                <symbol> + </symbol>
                <term>
                  <identifier> b </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
          </returnStatement>
        </statements>
      `)

      compilationEngine.compileClass()
      expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
    })

    it('should correctly parse array call', () => {
      const jackCode = getFunctionJackCodeTemplate('return a[0];')
      const compilationEngine = new CompilationEngine(jackCode, writer)
      const expectedXml = getFunctionParseTokensXml(`
        <statements>
          <returnStatement>
              <keyword> return </keyword>
              <expression>
                <term>
                  <identifier> a </identifier>
                  <symbol> [ </symbol>
                  <expression>
                    <term>
                      <integerConstant> 0 </integerConstant>
                    </term>
                  </expression>
                  <symbol> ] </symbol>
                </term>
              </expression>
              <symbol> ; </symbol>
          </returnStatement>
        </statements>
      `)

      compilationEngine.compileClass()
      expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
    })

    it('should correctly parse subroutine call', () => {
      const jackCode = getFunctionJackCodeTemplate('return a.b();')
      const compilationEngine = new CompilationEngine(jackCode, writer)
      const expectedXml = getFunctionParseTokensXml(`
        <statements>
          <returnStatement>
              <keyword> return </keyword>
              <expression>
                <term>
                  <identifier> a </identifier>
                  <symbol> . </symbol>
                  <identifier> b </identifier>
                  <symbol> ( </symbol>
                  <expressionList>
                  </expressionList>
                  <symbol> ) </symbol>
                </term>
              </expression>
              <symbol> ; </symbol>
          </returnStatement>
        </statements>
      `)

      compilationEngine.compileClass()
      expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
    })

    it('should correctly parse special symbols condition', () => {
      const jackCode = getFunctionJackCodeTemplate('return i > length;')
      const compilationEngine = new CompilationEngine(jackCode, writer)
      const expectedXml = getFunctionParseTokensXml(`
        <statements>
          <returnStatement>
              <keyword> return </keyword>
              <expression>
                <term>
                  <identifier> i </identifier>
                </term>
                <symbol> &gt; </symbol>
                <term>
                  <identifier> length </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
          </returnStatement>
        </statements>
      `)

      compilationEngine.compileClass()
      expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
    })

    it('should correctly parse expression inside expression', () => {
      const jackCode = getFunctionJackCodeTemplate('let i = i * (-j);')
      const compilationEngine = new CompilationEngine(jackCode, writer)
      const expectedXml = getFunctionParseTokensXml(`
        <statements>
          <letStatement>
              <keyword> let </keyword>
              <identifier> i </identifier>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> i </identifier>
                </term>
                <symbol> * </symbol>
                <term>
                  <symbol> ( </symbol>
                    <expression>
                      <term>
                        <symbol> - </symbol>
                        <term>
                          <identifier> j </identifier>
                        </term>
                      </term>
                    </expression>
                  <symbol> ) </symbol>
                </term>
              </expression>
              <symbol> ; </symbol>
          </letStatement>
        </statements>
      `)

      compilationEngine.compileClass()
      expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
    })

    it('should correctly parse unary op', () => {
      const jackCode = getFunctionJackCodeTemplate('let i = ~true;')
      const compilationEngine = new CompilationEngine(jackCode, writer)
      const expectedXml = getFunctionParseTokensXml(`
        <statements>
          <letStatement>
            <keyword> let </keyword>
            <identifier> i </identifier>
            <symbol> = </symbol>
            <expression>
              <term>
                <symbol> ~ </symbol>
                <term>
                  <keyword> true </keyword>
                </term>
              </term>
            </expression>
            <symbol> ; </symbol>
          </letStatement>
        </statements>
      `)

      compilationEngine.compileClass()
      expect(areTextsEqual(writer.getXml(), expectedXml)).toBe(true)
    })

    it('should throw an exception while parsing unary op', () => {
      const jackCode = getFunctionJackCodeTemplate('let i = +x;')
      const compilationEngine = new CompilationEngine(jackCode, writer)

      try {
        compilationEngine.compileClass()
      } catch (e) {
        expect(e.message).toBe('Expected \'(\' OR \'-, ~\' but found SYMBOL \'+\'')
      }
    })
  })
})

const getJackCodeTemplate = (snippet = '') => {
  return `
    class Main {
      ${snippet}  
    }
  `
}

const getParseTokensXml = (snippet = '') => {
  return `
    <class>
        <keyword> class </keyword>
        <identifier> Main </identifier>
        <symbol> { </symbol>
        ${snippet}
        <symbol> } </symbol>
    </class>
  `
}

const getFunctionJackCodeTemplate = (body = '', parameters = '') => {
  return getJackCodeTemplate(`
    function int getAge (${parameters}) {
      ${body}
    }
  `)
}

const getFunctionParseTokensXml = (body = '', parameters = '') => {
  return getParseTokensXml(`
    <subroutineDec>
      <keyword> function </keyword>
      <keyword> int </keyword>
      <identifier> getAge </identifier>
      <symbol> ( </symbol>
      <parameterList>
      ${parameters}
      </parameterList>
      <symbol> ) </symbol>
      <subroutineBody>
      <symbol> { </symbol>
      ${body}
      <symbol> } </symbol>
      </subroutineBody>
    </subroutineDec>
  `)
}
