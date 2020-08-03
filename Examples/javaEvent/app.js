function main(even) {
    var button = document.querySelector("button");
    button.addEventListener("click", function (event) {
        console.log(event);
    });
}

document.addEventListener("DOMContentLoaded", main);
