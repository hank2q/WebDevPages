function main(even) {
    var red = document.querySelector("#red");
    var green = document.querySelector("#green");
    var blue = document.querySelector("#blue");
    red.def = red.style;
    green.def = green.style;
    blue.def = blue.style;
    red.clicked = false;
    green.clicked = false;
    blue.clicked = false;
    // function default(element) {}
    function on_click(button, color) {
        if (!button.clicked) {
            document.querySelector("body").style.backgroundColor = color;
            button.style.backgroundColor = "#0000008e";
            button.style.color = color;
            button.style.border = "none";
            button.style.paddingTop = "13px";
            button.clicked = true;
        } else {
            document.querySelector("body").style.backgroundColor = "white";
            button.clicked = false;
            button.style = button.def;
        }
    }
    red.addEventListener("click", function () {
        on_click(red, "red");
        green.style = green.def;
        blue.style = blue.def;
        green.clicked = false;
        blue.clicked = false;
    });
    green.addEventListener("click", function () {
        on_click(green, "green");
        red.style = red.def;
        blue.style = blue.def;
        red.clicked = false;
        blue.clicked = false;
    });
    blue.addEventListener("click", function () {
        on_click(blue, "blue");
        red.style = red.def;
        green.style = green.def;
        red.clicked = false;
        green.clicked = false;
    });
}

document.addEventListener("DOMContentLoaded", main);
