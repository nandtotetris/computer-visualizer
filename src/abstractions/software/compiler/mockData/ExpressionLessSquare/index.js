export const MAIN_JACK = `
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/10/ExpressionLessSquare/Main.jack
/** Expressionless version of projects/10/Square/Main.jack. */
class Main {
    static boolean test;    // Added for testing -- there is no static keyword
                            // in the Square files.
    function void main() {
        var SquareGame game;
        let game = game;
        do game.run();
        do game.dispose();
        return;
    }
    function void test() {  // Added to test Jack syntax that is not use in
        var int i, j;       // the Square files.
        var String s;
        var Array a;
        if (i) {
            let s = i;
            let s = j;
            let a[i] = j;
        }
        else {              // There is no else keyword in the Square files.
            let i = i;
            let j = j;
            let i = i | j;
        }
        return;
    }
}
`

export const SQUARE_JACK = `
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
/// File name: projects/10/ExpressionLessSquare/Square.jack
/** Expressionless version of projects/10/Square/Square.jack. */
class Square {
   field int x, y; 
   field int size; 
   constructor Square new(int Ax, int Ay, int Asize) {
      let x = Ax;
      let y = Ay;
      let size = Asize;
      do draw();
      return x;
   }
   method void dispose() {
      do Memory.deAlloc(this);
      return;
   }
   method void draw() {
      do Screen.setColor(x);
      do Screen.drawRectangle(x, y, x, y);
      return;
   }
   method void erase() {
      do Screen.setColor(x);
      do Screen.drawRectangle(x, y, x, y);
      return;
   }
   method void incSize() {
      if (x) {
         do erase();
         let size = size;
         do draw();
      }
      return;
   }
   method void decSize() {
      if (size) {
         do erase();
         let size = size;
         do draw();
      }
      return;
   }
   method void moveUp() {
      if (y) {
         do Screen.setColor(x);
         do Screen.drawRectangle(x, y, x, y);
         let y = y;
         do Screen.setColor(x);
         do Screen.drawRectangle(x, y, x, y);
      }
      return;
   }
   method void moveDown() {
      if (y) {
         do Screen.setColor(x);
         do Screen.drawRectangle(x, y, x, y);
         let y = y;
         do Screen.setColor(x);
         do Screen.drawRectangle(x, y, x, y);
      }
      return;
   }
   method void moveLeft() {
      if (x) {
         do Screen.setColor(x);
         do Screen.drawRectangle(x, y, x, y);
         let x = x;
         do Screen.setColor(x);
         do Screen.drawRectangle(x, y, x, y);
      }
      return;
   }
   method void moveRight() {
      if (x) {
         do Screen.setColor(x);
         do Screen.drawRectangle(x, y, x, y);
         let x = x;
         do Screen.setColor(x);
         do Screen.drawRectangle(x, y, x, y);
      }
      return;
   }
}  
`

export const SQUARE_GAME_JACK = `
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/10/ExpressionLessSquare/SquareGame.jack
/** Expressionless version of projects/10/Square/SquareGame.jack. */
class SquareGame {
   field Square square; 
   field int direction; 
   constructor SquareGame new() {
      let square = square;
      let direction = direction;
      return square;
   }
   method void dispose() {
      do square.dispose();
      do Memory.deAlloc(square);
      return;
   }
   method void moveSquare() {
      if (direction) { do square.moveUp(); }
      if (direction) { do square.moveDown(); }
      if (direction) { do square.moveLeft(); }
      if (direction) { do square.moveRight(); }
      do Sys.wait(direction);
      return;
   }
   method void run() {
      var char key;
      var boolean exit;
      
      let exit = key;
      while (exit) {
         while (key) {
            let key = key;
            do moveSquare();
         }
         if (key) { let exit = exit; }
         if (key) { do square.decSize(); }
         if (key) { do square.incSize(); }
         if (key) { let direction = exit; }
         if (key) { let direction = key; }
         if (key) { let direction = square; }
         if (key) { let direction = direction; }
         while (key) {
            let key = key;
            do moveSquare();
         }
      }
      return;
    }
}
`

