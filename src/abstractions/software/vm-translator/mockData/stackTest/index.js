export const StackTestHVM = `
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/07/StackArithmetic/StackTest/StackTest.vm

// Executes a sequence of arithmetic and logical operations
// on the stack. 
push constant 17
push constant 17
eq
push constant 17
push constant 16
eq
push constant 16
push constant 17
eq
push constant 892
push constant 891
lt
push constant 891
push constant 892
lt
push constant 891
push constant 891
lt
push constant 32767
push constant 32766
gt
push constant 32766
push constant 32767
gt
push constant 32766
push constant 32766
gt
push constant 57
push constant 31
push constant 53
add
push constant 112
sub
neg
and
push constant 82
or
not
`

export const StackTestAssembly = `
@256
D=A
@SP
M=D
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
@17
D=A
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
D=M-D
@line30
D;JEQ
D=0
@line32
0;JMP
(line30)
D=-1
(line32)
@SP
A=M-1
A=A-1
M=D
@SP
M=M-1
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
@16
D=A
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
D=M-D
@line65
D;JEQ
D=0
@line67
0;JMP
(line65)
D=-1
(line67)
@SP
A=M-1
A=A-1
M=D
@SP
M=M-1
@16
D=A
@SP
A=M
M=D
@SP
M=M+1
@17
D=A
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
D=M-D
@line100
D;JEQ
D=0
@line102
0;JMP
(line100)
D=-1
(line102)
@SP
A=M-1
A=A-1
M=D
@SP
M=M-1
@892
D=A
@SP
A=M
M=D
@SP
M=M+1
@891
D=A
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
D=M-D
@line135
D;JLT
D=0
@line137
0;JMP
(line135)
D=-1
(line137)
@SP
A=M-1
A=A-1
M=D
@SP
M=M-1
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
@892
D=A
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
D=M-D
@line170
D;JLT
D=0
@line172
0;JMP
(line170)
D=-1
(line172)
@SP
A=M-1
A=A-1
M=D
@SP
M=M-1
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
@891
D=A
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
D=M-D
@line205
D;JLT
D=0
@line207
0;JMP
(line205)
D=-1
(line207)
@SP
A=M-1
A=A-1
M=D
@SP
M=M-1
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1
@32766
D=A
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
D=M-D
@line240
D;JGT
D=0
@line242
0;JMP
(line240)
D=-1
(line242)
@SP
A=M-1
A=A-1
M=D
@SP
M=M-1
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
@32767
D=A
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
D=M-D
@line275
D;JGT
D=0
@line277
0;JMP
(line275)
D=-1
(line277)
@SP
A=M-1
A=A-1
M=D
@SP
M=M-1
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
@32766
D=A
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
D=M-D
@line310
D;JGT
D=0
@line312
0;JMP
(line310)
D=-1
(line312)
@SP
A=M-1
A=A-1
M=D
@SP
M=M-1
@57
D=A
@SP
A=M
M=D
@SP
M=M+1
@31
D=A
@SP
A=M
M=D
@SP
M=M+1
@53
D=A
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
@112
D=A
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
@SP
A=M-1
M=-M
@SP
A=M-1
D=M
@SP
A=M-1
A=A-1
M=M&D
@SP
M=M-1
@82
D=A
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
M=M|D
@SP
M=M-1
@SP
A=M-1
M=!M  
  `
