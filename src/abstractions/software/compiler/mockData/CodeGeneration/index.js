export const CONSTRUCTOR_JACK = `
class Main {

  field int x, y; // screen location of the square's top-left corner
  field int size; // length of this square, in pixels

  /** Constructs a new square with a given location and size. */
  constructor Main new(int Ax, int Ay, int Asize) {
     let x = Ax;
     let y = Ay;
     let size = Asize;
     return this;
  }
}
`

export const CONSTRUCTOR_VM = `
function Main.new 0
push constant 3
call Memory.alloc 1
pop pointer 0
push argument 0
pop this 0
push argument 1
pop this 1
push argument 2
pop this 2
push pointer 0
return
`
export const STRING_JACK = `
class Main {
  function void main() {
    do Output.printString("Test 1: expected result: 5; actual result: ");
    return;
  }
}
`

export const STRING_VM = `
function Main.main 0
push constant 43
call String.new 1
push constant 84
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 115
call String.appendChar 2
push constant 116
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 49
call String.appendChar 2
push constant 58
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 120
call String.appendChar 2
push constant 112
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 99
call String.appendChar 2
push constant 116
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 100
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 114
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 115
call String.appendChar 2
push constant 117
call String.appendChar 2
push constant 108
call String.appendChar 2
push constant 116
call String.appendChar 2
push constant 58
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 53
call String.appendChar 2
push constant 59
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 97
call String.appendChar 2
push constant 99
call String.appendChar 2
push constant 116
call String.appendChar 2
push constant 117
call String.appendChar 2
push constant 97
call String.appendChar 2
push constant 108
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 114
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 115
call String.appendChar 2
push constant 117
call String.appendChar 2
push constant 108
call String.appendChar 2
push constant 116
call String.appendChar 2
push constant 58
call String.appendChar 2
push constant 32
call String.appendChar 2
call Output.printString 1
pop temp 0
push constant 0
return
`

export const ARRAY_VARIABLE_JACK = `
class Main {
  function void main() {
    var Array a; 
    var int length, i;

    let a = Array.new(10); // constructs the array
    
    let i = 0;
    while (i < length) {
       let a[i] = Keyboard.readInt("Enter a number: ");
       let i = i + 1;
    }

    return;
  }
}
`
export const ARRAY_VARIABLE_VM = `
function Main.main 3
push constant 10
call Array.new 1
pop local 0
push constant 0
pop local 2
label WHILE_EXP0
push local 2
push local 1
lt
not
if-goto WHILE_END0
push local 2
push local 0
add
push constant 16
call String.new 1
push constant 69
call String.appendChar 2
push constant 110
call String.appendChar 2
push constant 116
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 114
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 97
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 110
call String.appendChar 2
push constant 117
call String.appendChar 2
push constant 109
call String.appendChar 2
push constant 98
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 114
call String.appendChar 2
push constant 58
call String.appendChar 2
push constant 32
call String.appendChar 2
call Keyboard.readInt 1
pop temp 0
pop pointer 1
push temp 0
pop that 0
push local 2
push constant 1
add
pop local 2
goto WHILE_EXP0
label WHILE_END0
push constant 0
return
`

export const ARRAY_VALUE_JACK = `
class Main {
  function void main() {
    var Array a; 
    var int length, i, arr;

    let a = Array.new(10); // constructs the array
    
    let i = 0;
    while (i < length) {
       let a[i] = Keyboard.readInt("Enter a number: ");
       let i = 1 + a[i];
    }

    return;
  }
}
`

export const ARRAY_VALUE_VM = `
function Main.main 4
push constant 10
call Array.new 1
pop local 0
push constant 0
pop local 2
label WHILE_EXP0
push local 2
push local 1
lt
not
if-goto WHILE_END0
push local 2
push local 0
add
push constant 16
call String.new 1
push constant 69
call String.appendChar 2
push constant 110
call String.appendChar 2
push constant 116
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 114
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 97
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 110
call String.appendChar 2
push constant 117
call String.appendChar 2
push constant 109
call String.appendChar 2
push constant 98
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 114
call String.appendChar 2
push constant 58
call String.appendChar 2
push constant 32
call String.appendChar 2
call Keyboard.readInt 1
pop temp 0
pop pointer 1
push temp 0
pop that 0
push constant 1
push local 2
push local 0
add
pop pointer 1
push that 0
add
pop local 2
goto WHILE_EXP0
label WHILE_END0
push constant 0
return
`

export const UNDEFINED_VARIABLE_JACK = `
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/11/Average/Main.jack

// (Same as projects/09/Average/Main.jack)

// Inputs some numbers and computes their average
class Main {
   function void main() {
     do Output.printString(age);
     return;
   }
}
`