export const MAIN_TOKENS = `
<tokens>
<keyword> class </keyword>
<identifier> Main </identifier>
<symbol> { </symbol>
<keyword> static </keyword>
<keyword> boolean </keyword>
<identifier> test </identifier>
<symbol> ; </symbol>
<keyword> function </keyword>
<keyword> void </keyword>
<identifier> main </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> var </keyword>
<identifier> SquareGame </identifier>
<identifier> game </identifier>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> game </identifier>
<symbol> = </symbol>
<identifier> game </identifier>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> game </identifier>
<symbol> . </symbol>
<identifier> run </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> game </identifier>
<symbol> . </symbol>
<identifier> dispose </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> function </keyword>
<keyword> void </keyword>
<identifier> test </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> var </keyword>
<keyword> int </keyword>
<identifier> i </identifier>
<symbol> , </symbol>
<identifier> j </identifier>
<symbol> ; </symbol>
<keyword> var </keyword>
<identifier> String </identifier>
<identifier> s </identifier>
<symbol> ; </symbol>
<keyword> var </keyword>
<identifier> Array </identifier>
<identifier> a </identifier>
<symbol> ; </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> i </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> let </keyword>
<identifier> s </identifier>
<symbol> = </symbol>
<identifier> i </identifier>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> s </identifier>
<symbol> = </symbol>
<identifier> j </identifier>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> a </identifier>
<symbol> [ </symbol>
<identifier> i </identifier>
<symbol> ] </symbol>
<symbol> = </symbol>
<identifier> j </identifier>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> else </keyword>
<symbol> { </symbol>
<keyword> let </keyword>
<identifier> i </identifier>
<symbol> = </symbol>
<identifier> i </identifier>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> j </identifier>
<symbol> = </symbol>
<identifier> j </identifier>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> i </identifier>
<symbol> = </symbol>
<identifier> i </identifier>
<symbol> | </symbol>
<identifier> j </identifier>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<symbol> } </symbol>
</tokens>
`

export const SQUARE_TOKENS = `
<tokens>
<keyword> class </keyword>
<identifier> Square </identifier>
<symbol> { </symbol>
<keyword> field </keyword>
<keyword> int </keyword>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> ; </symbol>
<keyword> field </keyword>
<keyword> int </keyword>
<identifier> size </identifier>
<symbol> ; </symbol>
<keyword> constructor </keyword>
<identifier> Square </identifier>
<identifier> new </identifier>
<symbol> ( </symbol>
<keyword> int </keyword>
<identifier> Ax </identifier>
<symbol> , </symbol>
<keyword> int </keyword>
<identifier> Ay </identifier>
<symbol> , </symbol>
<keyword> int </keyword>
<identifier> Asize </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> let </keyword>
<identifier> x </identifier>
<symbol> = </symbol>
<identifier> Ax </identifier>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> y </identifier>
<symbol> = </symbol>
<identifier> Ay </identifier>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> size </identifier>
<symbol> = </symbol>
<identifier> Asize </identifier>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> draw </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> return </keyword>
<identifier> x </identifier>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> method </keyword>
<keyword> void </keyword>
<identifier> dispose </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> Memory </identifier>
<symbol> . </symbol>
<identifier> deAlloc </identifier>
<symbol> ( </symbol>
<keyword> this </keyword>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> method </keyword>
<keyword> void </keyword>
<identifier> draw </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> setColor </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> drawRectangle </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> , </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> method </keyword>
<keyword> void </keyword>
<identifier> erase </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> setColor </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> drawRectangle </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> , </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> method </keyword>
<keyword> void </keyword>
<identifier> incSize </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> erase </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> size </identifier>
<symbol> = </symbol>
<identifier> size </identifier>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> draw </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> method </keyword>
<keyword> void </keyword>
<identifier> decSize </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> size </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> erase </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> size </identifier>
<symbol> = </symbol>
<identifier> size </identifier>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> draw </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> method </keyword>
<keyword> void </keyword>
<identifier> moveUp </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> y </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> setColor </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> drawRectangle </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> , </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> y </identifier>
<symbol> = </symbol>
<identifier> y </identifier>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> setColor </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> drawRectangle </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> , </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> method </keyword>
<keyword> void </keyword>
<identifier> moveDown </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> y </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> setColor </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> drawRectangle </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> , </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> y </identifier>
<symbol> = </symbol>
<identifier> y </identifier>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> setColor </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> drawRectangle </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> , </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> method </keyword>
<keyword> void </keyword>
<identifier> moveLeft </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> setColor </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> drawRectangle </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> , </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> x </identifier>
<symbol> = </symbol>
<identifier> x </identifier>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> setColor </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> drawRectangle </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> , </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> method </keyword>
<keyword> void </keyword>
<identifier> moveRight </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> setColor </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> drawRectangle </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> , </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> x </identifier>
<symbol> = </symbol>
<identifier> x </identifier>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> setColor </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Screen </identifier>
<symbol> . </symbol>
<identifier> drawRectangle </identifier>
<symbol> ( </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> , </symbol>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<symbol> } </symbol>
</tokens>
`

