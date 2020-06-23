export const StaticTestHVM = `
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/07/MemoryAccess/StaticTest/StaticTest.vm

// Executes pop and push commands using the static segment.
push constant 111
push constant 333
push constant 888
pop static 8
pop static 3
pop static 1
push static 3
push static 1
sub
push static 8
add
`

export const StaticTestAssembly = `
@256
D=A
@SP
M=D
@111
D=A
@SP
A=M
M=D
@SP
M=M+1
@333
D=A
@SP
A=M
M=D
@SP
M=M+1
@888
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
A=M-1
D=M
@StaticTest.8
M=D
@SP
M=M-1
@SP
A=M-1
D=M
@StaticTest.3
M=D
@SP
M=M-1
@SP
A=M-1
D=M
@StaticTest.1
M=D
@SP
M=M-1
@StaticTest.3
D=M
@SP
A=M
M=D
@SP
M=M+1
@StaticTest.1
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
A=M-1
D=M
@SP
A=M-1
A=A-1
M=M-D
@SP
M=M-1
@StaticTest.8
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
A=M-1
D=M
@SP
A=M-1
A=A-1
M=M+D
@SP
M=M-1  
`
