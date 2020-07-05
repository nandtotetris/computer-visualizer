import { areTextsEqual } from './index'

describe('areTextsEqual function', () => {
  it('should return true if both texts are equal', () => {
    expect(areTextsEqual(getText1(), getText2())).toBe(true)
  })

  it('should return false if texts length are not equal', () => {
    expect(areTextsEqual('<keyword>\n<class>', '<keyword>')).toBe(false)
  })

  it('should return false if texts are not equal', () => {
    expect(areTextsEqual('<symbol> ; </symbol>', '<symbol> , </symbol>')).toBe(false)
  })
})

const getText1 = () => `
  <keyword> class </keyword>
  <identifier> SquareGame </identifier>


  <symbol> { </symbol>
  <classVarDec>
    <keyword> field </keyword>
    <identifier> Square </identifier>
    <identifier> square </identifier>
    <symbol> ; </symbol>
  </classVarDec>
`

const getText2 = () => `
             <keyword> class </keyword>
  <identifier> SquareGame </identifier>
<symbol> { </symbol>
  <classVarDec>
           <keyword> field </keyword>         
    <identifier> Square </identifier>
<identifier> square </identifier>
          <symbol> ; </symbol>
</classVarDec>
`
