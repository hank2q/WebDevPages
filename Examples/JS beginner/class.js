class Person {
    constructor(firstName, lastName, age, gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
    }
    get fullName() {
        return this.firstName + " " + this.lastName;
    }
}

var hank = new Person("Hank", "Caesar", "23", "male");

console.log(hank.fullName);
