import JackAnalayzer from '.'
import File from '../../file'
import {
  Seven,
  ConvertToBin,
  RealSquare,
  Average,
  Pong,
  ComplexArray
} from '../mockData'

describe('JackAnalayzer class', () => {
  it('should generate correct VM code for Seven program', () => {
    const analayzer = new JackAnalayzer([
      new File('Seven', Seven.JACK)
    ])

    const [file] = analayzer.analayze()
    expect(file.getContent()).toBe(Seven.VM.trim())
  })

  it('should generate correct VM code for ConvertToBin program', () => {
    const analayzer = new JackAnalayzer([
      new File('ConvertToBin', ConvertToBin.JACK)
    ])

    const [file] = analayzer.analayze()
    expect(file.getContent()).toBe(ConvertToBin.VM.trim())
  })

  it('should generate correct VM code for Square program', () => {
    const analayzer = new JackAnalayzer([
      new File('Main', RealSquare.MAIN_JACK),
      new File('Square', RealSquare.SQUARE_JACK),
      new File('SquareGame', RealSquare.SQUARE_GAME_JACK)
    ])

    const expectedVMs = [
      RealSquare.MAIN_VM,
      RealSquare.SQUARE_VM,
      RealSquare.SQUARE_GAME_VM
    ]

    const files = analayzer.analayze()
    files.forEach((file, i) => {
      expect(file.getContent()).toBe(expectedVMs[i].trim())
    })
  })

  it('should generate correct VM code for Average program', () => {
    const analayzer = new JackAnalayzer([
      new File('Main', Average.JACK)
    ])

    const [file] = analayzer.analayze()
    expect(file.getContent()).toBe(Average.VM.trim())
  })

  it('should generate correct VM code for Pong program', () => {
    const analayzer = new JackAnalayzer([
      new File('Main', Pong.MAIN_JACK),
      new File('Ball', Pong.BALL_JACK),
      new File('Bat', Pong.BAT_JACK),
      new File('Pong Game', Pong.PONG_GAME_JACK)
    ])

    const expectedVMs = [
      Pong.MAIN_VM,
      Pong.BALL_VM,
      Pong.BAT_VM,
      Pong.PONG_GAME_VM
    ]

    const files = analayzer.analayze()
    files.forEach((file, i) => {
      expect(file.getContent()).toBe(expectedVMs[i].trim())
    })
  })

  it('should generate correct VM code for ComplexArray program', () => {
    const analayzer = new JackAnalayzer([
      new File('Main', ComplexArray.MAIN_JACK)
    ])

    const [file] = analayzer.analayze()
    expect(file.getContent()).toBe(ComplexArray.MAIN_VM.trim())
  })
})
