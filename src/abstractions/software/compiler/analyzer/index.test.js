import JackAnalyzer from './index'
import File from '../../file'
import { ArrayTest, ExpressionLessSquare, Square } from '../mockData'
import { areTextsEqual } from '../compilationEngine/utils'

describe('JackAnalyzer class', () => {
  it('should return correct parse xml for a single expressionless jack code', () => {
    const analayzer = new JackAnalyzer([
      new File('Main', ExpressionLessSquare.MAIN_JACK)
    ])

    const [file] = analayzer.analayze()
    expect(areTextsEqual(file.getContent(), ExpressionLessSquare.MAIN_PARSE_TOKENS)).toBe(true)
  })

  it('should return correct parse xml for square expression less directory', () => {
    const analayzer = new JackAnalyzer([
      new File('Main', ExpressionLessSquare.MAIN_JACK),
      new File('Square', ExpressionLessSquare.SQUARE_JACK),
      new File('SquareGame', ExpressionLessSquare.SQUARE_GAME_JACK)
    ])

    const expectedXmls = [
      ExpressionLessSquare.MAIN_PARSE_TOKENS,
      ExpressionLessSquare.SQUARE_PARSE_TOKENS,
      ExpressionLessSquare.SQUARE_GAME_PARSE_TOKENS
    ]

    const files = analayzer.analayze()
    files.forEach((file, i) => {
      expect(areTextsEqual(file.getContent(), expectedXmls[i])).toBe(true)
    })
  })

  it('should return correct parse xml for ArrayTest', () => {
    const analayzer = new JackAnalyzer([
      new File('Main', ArrayTest.JACK_CODE)
    ])

    const [file] = analayzer.analayze()
    expect(areTextsEqual(file.getContent(), ArrayTest.PARSE_TOKENS)).toBe(true)
  })

  it('should return correct parse xml for square directory', () => {
    const analayzer = new JackAnalyzer([
      new File('Main', Square.MAIN_JACK),
      new File('Square', Square.SQUARE_JACK),
      new File('SquareGame', Square.SQUARE_GAME_JACK)
    ])
    const expectedXmls = [
      Square.MAIN_PARSE_TOKENS,
      Square.SQUARE_PARSE_TOKENS,
      Square.SQUARE_GAME_PARSE_TOKENS
    ]

    const files = analayzer.analayze()
    files.forEach((file, i) => {
      expect(areTextsEqual(file.getContent(), expectedXmls[i])).toBe(true)
    })
  })
})
