function init(event) {
    const startingColor = document.getElementById("starting");
    const endingColor = document.getElementById("ending");
    const genBtn = document.getElementById("generate");
    const exp = document.querySelector(".exp");
    genBtn.addEventListener("click", generate);
    function generate() {
        exp.style.background = `linear-gradient(to right, ${startingColor.value}, ${endingColor.value})`;
    }
}
document.addEventListener("DOMContentLoaded", init);
