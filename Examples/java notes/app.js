// let header = document.getElementById("heading");
// console.log(header);
function main(event) {
    var count = 0;
    function sayHello() {
        count += 1;
        let reply = document.getElementById("name").value;
        let answer = document.getElementById("answer");
        // answer.textContent = "Hello " + reply; //inserts the test in the element
        if (reply == "fuck") {
            reply = "****";
            document.querySelector("#heading").textContent = "A wise guy eeh?!";
        }
        answer.innerHTML = "<h2>Hello " + reply + "</h2>"; // inserts an html element in the element
        this.textContent = `Said it ${count}`;
    }

    // adding the event handler in the script by 2 ways
    // method 1
    // document.querySelector("button").onclick = sayHello;

    // method 2
    document.querySelector("button").addEventListener("click", sayHello);

    /* in these cases the function will be pointin to the element (button) so we
can also modify the button by using (this) in the function*/
}

// use when putting the script tag in the head so that it wont execut once the page load insteaad in will define the script
document.addEventListener("DOMContentLoaded", main);
