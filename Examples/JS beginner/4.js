var person = {};
person.name = "Hank";
person.sayHello = function () {
    console.log("hello " + this.name);
};
person.sayHello();