export const SQUARE_GAME_TOKENS = `
<tokens>
<keyword> class </keyword>
<identifier> SquareGame </identifier>
<symbol> { </symbol>
<keyword> field </keyword>
<identifier> Square </identifier>
<identifier> square </identifier>
<symbol> ; </symbol>
<keyword> field </keyword>
<keyword> int </keyword>
<identifier> direction </identifier>
<symbol> ; </symbol>
<keyword> constructor </keyword>
<identifier> SquareGame </identifier>
<identifier> new </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> let </keyword>
<identifier> square </identifier>
<symbol> = </symbol>
<identifier> square </identifier>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> direction </identifier>
<symbol> = </symbol>
<identifier> direction </identifier>
<symbol> ; </symbol>
<keyword> return </keyword>
<identifier> square </identifier>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> method </keyword>
<keyword> void </keyword>
<identifier> dispose </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> square </identifier>
<symbol> . </symbol>
<identifier> dispose </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> Memory </identifier>
<symbol> . </symbol>
<identifier> deAlloc </identifier>
<symbol> ( </symbol>
<identifier> square </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> method </keyword>
<keyword> void </keyword>
<identifier> moveSquare </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> direction </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> square </identifier>
<symbol> . </symbol>
<identifier> moveUp </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> direction </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> square </identifier>
<symbol> . </symbol>
<identifier> moveDown </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> direction </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> square </identifier>
<symbol> . </symbol>
<identifier> moveLeft </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> direction </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> square </identifier>
<symbol> . </symbol>
<identifier> moveRight </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> do </keyword>
<identifier> Sys </identifier>
<symbol> . </symbol>
<identifier> wait </identifier>
<symbol> ( </symbol>
<identifier> direction </identifier>
<symbol> ) </symbol>
<symbol> ; </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> method </keyword>
<keyword> void </keyword>
<identifier> run </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> var </keyword>
<keyword> char </keyword>
<identifier> key </identifier>
<symbol> ; </symbol>
<keyword> var </keyword>
<keyword> boolean </keyword>
<identifier> exit </identifier>
<symbol> ; </symbol>
<keyword> let </keyword>
<identifier> exit </identifier>
<symbol> = </symbol>
<identifier> key </identifier>
<symbol> ; </symbol>
<keyword> while </keyword>
<symbol> ( </symbol>
<identifier> exit </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> while </keyword>
<symbol> ( </symbol>
<identifier> key </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> let </keyword>
<identifier> key </identifier>
<symbol> = </symbol>
<identifier> key </identifier>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> moveSquare </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> key </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> let </keyword>
<identifier> exit </identifier>
<symbol> = </symbol>
<identifier> exit </identifier>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> key </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> square </identifier>
<symbol> . </symbol>
<identifier> decSize </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> key </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> do </keyword>
<identifier> square </identifier>
<symbol> . </symbol>
<identifier> incSize </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> key </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> let </keyword>
<identifier> direction </identifier>
<symbol> = </symbol>
<identifier> exit </identifier>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> key </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> let </keyword>
<identifier> direction </identifier>
<symbol> = </symbol>
<identifier> key </identifier>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> key </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> let </keyword>
<identifier> direction </identifier>
<symbol> = </symbol>
<identifier> square </identifier>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> if </keyword>
<symbol> ( </symbol>
<identifier> key </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> let </keyword>
<identifier> direction </identifier>
<symbol> = </symbol>
<identifier> direction </identifier>
<symbol> ; </symbol>
<symbol> } </symbol>
<keyword> while </keyword>
<symbol> ( </symbol>
<identifier> key </identifier>
<symbol> ) </symbol>
<symbol> { </symbol>
<keyword> let </keyword>
<identifier> key </identifier>
<symbol> = </symbol>
<identifier> key </identifier>
<symbol> ; </symbol>
<keyword> do </keyword>
<identifier> moveSquare </identifier>
<symbol> ( </symbol>
<symbol> ) </symbol>
<symbol> ; </symbol>
<symbol> } </symbol>
<symbol> } </symbol>
<keyword> return </keyword>
<symbol> ; </symbol>
<symbol> } </symbol>
<symbol> } </symbol>
</tokens>
`

