// DOM elements
var gridNumbers = document.querySelector(".grid-nums");
var gridStars = document.querySelector(".grid-stars");
var gridResult = document.querySelector(".app-results");
var getResult = document.querySelector(".app-exe");
var getReset = document.querySelector(".app-reset");
console.dir(gridResult.children[0]);
// Results Dom
var numsGrid = gridResult.children[0].innerHTML.split(" ");
var starsGrid = gridResult.children[1].innerHTML.split(" ");
// Random number
function randomNumber(max) {
    return (Math.floor(Math.random() * max) + 1).toString();
}
// Create grids
function createGrids(min, max) {
    var arrNums = [];
    for (var index = min; index < max; index++) {
        arrNums.push(index.toString());
    }
    return arrNums;
}
// Inject Grid
function injectGrids(min, max, grid, target) {
    var list = createGrids(min, max);
    list = list
        .map(function (num) {
        return "<button type=\"button\" class=".concat(grid + "_" + num, ">").concat(num, "</button>");
    })
        .join("");
    // Generate DOM
    target.innerHTML = "".concat(list);
}
// Find loto numbers
function findJackpot(length, max, arrUser) {
    var arrDef = [];
    for (var index = 0; index < length; index++) {
        // Create random number
        var randomNum = randomNumber(max);
        // Check same number
        if (arrDef.length < 1 && !arrUser.includes(randomNum)) {
            arrDef.push(randomNum);
        }
        else {
            // IF number already use
            while (arrUser.includes(randomNum) || arrDef.includes(randomNum)) {
                randomNum = randomNumber(max);
            }
            arrDef.push(randomNum);
        }
    }
    return arrDef;
}
// Filter array DOM
function arrFiltNumAlreadyUse(arrDom) {
    // Filter user's numbers
    var arrUser = arrDom.filter(function (item) { return item.toString() !== "*"; });
    console.log("AR", arrUser);
    // Get length array number's find
    var length = arrDom.length - arrUser.length;
    // Toggle max
    var max = arrDom.length > 3 ? 50 : 12;
    // Get results
    var arrResult = findJackpot(length, max, arrUser).concat(arrUser);
    return arrResult.sort(function (a, b) { return a - b; }).join(" - ");
}
// Handle select number's buttons
function handleNum(ev) {
    ev.preventDefault();
    // Target button
    // const targetClass: HTMLButtonElement =  target;
    console.log("target", ev.target);
    // Sort class & number
    var targetClassNum = ev.target.className.split("_");
    console.log("yes", targetClassNum, numsGrid[0]);
    // IF numbers buttons
    // if (targetClassNum !== null && targetClassNum.includes("nums")) {
    //   // Check number's empty
    //   if (ev !== null && targetClass !== null) {
    //     ev.target.classList.toggle("selected");
    //   }
    //   const targetNum: string =
    //     targetClass !== null ? ev.target.className.split("_")[1] : "";
    //   console.log("tar", targetNum);
    //   // Check user's numbers
    //   if (numsGrid.every((current) => current === "*")) {
    //     // Get user's number
    //     numsGrid[0] = typeof targetNum === "string" ? targetNum : "*";
    //   } else {
    //     // Number already use
    //     console.log("***", targetNum, numsGrid.includes(targetNum));
    //     if (targetNum !== null && numsGrid.includes(targetNum)) {
    //       numsGrid.forEach((item, index) => {
    //         // Replace for "*"
    //         item === targetNum && (numsGrid[index] = "*");
    //       });
    //     } else {
    //       // Number not already use
    //       for (let index = 1; index < numsGrid.length; index++) {
    //         // Get 2nd user's number
    //         if (numsGrid[1] === "*") {
    //           numsGrid[1] = typeof targetNum === "string" ? targetNum : "*";
    //         } else if (
    //           numsGrid[2] === "*" &&
    //           numsGrid[1] !== "*" &&
    //           numsGrid[1] !== targetNum
    //         ) {
    //           // Get 3th user's number
    //           numsGrid[2] = typeof targetNum === "string" ? targetNum : "*";
    //         } else if (
    //           numsGrid[3] === "*" &&
    //           numsGrid[1] !== "*" &&
    //           numsGrid[1] !== targetNum &&
    //           numsGrid[2] !== "*" &&
    //           numsGrid[2] !== targetNum
    //         ) {
    //           // Get 4th user's number
    //           numsGrid[3] = typeof targetNum === "string" ? targetNum : "*";
    //         } else if (
    //           numsGrid[4] === "*" &&
    //           numsGrid[3] !== "*" &&
    //           numsGrid[3] !== targetNum &&
    //           numsGrid[1] !== "*" &&
    //           numsGrid[1] !== targetNum &&
    //           numsGrid[2] !== "*" &&
    //           numsGrid[2] !== targetNum
    //         ) {
    //           // Get 5th user's number
    //           numsGrid[4] = typeof targetNum === "string" ? targetNum : "*";
    //         }
    //       }
    //     }
    //   }
    //   // Generate DOM
    //   gridResult.children[0].innerHTML = numsGrid.join(" ");
    //   // IF stars button
    // } else {
    //   // Check star's empty
    //   if (ev !== null && targetClass !== null) {
    //     targetClass.classList.toggle("selected");
    //   }
    //   const targetNum: string =
    //     targetClass !== null ? targetClass.className.split("_")[1] : "";
    //   // Check user's numbers
    //   if (starsGrid.every((current) => current === "*")) {
    //     starsGrid[0] = typeof targetNum === "string" ? targetNum : "*";
    //   } else {
    //     if (targetNum !== null && starsGrid.includes(targetNum)) {
    //       starsGrid.forEach((item, index) => {
    //         // Replace for "*"
    //         item === targetNum && (starsGrid[index] = "*");
    //       });
    //     } else {
    //       // Number not already use
    //       for (let index = 1; index < starsGrid.length; index++) {
    //         if (starsGrid[1] === "*") {
    //           starsGrid[1] = typeof targetNum === "string" ? targetNum : "*";
    //         }
    //       }
    //     }
    //   }
    //   // Generate DOM
    //   gridResult.children[1].innerHTML = starsGrid.join(" ");
    // }
}
// Handle click "Find"
function handleResult(ev) {
    ev.preventDefault();
    // Generate DOM
    gridResult.children[0].innerHTML = arrFiltNumAlreadyUse(numsGrid);
    gridResult.children[1].innerHTML = arrFiltNumAlreadyUse(starsGrid);
}
// Reset click
function handleReset(ev) {
    ev.preventDefault();
    numsGrid = numsGrid.map(function (item) { return (item = "*"); });
    starsGrid = starsGrid.map(function (item) { return (item = "*"); });
    // Generate DOM
    gridResult.children[0].innerHTML = numsGrid.join(" ");
    gridResult.children[1].innerHTML = starsGrid.join(" ");
    // Remove selected button's class
    for (var _i = 0, _a = gridNumbers.children; _i < _a.length; _i++) {
        var button = _a[_i];
        button.classList.remove("selected");
    }
    for (var _b = 0, _c = gridStars.children; _b < _c.length; _b++) {
        var button = _c[_b];
        button.classList.remove("selected");
    }
}
injectGrids(1, 71, "nums", gridNumbers);
injectGrids(1, 13, "stars", gridStars);
// List buttons DOM
var listButtons = document.querySelectorAll("div.grid-nums > button, div.grid-stars > button");
// Listeners buttons action
getResult.addEventListener("click", handleResult);
getReset.addEventListener("click", handleReset);
// Listeners buttons numbers
listButtons.forEach(function (current) {
    console.log("cur", current);
    current.addEventListener("click", handleNum);
});
// console.log(listButtons);
