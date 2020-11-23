import ALU from '.'

describe('ALU chip', () => {
  const alu = new ALU()

  it('should return correct result', () => {
    const testData = getTestData()

    testData.forEach(({ x, y, controlBits, output, zr, ng }) => {
      alu.setX(x)
      alu.setY(y)
      alu.setControlBits(controlBits)
      alu.execute()

      expect(alu.getOut()).toBe(output)
      expect(alu.getZr()).toBe(zr)
      expect(alu.getNg()).toBe(ng)
    })
  })
})

const getTestData = () => ([
  {
    x: '0000000000000000',
    y: '1111111111111111',
    controlBits: '101010',
    output: '0000000000000000',
    zr: '1',
    ng: '0'
  },
  {
    x: '0000000000000000',
    y: '1111111111111111',
    controlBits: '111111',
    output: '0000000000000001',
    zr: '0',
    ng: '0'
  },
  {
    x: '0000000000000000',
    y: '1111111111111111',
    controlBits: '111010',
    output: '1111111111111111',
    zr: '0',
    ng: '1'
  },
  {
    x: '0000000000000000',
    y: '1111111111111111',
    controlBits: '001100',
    output: '0000000000000000',
    zr: '1',
    ng: '0'
  },
  {
    x: '0000000000000000',
    y: '1111111111111111',
    controlBits: '001110',
    output: '1111111111111111',
    zr: '0',
    ng: '1'
  },
  {
    x: '0000000000000000',
    y: '1111111111111111',
    controlBits: '010101',
    output: '1111111111111111',
    zr: '0',
    ng: '1'
  },
  {
    x: '0000000000010001',
    y: '0000000000000011',
    controlBits: '000111',
    output: '1111111111110010',
    zr: '0',
    ng: '1'
  },
  {
    x: '0000000000010001',
    y: '0000000000000011',
    controlBits: '000000',
    output: '0000000000000001',
    zr: '0',
    ng: '0'
  },
  {
    x: '0000000000010001',
    y: '0000000000000011',
    controlBits: '110001',
    output: '1111111111111100',
    zr: '0',
    ng: '1'
  },
  {
    x: '0000000000010001',
    y: '0000000000000011',
    controlBits: '110111',
    output: '0000000000000100',
    zr: '0',
    ng: '0'
  }
])