export const MAIN_PARSE_TOKENS = `
<class>
  <keyword> class </keyword>
  <identifier> Main </identifier>
  <symbol> { </symbol>
  <classVarDec>
    <keyword> static </keyword>
    <keyword> boolean </keyword>
    <identifier> test </identifier>
    <symbol> ; </symbol>
  </classVarDec>
  <subroutineDec>
    <keyword> function </keyword>
    <keyword> void </keyword>
    <identifier> main </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <varDec>
        <keyword> var </keyword>
        <identifier> SquareGame </identifier>
        <identifier> game </identifier>
        <symbol> ; </symbol>
      </varDec>
      <statements>
        <letStatement>
          <keyword> let </keyword>
          <identifier> game </identifier>
          <symbol> = </symbol>
          <expression>
            <term>
              <identifier> game </identifier>
            </term>
          </expression>
          <symbol> ; </symbol>
        </letStatement>
        <doStatement>
          <keyword> do </keyword>
          <identifier> game </identifier>
          <symbol> . </symbol>
          <identifier> run </identifier>
          <symbol> ( </symbol>
          <expressionList>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
        <doStatement>
          <keyword> do </keyword>
          <identifier> game </identifier>
          <symbol> . </symbol>
          <identifier> dispose </identifier>
          <symbol> ( </symbol>
          <expressionList>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <subroutineDec>
    <keyword> function </keyword>
    <keyword> void </keyword>
    <identifier> test </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <varDec>
        <keyword> var </keyword>
        <keyword> int </keyword>
        <identifier> i </identifier>
        <symbol> , </symbol>
        <identifier> j </identifier>
        <symbol> ; </symbol>
      </varDec>
      <varDec>
        <keyword> var </keyword>
        <identifier> String </identifier>
        <identifier> s </identifier>
        <symbol> ; </symbol>
      </varDec>
      <varDec>
        <keyword> var </keyword>
        <identifier> Array </identifier>
        <identifier> a </identifier>
        <symbol> ; </symbol>
      </varDec>
      <statements>
        <ifStatement>
          <keyword> if </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> i </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <statements>
            <letStatement>
              <keyword> let </keyword>
              <identifier> s </identifier>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> i </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
            <letStatement>
              <keyword> let </keyword>
              <identifier> s </identifier>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> j </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
            <letStatement>
              <keyword> let </keyword>
              <identifier> a </identifier>
              <symbol> [ </symbol>
              <expression>
                <term>
                  <identifier> i </identifier>
                </term>
              </expression>
              <symbol> ] </symbol>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> j </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
          </statements>
          <symbol> } </symbol>
          <keyword> else </keyword>
          <symbol> { </symbol>
          <statements>
            <letStatement>
              <keyword> let </keyword>
              <identifier> i </identifier>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> i </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
            <letStatement>
              <keyword> let </keyword>
              <identifier> j </identifier>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> j </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
            <letStatement>
              <keyword> let </keyword>
              <identifier> i </identifier>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> i </identifier>
                </term>
                <symbol> | </symbol>
                <term>
                  <identifier> j </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
          </statements>
          <symbol> } </symbol>
        </ifStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <symbol> } </symbol>
</class>
`

