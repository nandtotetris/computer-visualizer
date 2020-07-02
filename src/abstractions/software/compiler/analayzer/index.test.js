import JackAnalayzer from './index'
import File from '../../file'
import { SyntaxAnalayzerMockData } from '../mockData'

describe('JackAnalayzer class', () => {
  it('should return correct tokens xml for a single file', () => {
    const fileName = 'ArrayTest'
    const analayzer = new JackAnalayzer(
      [new File(fileName, SyntaxAnalayzerMockData.ARRAY_TEST_JACK_CODE)]
    )
    const [file] = analayzer.analayze()
    expect(
      file.getContent()
    ).toBe(SyntaxAnalayzerMockData.ARRAY_TEST_TOKENS.trim())
    expect(file.getName()).toBe(fileName)
  })

  it('should return correct tokens xml for a directory(more than single file)', () => {
    const analayzer = new JackAnalayzer(
      [
        new File('Main', SyntaxAnalayzerMockData.SQUARE_MAIN),
        new File('Square', SyntaxAnalayzerMockData.SQUARE_SQUARE),
        new File('SquareGame', SyntaxAnalayzerMockData.SQUARE_SQUARE_GAME)
      ]
    )
    const expectedTokens = [
      SyntaxAnalayzerMockData.SQUARE_MAIN_TOKENS,
      SyntaxAnalayzerMockData.SQUARE_SQUARE_TOKENS,
      SyntaxAnalayzerMockData.SQUARE_SQUARE_GAME_TOKENS
    ]

    const files = analayzer.analayze()
    files.forEach((file, i) => {
      expect(file.getContent()).toBe(expectedTokens[i].trim())
    })
  })
})
