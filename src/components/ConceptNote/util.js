export const SCOPE_TO_GRAMMAR_MAPPING = {
  compileclass: 'class className { classVarDec* subroutineDec* }',
  compileclassvardec: '(static | field) type varName(, varName)* ;',
  compiletype: 'int | char | boolean | className',
  compilesubroutine: '(constructor | function | method) (void | type) subroutineName ( parameterList ) subroutineBody',
  compileparameterlist: '((type varName)(, type varName)*)?',
  compilesubroutinebody: '{ varDec* statements }',
  compilevardec: 'var type varName(, varName)* ;',
  compilestatements: 'statement*',
  compilestatement: 'letStatement | ifStatement | whileStatement | doStatement | returnStatement',
  compilereturn: 'return expression? ;',
  compilelet: 'let varName ([expression])? = expression ;',
  compileif: 'if (expression) { statements } (else { statements })?',
  compilewhile: 'while (expression) { statements }',
  compiledo: 'do subroutineCall ;',
  compileexpression: 'term (op term)*',
  compileterm: 'integerConstant | stringConstant | keywordConstant | varName | varName[expression] | subroutineCall | (expression) | unaryOp term',
  compilesubroutinecall: 'subroutineName (expressionList) | (className | varName).subroutineName(expressionList)',
  compileexpressionlist: '(expression, (, expression)*)?',
  compileop: '+ | - | * | / | & | | | < | > | = ',
  compileunaryop: '- | ~',
  compilekeywordconstant: 'true | false | null | this',
  className: 'identifier',
  subroutineName: 'identifier',
  varName: 'identifier'
}

export const SCOPE_TO_HIGHLIGHT_MAPPING = {
  get compileclass () {
    return [0, ...this.className, 1, 3]
  },
  get compileclassvardec () {
    return [1, ...this.varName, ...this.compiletype]
  },
  get compiletype () {
    return [2, ...this.className]
  },
  get compilesubroutine () {
    return [3, 2, ...this.subroutineName, 4, 5]
  },
  get compileparameterlist () {
    return [4, 2, ...this.varName]
  },
  get compilesubroutinebody () {
    return [5, 6, 7]
  },
  get compilevardec () {
    return [6, 2, ...this.varName]
  },
  get compilestatements () {
    return [7, 8]
  },
  get compilestatement () {
    return [8, 10, 11, 12, 13, 9]
  },
  get compilereturn () {
    return [9, 14]
  },
  get compilelet () {
    return [10, ...this.varName, 14]
  },
  get compileif () {
    return [11, 14, 7]
  },
  get compilewhile () {
    return [12, 14, 7]
  },
  get compiledo () {
    return [13, 16]
  },
  get compileexpression () {
    return [14, 15, this.compileop]
  },
  get compileterm () {
    return [15, 16, ...this.varName, 15, ...this.compileunaryop, 16, ...this.compilekeywordconstant]
  },
  get compilesubroutinecall () {
    return [16, 17, ...this.className, ...this.varName, ...this.subroutineName]
  },
  get compileexpressionlist () {
    return [17, 14]
  },
  compileop: [18],
  compileunaryop: [19],
  compilekeywordconstant: [20],
  className: [21],
  subroutineName: [22],
  varName: [23]
}

const getCodeTag = code => {
  return `<pre class='code-sample'><code>${code}</code></pre>`
}

export const SCOPE_CONTENT = {
  compileclass: `<span class='description'>Compiles a complete class<br /><br /> Examples</span>${getCodeTag('class Main { }')}\n${getCodeTag('class Main {\n  field int age;\n}')}`,
  compileclassvardec: `<span class='description'>Compiles a static declaration or a field declaration<br /><br /> Examples</span>${getCodeTag('field int height;')}\n${getCodeTag('static boolean hasFourLegs;')}`,
  compiletype: `<span class='description'>Compiles a type<br /><br /><br /> Examples</span>${getCodeTag('boolean')}\n${getCodeTag('int')}`,
  compilesubroutine: `<span class='description'>Compiles a complete method, function or constructor<br /><br /> Examples</span>${getCodeTag('function void () {\n  return;\n}')}\n${getCodeTag('method int getAge() {\n  return age\n}')}`,
  compilevardec: `<span class='description'>Compiles a var declaration<br /><br /> Examples</span>${getCodeTag('var int x;')}\n${getCodeTag('var boolean isCar;')}`,
  compileparameterlist: `<span class='description'>Compiles a (possibly empty) parameter list, not including the enclosing"()"<br /><br /> Examples</span>${getCodeTag('int x')}\n${getCodeTag('int x, int y')}`,
  compilestatements: "<span class='description'>Compiles a sequence of statements, not including the enclosing\"{}\"",
  compileexpression: `<span class='description'>Compiles an expression<br /><br /> Examples</span>${getCodeTag('1 + 3')}\n${getCodeTag('1++')}`,
  compileexpressionlist: `<span class='description'>Compiles a (possibly empty) comma separated list of expressions<br /><br /> Examples</span>${getCodeTag('true, 4 * 5')}\n${getCodeTag('1++, --3')}`,
  compiledo: `<span class='description'>Compiles a do statement<br /><br /> Examples</span>${getCodeTag('do Output.printInt(1)')}\n${getCodeTag('do methodName()')}`
}
