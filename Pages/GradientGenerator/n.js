function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return [r + r + g + g + b + b];
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

function getLevels(sc, ec, range) {
    range += 1;
    let levels = [];
    let start = Math.min(sc, ec);
    let end = Math.max(sc, ec);
    let increment = Math.round((end - start) / range);
    levels.push(start);
    console.log(levels);
    for (let i = 0; i < range; i++) {
        let nextLevel = levels[levels.length - 1] + increment;
        console.log(nextLevel);
        levels.push(nextLevel);
    }
    if (levels[levels.length - 1] >= end) {
        levels.pop();
        levels.push(end);
    } else {
        levels.push(end);
    }
    if (sc > ec) {
        levels.reverse();
    }
    return levels;
}
function zip(arrays) {
    return arrays[0].map(function (_, i) {
        return arrays.map(function (array) {
            return array[i];
        });
    });
}
const srgb = hexToRgb("#0000ff");
const ergb = hexToRgb("#ff0000");
console.log(srgb);
console.log(ergb);
let sArray = Object.keys(srgb).map(function (key) {
    return srgb[key];
});
let eArray = Object.keys(ergb).map(function (key) {
    return ergb[key];
});
let r = getLevels(sArray[0], eArray[0], 10);
let g = getLevels(sArray[1], eArray[1], 10);
let b = getLevels(sArray[2], eArray[2], 10);
let res = [r, g, b];
res = zip(res);
console.log(res);
checkLast(res);
function checkLast(result) {
    let last = result[result.length - 1];
    console.log(last);
    let lastCheck =
        last[0] == undefined || last[1] == undefined || last[2] == undefined;
    console.log(lastCheck);
    if (lastCheck) {
        for (x in last) {
            if (last[x] === undefined) {
                last[x] = eArray[x];
            }
        }
    }
}
console.log(res);
let hexRes = [];
for (x of res) {
    hexRes.push(rgbToHex(x[0], x[1], x[2]));
}
console.log(hexRes);
