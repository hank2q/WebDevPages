var x = 6;

if (x == 6) {
    console.log("x is 6");
} else {
    console.log("x is not 6");
}

/* there is an equlity operaotr == and a strict equality operator
the normal one does not take into account the data type
the strict one has to be on the same data type
e.g.
6 == '6' is true because it does a type conversion
but 6 === '6' is false 

same for not equal 
there is != and !==*/

// the and operator is && and the or operator is ||

if (1 <= x <= 10 && x == 6) {
    console.log(true);
}

/* switch is like a if else with a dictionary inside that checks a value pased to it with
predefined cased, there a default case which will be returned if non of the 
cases matched the value provided 
break will end the comparison and goes to the line after the switch statment*/

function getAnswer(number) {
    var answer;
    switch (number) {
        case "Hello":
            answer = "World";
            break;
        case "Sky":
            answer = "Fall";
            break;
        case "old":
            answer = "hag";
            break;
        default:
            answer = "a word";
    }
    return answer;
}

console.log(getAnswer("old"));

console.log("___________________________________________");

// dictionary act like classes when accessing their keys by dot notation

var myDict = {
    name: "hank",
    languages: ["python", "html", "sql", "css", "javascript", "batch"],
    car: null,
    life: -1,
};

console.log(myDict.languages);

// or the clasic way with brackets

console.log(myDict["name"]);

// to check if an object has a property use .hasOwnProperty()

console.log(myDict.hasOwnProperty("home"));

console.log("___________________________________________");

// for loops start with the variable to increment then the end of the incrementation and
// finaly what to do at the end of each loop

for (var i = 1; i < 10; i++) {
    console.log(i);
}

console.log("___________________________________________");
/* while loop are the same, but there is some thing called do while loops
in a while loop if the condition is not met from the start the while loop wont run
but in a do while loop in runs atleat once then checks the condition*/

var j = 10;
do {
    console.log("hi");
} while (j > 10);
