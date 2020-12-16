export const JACK_FRAGMENT_CODES = {
  printInt:
`// Simple program to print an integer
// Yes it has a print line

class Main {
  function void main () {
    do Output.printInt(2);
    return;
  }
}
`,
  printStirng:
`/** Hello world program */

class Main {
  function void main () {
    /* Print some text using standard library */
    do Output.printString("Hello world");
    do Output.println(); // New line
    return;
  }
}
`,
  if:
`
// If statement

class Main {
  function void main () {
    if (true) {
      do Output.printInt(1); // print 1
    } else {
      do Output.printInt(2); // print 2
    }
    return;
  }
}
`,
  while:
`
// while statement

class Main {
  function void main () {
    var int i;
    
    let i = 0;
    while (i < 10) {
       let i = i + 1;
       do Output.printInt(i);
    }

    return i;
  }
}
`
}