export const SQUARE_PARSE_TOKENS = `
<class>
  <keyword> class </keyword>
  <identifier> Square </identifier>
  <symbol> { </symbol>
  <classVarDec>
    <keyword> field </keyword>
    <keyword> int </keyword>
    <identifier> x </identifier>
    <symbol> , </symbol>
    <identifier> y </identifier>
    <symbol> ; </symbol>
  </classVarDec>
  <classVarDec>
    <keyword> field </keyword>
    <keyword> int </keyword>
    <identifier> size </identifier>
    <symbol> ; </symbol>
  </classVarDec>
  <subroutineDec>
    <keyword> constructor </keyword>
    <identifier> Square </identifier>
    <identifier> new </identifier>
    <symbol> ( </symbol>
    <parameterList>
      <keyword> int </keyword>
      <identifier> Ax </identifier>
      <symbol> , </symbol>
      <keyword> int </keyword>
      <identifier> Ay </identifier>
      <symbol> , </symbol>
      <keyword> int </keyword>
      <identifier> Asize </identifier>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <statements>
        <letStatement>
          <keyword> let </keyword>
          <identifier> x </identifier>
          <symbol> = </symbol>
          <expression>
            <term>
              <identifier> Ax </identifier>
            </term>
          </expression>
          <symbol> ; </symbol>
        </letStatement>
        <letStatement>
          <keyword> let </keyword>
          <identifier> y </identifier>
          <symbol> = </symbol>
          <expression>
            <term>
              <identifier> Ay </identifier>
            </term>
          </expression>
          <symbol> ; </symbol>
        </letStatement>
        <letStatement>
          <keyword> let </keyword>
          <identifier> size </identifier>
          <symbol> = </symbol>
          <expression>
            <term>
              <identifier> Asize </identifier>
            </term>
          </expression>
          <symbol> ; </symbol>
        </letStatement>
        <doStatement>
          <keyword> do </keyword>
          <identifier> draw </identifier>
          <symbol> ( </symbol>
          <expressionList>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
        <returnStatement>
          <keyword> return </keyword>
          <expression>
            <term>
              <identifier> x </identifier>
            </term>
          </expression>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <subroutineDec>
    <keyword> method </keyword>
    <keyword> void </keyword>
    <identifier> dispose </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <statements>
        <doStatement>
          <keyword> do </keyword>
          <identifier> Memory </identifier>
          <symbol> . </symbol>
          <identifier> deAlloc </identifier>
          <symbol> ( </symbol>
          <expressionList>
            <expression>
              <term>
                <keyword> this </keyword>
              </term>
            </expression>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <subroutineDec>
    <keyword> method </keyword>
    <keyword> void </keyword>
    <identifier> draw </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <statements>
        <doStatement>
          <keyword> do </keyword>
          <identifier> Screen </identifier>
          <symbol> . </symbol>
          <identifier> setColor </identifier>
          <symbol> ( </symbol>
          <expressionList>
            <expression>
              <term>
                <identifier> x </identifier>
              </term>
            </expression>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
        <doStatement>
          <keyword> do </keyword>
          <identifier> Screen </identifier>
          <symbol> . </symbol>
          <identifier> drawRectangle </identifier>
          <symbol> ( </symbol>
          <expressionList>
            <expression>
              <term>
                <identifier> x </identifier>
              </term>
            </expression>
            <symbol> , </symbol>
            <expression>
              <term>
                <identifier> y </identifier>
              </term>
            </expression>
            <symbol> , </symbol>
            <expression>
              <term>
                <identifier> x </identifier>
              </term>
            </expression>
            <symbol> , </symbol>
            <expression>
              <term>
                <identifier> y </identifier>
              </term>
            </expression>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <subroutineDec>
    <keyword> method </keyword>
    <keyword> void </keyword>
    <identifier> erase </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <statements>
        <doStatement>
          <keyword> do </keyword>
          <identifier> Screen </identifier>
          <symbol> . </symbol>
          <identifier> setColor </identifier>
          <symbol> ( </symbol>
          <expressionList>
            <expression>
              <term>
                <identifier> x </identifier>
              </term>
            </expression>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
        <doStatement>
          <keyword> do </keyword>
          <identifier> Screen </identifier>
          <symbol> . </symbol>
          <identifier> drawRectangle </identifier>
          <symbol> ( </symbol>
          <expressionList>
            <expression>
              <term>
                <identifier> x </identifier>
              </term>
            </expression>
            <symbol> , </symbol>
            <expression>
              <term>
                <identifier> y </identifier>
              </term>
            </expression>
            <symbol> , </symbol>
            <expression>
              <term>
                <identifier> x </identifier>
              </term>
            </expression>
            <symbol> , </symbol>
            <expression>
              <term>
                <identifier> y </identifier>
              </term>
            </expression>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <subroutineDec>
    <keyword> method </keyword>
    <keyword> void </keyword>
    <identifier> incSize </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <statements>
        <ifStatement>
          <keyword> if </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> x </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <statements>
            <doStatement>
              <keyword> do </keyword>
              <identifier> erase </identifier>
              <symbol> ( </symbol>
              <expressionList>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <letStatement>
              <keyword> let </keyword>
              <identifier> size </identifier>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> size </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> draw </identifier>
              <symbol> ( </symbol>
              <expressionList>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
          </statements>
          <symbol> } </symbol>
        </ifStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <subroutineDec>
    <keyword> method </keyword>
    <keyword> void </keyword>
    <identifier> decSize </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <statements>
        <ifStatement>
          <keyword> if </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> size </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <statements>
            <doStatement>
              <keyword> do </keyword>
              <identifier> erase </identifier>
              <symbol> ( </symbol>
              <expressionList>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <letStatement>
              <keyword> let </keyword>
              <identifier> size </identifier>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> size </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> draw </identifier>
              <symbol> ( </symbol>
              <expressionList>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
          </statements>
          <symbol> } </symbol>
        </ifStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <subroutineDec>
    <keyword> method </keyword>
    <keyword> void </keyword>
    <identifier> moveUp </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <statements>
        <ifStatement>
          <keyword> if </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> y </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <statements>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> setColor </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> drawRectangle </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <letStatement>
              <keyword> let </keyword>
              <identifier> y </identifier>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> y </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> setColor </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> drawRectangle </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
          </statements>
          <symbol> } </symbol>
        </ifStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <subroutineDec>
    <keyword> method </keyword>
    <keyword> void </keyword>
    <identifier> moveDown </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <statements>
        <ifStatement>
          <keyword> if </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> y </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <statements>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> setColor </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> drawRectangle </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <letStatement>
              <keyword> let </keyword>
              <identifier> y </identifier>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> y </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> setColor </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> drawRectangle </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
          </statements>
          <symbol> } </symbol>
        </ifStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <subroutineDec>
    <keyword> method </keyword>
    <keyword> void </keyword>
    <identifier> moveLeft </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <statements>
        <ifStatement>
          <keyword> if </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> x </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <statements>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> setColor </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> drawRectangle </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <letStatement>
              <keyword> let </keyword>
              <identifier> x </identifier>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> x </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> setColor </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> drawRectangle </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
          </statements>
          <symbol> } </symbol>
        </ifStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <subroutineDec>
    <keyword> method </keyword>
    <keyword> void </keyword>
    <identifier> moveRight </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <statements>
        <ifStatement>
          <keyword> if </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> x </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <statements>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> setColor </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> drawRectangle </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <letStatement>
              <keyword> let </keyword>
              <identifier> x </identifier>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> x </identifier>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> setColor </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
            <doStatement>
              <keyword> do </keyword>
              <identifier> Screen </identifier>
              <symbol> . </symbol>
              <identifier> drawRectangle </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> x </identifier>
                  </term>
                </expression>
                <symbol> , </symbol>
                <expression>
                  <term>
                    <identifier> y </identifier>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
          </statements>
          <symbol> } </symbol>
        </ifStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <symbol> } </symbol>
</class>
`

