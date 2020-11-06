import JackAnalyzer from './index'
import File from '../../file'
import { ExpressionLessMockData } from '../mockData'
import { areTextsEqual } from '../compilationEngine/utils'

describe('JackAnalyzer class', () => {
  it('should return correct parse xml for a single expressionless jack code', () => {
    const analayzer = new JackAnalyzer([
      new File('Main', ExpressionLessMockData.SQUARE_MAIN_JACK)
    ])

    const [file] = analayzer.analayze()
    expect(areTextsEqual(file.getContent(), ExpressionLessMockData.SQUARE_MAIN_PARSE)).toBe(true)
  })

  it('should return correct parse xml for a directory(expresionless jack code)', () => {
    const analayzer = new JackAnalyzer([
      new File('Main', ExpressionLessMockData.SQUARE_MAIN_JACK),
      new File('Square', ExpressionLessMockData.SQUARE_SQUARE_JACK),
      new File('SquareGame', ExpressionLessMockData.SQUARE_SQUARE_GAME_JACK)
    ])

    const expectedXmls = [
      ExpressionLessMockData.SQUARE_MAIN_PARSE,
      ExpressionLessMockData.SQUARE_SQUARE_PARSE,
      ExpressionLessMockData.SQUARE_SQUARE_GAME_PARSE
    ]

    const files = analayzer.analayze()
    files.forEach((file, i) => {
      expect(areTextsEqual(file.getContent(), expectedXmls[i])).toBe(true)
    })
  })
})
