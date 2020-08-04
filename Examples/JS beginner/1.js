console.log("hello world");

/* Data types in js:
undefined
null
boolean
strings
numbers
symbol ?
object */

// declaring a variable can be done in three ways
var name = "Hank"; // var is a changable and global variable to its scope if there is an outer scope its not found there
let Name = "hank"; // let is a local variable available in the scope its defined in
const _name = "HANK"; // const is an unchangable variable ie. constant

aName = "han"; // this will be global to the whole script

// to reassign variable no need to use the keywords, like python

console.log(name);
console.log(Name);
console.log(_name);
console.log(aName);
console.log("___________________________________________");

// can also just define a variable without assignment then assigne it later

var x;
console.log(x);
x = 1;
console.log(x);
console.log("___________________________________________");
///////////////////////////////////////////////////////////////////////////////////

// incrimenting values by adding ++

var y = 10;
console.log(y);
y = y + 1;
console.log(y);
// the above can be simplified by this (only adds one)
y++;
console.log(y);

// decrementing works the same but with --
y--;
console.log(y);

console.log("___________________________________________");

// find the length of a variable by the .length method

var string = "hello world";
console.log(string.length);

console.log("___________________________________________");

let vari = 12;
console.log(vari);
