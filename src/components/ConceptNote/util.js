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
    return [3, ...this.compiletype, ...this.subroutineName, 4, 5]
  },
  get compileparameterlist () {
    return [4, ...this.compiletype, ...this.varName]
  },
  get compilesubroutinebody () {
    return [5, 6, 7]
  },
  get compilevardec () {
    return [6, ...this.compiletype, ...this.varName]
  },
  get compilestatements () {
    return [7, ...this.compilestatement]
  },
  get compilestatement () {
    return [8, ...this.compilelet, ...this.compileif, ...this.compilewhile, ...this.compiledo, ...this.compilereturn]
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
    return [13, ...this.compilesubroutinecall]
  },
  get compileexpression () {
    return [14, ...this.compileterm, this.compileop]
  },
  get compileterm () {
    return [15, ...this.compilesubroutinecall, ...this.varName, ...this.compileexpression, ...this.compileunaryop, ...this.compileterm, ...this.compilesubroutinecall, ...this.compilekeywordconstant]
  },
  get compilesubroutinecall () {
    return [16, ...this.compileexpressionlist, ...this.className, ...this.varName, ...this.compileexpressionlist]
  },
  get compileexpressionlist () {
    return [17, ...this.compileexpression]
  },
  compileop: [18],
  compileunaryop: [19],
  compilekeywordconstant: [20],
  className: [21],
  subroutineName: [22],
  varName: [23]
}
