function func() {
    var x = "var func x";
    var y = "let func y";
    console.log(x);
    console.log(y);
}
var x = "out x";
var y = "out y";
func();
console.log(x);
console.log(y);
func();
console.log(x);
console.log(y);

var x = 1;
if (true) {
    console.log(x);
    console.log("x is bigger");
    let y = 12;
} else {
    console.log("x is smaller");
}
console.log(y);

console.log("_____________________________________");
// f string work by using `` instead of quotation marks and putting $ before the template string

let name = "hank";
console.log(`hello my name is ${name}`);