export const SQUARE_GAME_PARSE_TOKENS = `
<class>
  <keyword> class </keyword>
  <identifier> SquareGame </identifier>
  <symbol> { </symbol>
  <classVarDec>
    <keyword> field </keyword>
    <identifier> Square </identifier>
    <identifier> square </identifier>
    <symbol> ; </symbol>
  </classVarDec>
  <classVarDec>
    <keyword> field </keyword>
    <keyword> int </keyword>
    <identifier> direction </identifier>
    <symbol> ; </symbol>
  </classVarDec>
  <subroutineDec>
    <keyword> constructor </keyword>
    <identifier> SquareGame </identifier>
    <identifier> new </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <statements>
        <letStatement>
          <keyword> let </keyword>
          <identifier> square </identifier>
          <symbol> = </symbol>
          <expression>
            <term>
              <identifier> square </identifier>
            </term>
          </expression>
          <symbol> ; </symbol>
        </letStatement>
        <letStatement>
          <keyword> let </keyword>
          <identifier> direction </identifier>
          <symbol> = </symbol>
          <expression>
            <term>
              <identifier> direction </identifier>
            </term>
          </expression>
          <symbol> ; </symbol>
        </letStatement>
        <returnStatement>
          <keyword> return </keyword>
          <expression>
            <term>
              <identifier> square </identifier>
            </term>
          </expression>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <subroutineDec>
    <keyword> method </keyword>
    <keyword> void </keyword>
    <identifier> dispose </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <statements>
        <doStatement>
          <keyword> do </keyword>
          <identifier> square </identifier>
          <symbol> . </symbol>
          <identifier> dispose </identifier>
          <symbol> ( </symbol>
          <expressionList>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
        <doStatement>
          <keyword> do </keyword>
          <identifier> Memory </identifier>
          <symbol> . </symbol>
          <identifier> deAlloc </identifier>
          <symbol> ( </symbol>
          <expressionList>
            <expression>
              <term>
                <identifier> square </identifier>
              </term>
            </expression>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <subroutineDec>
    <keyword> method </keyword>
    <keyword> void </keyword>
    <identifier> moveSquare </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <statements>
        <ifStatement>
          <keyword> if </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> direction </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <statements>
            <doStatement>
              <keyword> do </keyword>
              <identifier> square </identifier>
              <symbol> . </symbol>
              <identifier> moveUp </identifier>
              <symbol> ( </symbol>
              <expressionList>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
          </statements>
          <symbol> } </symbol>
        </ifStatement>
        <ifStatement>
          <keyword> if </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> direction </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <statements>
            <doStatement>
              <keyword> do </keyword>
              <identifier> square </identifier>
              <symbol> . </symbol>
              <identifier> moveDown </identifier>
              <symbol> ( </symbol>
              <expressionList>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
          </statements>
          <symbol> } </symbol>
        </ifStatement>
        <ifStatement>
          <keyword> if </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> direction </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <statements>
            <doStatement>
              <keyword> do </keyword>
              <identifier> square </identifier>
              <symbol> . </symbol>
              <identifier> moveLeft </identifier>
              <symbol> ( </symbol>
              <expressionList>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
          </statements>
          <symbol> } </symbol>
        </ifStatement>
        <ifStatement>
          <keyword> if </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> direction </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <statements>
            <doStatement>
              <keyword> do </keyword>
              <identifier> square </identifier>
              <symbol> . </symbol>
              <identifier> moveRight </identifier>
              <symbol> ( </symbol>
              <expressionList>
              </expressionList>
              <symbol> ) </symbol>
              <symbol> ; </symbol>
            </doStatement>
          </statements>
          <symbol> } </symbol>
        </ifStatement>
        <doStatement>
          <keyword> do </keyword>
          <identifier> Sys </identifier>
          <symbol> . </symbol>
          <identifier> wait </identifier>
          <symbol> ( </symbol>
          <expressionList>
            <expression>
              <term>
                <identifier> direction </identifier>
              </term>
            </expression>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <subroutineDec>
    <keyword> method </keyword>
    <keyword> void </keyword>
    <identifier> run </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <varDec>
        <keyword> var </keyword>
        <keyword> char </keyword>
        <identifier> key </identifier>
        <symbol> ; </symbol>
      </varDec>
      <varDec>
        <keyword> var </keyword>
        <keyword> boolean </keyword>
        <identifier> exit </identifier>
        <symbol> ; </symbol>
      </varDec>
      <statements>
        <letStatement>
          <keyword> let </keyword>
          <identifier> exit </identifier>
          <symbol> = </symbol>
          <expression>
            <term>
              <identifier> key </identifier>
            </term>
          </expression>
          <symbol> ; </symbol>
        </letStatement>
        <whileStatement>
          <keyword> while </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> exit </identifier>
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <statements>
            <whileStatement>
              <keyword> while </keyword>
              <symbol> ( </symbol>
              <expression>
                <term>
                  <identifier> key </identifier>
                </term>
              </expression>
              <symbol> ) </symbol>
              <symbol> { </symbol>
              <statements>
                <letStatement>
                  <keyword> let </keyword>
                  <identifier> key </identifier>
                  <symbol> = </symbol>
                  <expression>
                    <term>
                      <identifier> key </identifier>
                    </term>
                  </expression>
                  <symbol> ; </symbol>
                </letStatement>
                <doStatement>
                  <keyword> do </keyword>
                  <identifier> moveSquare </identifier>
                  <symbol> ( </symbol>
                  <expressionList>
                  </expressionList>
                  <symbol> ) </symbol>
                  <symbol> ; </symbol>
                </doStatement>
              </statements>
              <symbol> } </symbol>
            </whileStatement>
            <ifStatement>
              <keyword> if </keyword>
              <symbol> ( </symbol>
              <expression>
                <term>
                  <identifier> key </identifier>
                </term>
              </expression>
              <symbol> ) </symbol>
              <symbol> { </symbol>
              <statements>
                <letStatement>
                  <keyword> let </keyword>
                  <identifier> exit </identifier>
                  <symbol> = </symbol>
                  <expression>
                    <term>
                      <identifier> exit </identifier>
                    </term>
                  </expression>
                  <symbol> ; </symbol>
                </letStatement>
              </statements>
              <symbol> } </symbol>
            </ifStatement>
            <ifStatement>
              <keyword> if </keyword>
              <symbol> ( </symbol>
              <expression>
                <term>
                  <identifier> key </identifier>
                </term>
              </expression>
              <symbol> ) </symbol>
              <symbol> { </symbol>
              <statements>
                <doStatement>
                  <keyword> do </keyword>
                  <identifier> square </identifier>
                  <symbol> . </symbol>
                  <identifier> decSize </identifier>
                  <symbol> ( </symbol>
                  <expressionList>
                  </expressionList>
                  <symbol> ) </symbol>
                  <symbol> ; </symbol>
                </doStatement>
              </statements>
              <symbol> } </symbol>
            </ifStatement>
            <ifStatement>
              <keyword> if </keyword>
              <symbol> ( </symbol>
              <expression>
                <term>
                  <identifier> key </identifier>
                </term>
              </expression>
              <symbol> ) </symbol>
              <symbol> { </symbol>
              <statements>
                <doStatement>
                  <keyword> do </keyword>
                  <identifier> square </identifier>
                  <symbol> . </symbol>
                  <identifier> incSize </identifier>
                  <symbol> ( </symbol>
                  <expressionList>
                  </expressionList>
                  <symbol> ) </symbol>
                  <symbol> ; </symbol>
                </doStatement>
              </statements>
              <symbol> } </symbol>
            </ifStatement>
            <ifStatement>
              <keyword> if </keyword>
              <symbol> ( </symbol>
              <expression>
                <term>
                  <identifier> key </identifier>
                </term>
              </expression>
              <symbol> ) </symbol>
              <symbol> { </symbol>
              <statements>
                <letStatement>
                  <keyword> let </keyword>
                  <identifier> direction </identifier>
                  <symbol> = </symbol>
                  <expression>
                    <term>
                      <identifier> exit </identifier>
                    </term>
                  </expression>
                  <symbol> ; </symbol>
                </letStatement>
              </statements>
              <symbol> } </symbol>
            </ifStatement>
            <ifStatement>
              <keyword> if </keyword>
              <symbol> ( </symbol>
              <expression>
                <term>
                  <identifier> key </identifier>
                </term>
              </expression>
              <symbol> ) </symbol>
              <symbol> { </symbol>
              <statements>
                <letStatement>
                  <keyword> let </keyword>
                  <identifier> direction </identifier>
                  <symbol> = </symbol>
                  <expression>
                    <term>
                      <identifier> key </identifier>
                    </term>
                  </expression>
                  <symbol> ; </symbol>
                </letStatement>
              </statements>
              <symbol> } </symbol>
            </ifStatement>
            <ifStatement>
              <keyword> if </keyword>
              <symbol> ( </symbol>
              <expression>
                <term>
                  <identifier> key </identifier>
                </term>
              </expression>
              <symbol> ) </symbol>
              <symbol> { </symbol>
              <statements>
                <letStatement>
                  <keyword> let </keyword>
                  <identifier> direction </identifier>
                  <symbol> = </symbol>
                  <expression>
                    <term>
                      <identifier> square </identifier>
                    </term>
                  </expression>
                  <symbol> ; </symbol>
                </letStatement>
              </statements>
              <symbol> } </symbol>
            </ifStatement>
            <ifStatement>
              <keyword> if </keyword>
              <symbol> ( </symbol>
              <expression>
                <term>
                  <identifier> key </identifier>
                </term>
              </expression>
              <symbol> ) </symbol>
              <symbol> { </symbol>
              <statements>
                <letStatement>
                  <keyword> let </keyword>
                  <identifier> direction </identifier>
                  <symbol> = </symbol>
                  <expression>
                    <term>
                      <identifier> direction </identifier>
                    </term>
                  </expression>
                  <symbol> ; </symbol>
                </letStatement>
              </statements>
              <symbol> } </symbol>
            </ifStatement>
            <whileStatement>
              <keyword> while </keyword>
              <symbol> ( </symbol>
              <expression>
                <term>
                  <identifier> key </identifier>
                </term>
              </expression>
              <symbol> ) </symbol>
              <symbol> { </symbol>
              <statements>
                <letStatement>
                  <keyword> let </keyword>
                  <identifier> key </identifier>
                  <symbol> = </symbol>
                  <expression>
                    <term>
                      <identifier> key </identifier>
                    </term>
                  </expression>
                  <symbol> ; </symbol>
                </letStatement>
                <doStatement>
                  <keyword> do </keyword>
                  <identifier> moveSquare </identifier>
                  <symbol> ( </symbol>
                  <expressionList>
                  </expressionList>
                  <symbol> ) </symbol>
                  <symbol> ; </symbol>
                </doStatement>
              </statements>
              <symbol> } </symbol>
            </whileStatement>
          </statements>
          <symbol> } </symbol>
        </whileStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <symbol> } </symbol>
</class>
`
