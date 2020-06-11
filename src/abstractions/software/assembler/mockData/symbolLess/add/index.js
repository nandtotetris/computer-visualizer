export const ADD_ASSEMBLY_CODE = `
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/06/add/Add.asm

// Computes R0 = 2 + 3  (R0 refers to RAM[0])

@2
D=A
@3
D=D+A
@0
M=D
`

export const ADD_MACHINE_CODE = `
0000000000000010
1110110000010000
0000000000000011
1110000010010000
0000000000000000
1110001100001000
`
