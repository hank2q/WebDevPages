// elements
const print = console.log;
const button = document.getElementById("gen");
const result = document.querySelector(".result");
const passwordLen = document.querySelector("#length");
const checks = document.querySelectorAll(".options input[type=checkbox]");
const word = document.querySelector("#word");
const subsCheck = document.querySelector("#subs");
const position = document.querySelectorAll("input[name=position]");
const copy = document.querySelector("#copy");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const characters = {
    caps: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    small: "abcdefghijklmnopqrstuvwxyz",
    digits: "0123456789",
    symbols: "!\"#$%&'*+,-./:;=?@\\^_`|~",
    brackets: "(){}[]<>",
};
const subs = {
    a: "@",
    c: "(",
    e: "3",
    g: "&",
    h: "#",
    i: "!",
    l: "1",
    o: "0",
    q: "9",
    s: "$",
    t: "7",
    z: "2",
};

// event listeners

word.addEventListener("input", function () {
    let disabled = document.querySelectorAll(".target");
    let r = document.querySelectorAll(".indicator::before");
    if (word.value) {
        subsCheck.disabled = false;
        disabled.forEach((item) => {
            item.classList.remove("disabled");
        });
        for (radio of position) {
            radio.disabled = false;
        }
    } else {
        subsCheck.disabled = true;
        disabled.forEach((item) => {
            item.classList.add("disabled");
        });
        for (radio of position) {
            radio.disabled = true;
        }
    }
});
button.addEventListener("click", () => {
    let pass = generatePass(passwordLen.value);
    result.value = pass;
});

copy.addEventListener("click", () => {
    result.select();
    result.setSelectionRange(0, 99999);
    document.execCommand("copy");
    let notification = document.querySelector(".notification");
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
        document.getSelection().removeAllRanges(); // remove selection
    }, 650);
});
plus.addEventListener("click", () => {
    passwordLen.value++;
});
minus.addEventListener("click", () => {
    passwordLen.value--;
});
// functions
function generatePass(passLen) {
    let pool = "";
    for (node of checks) {
        if (node.checked) {
            pool += characters[node.id];
        }
    }
    let password = "";
    for (i = 0; i < passLen; i++) {
        let index = randint(0, pool.length - 1);
        password += pool[index];
    }
    if (word.value) {
        let Word = word.value;
        if (subsCheck.checked) {
            let chars = Word.split("");
            for (chari in chars) {
                if (Object.keys(subs).includes(chars[chari].toLowerCase())) {
                    let chance = Math.random();
                    if (chance > 0.49) {
                        chars[chari] = subs[chars[chari].toLowerCase()];
                    }
                }
            }
            Word = chars.join("");
        }
        if (password.length <= Word.length) {
            password = Word;
            return password;
        }
        let place;
        for (pos of position) {
            if (pos.checked) {
                place = pos.value;
            }
        }
        if (place == "-1") {
            let replaced = password.slice(0, Word.length);
            password = password.replace(replaced, Word);
        } else if (place == "1") {
            let start = password.length - Word.length;
            let replaced = password.slice(start, password.length);
            password = password.replace(replaced, Word);
        } else {
            let mid = Math.floor((password.length - Word.length) / 2);
            let replaced = password.slice(mid, mid + Word.length);
            password = password.replace(replaced, Word);
        }
    }
    return password;
}

function randint(min, max) {
    let step = max - min + 1;
    let rand = Math.floor(Math.random() * step) + min;
    return rand;
}
