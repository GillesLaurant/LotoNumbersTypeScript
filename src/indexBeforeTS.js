// DOM elements
const gridNumbers = document.querySelector(".grid-nums");
const gridStars = document.querySelector(".grid-stars");
const gridResult = document.querySelector(".app-results");
const getResult = document.querySelector(".app-exe");
const getReset = document.querySelector(".app-reset");

// Results Dom
let numsGrid = gridResult.children[0].innerText.split(" ");
let starsGrid = gridResult.children[1].innerText.split(" ");

// Random number
function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

// Create grids
function createGrids(min, max) {
  let arrayNums = [];
  for (let index = min; index < max; index++) {
    arrayNums.push(index);
  }
  return arrayNums;
}

// Inject Grid
function injectGrids(min, max, grid, target) {
  let list = createGrids(min, max);
  list = list
    .map(
      (num) => `<button type="button" class=${grid + "_" + num}>${num}</button>`
    )
    .join("");

  // Generate DOM
  target.innerHTML = `${list}`;
}

// Find loto numbers
function findResult(length, max, arrayUser) {
  let arrayDefaults = [];
  for (let index = 0; index < length; index++) {
    // Create random number
    let randomNum = randomNumber(max);

    // Check same number
    if (arrayDefaults.length < 1 && !arrayUser.includes(randomNum)) {
      arrayDefaults.push(randomNum);
    } else {
      // IF number already use
      while (
        arrayUser.includes(randomNum) ||
        arrayDefaults.includes(randomNum)
      ) {
        randomNum = randomNumber(max);
      }
      arrayDefaults.push(randomNum);
    }
  }
  return arrayDefaults;
}

// Filter array DOM
function arrayFilter(arrayDom) {
  // Filter user's numbers
  const arrayUser = arrayDom.filter((item) => item !== "*");
  // Get length array number's find
  const length = arrayDom.length - arrayUser.length;
  // Toggle max
  const max = arrayDom.length > 3 ? 50 : 12;
  // Get results
  let arrayResult = findResult(length, max, arrayUser).concat(arrayUser);

  return arrayResult.sort((a, b) => a - b).join(" - ");
}

// Handle click "Find"
function handleResult(ev) {
  ev.preventDefault();
  // Generate DOM
  gridResult.children[0].innerHTML = arrayFilter(numsGrid);
  gridResult.children[1].innerHTML = arrayFilter(starsGrid);
}

// Handle select number's buttons
function handleNum(ev) {
  ev.preventDefault();
  // Target button
  let target = ev.target.className;
  // ev.target.classList.toggle("selected");
  // Sort class & number
  target = target.split("_");
  target[1] = parseInt(target[1]);
  // IF numbers buttons
  if (target.includes("nums")) {
    // Check number's empty
    if (numsGrid.includes("*") || ev.target.className.includes("selected")) {
      ev.target.classList.toggle("selected");
    }
    // Check user's numbers
    if (numsGrid.every((current) => current === "*")) {
      // Get user's number
      numsGrid[0] = target[1];
    } else {
      // Number already use
      if (numsGrid.includes(target[1])) {
        numsGrid.forEach((item, index) => {
          // Replace for "*"
          item === target[1] && (numsGrid[index] = "*");
        });
      } else {
        // Number not already use
        for (let index = 1; index < numsGrid.length; index++) {
          // Get 2nd user's number
          if (numsGrid[1] === "*") {
            numsGrid[1] = target[1];
          } else if (
            numsGrid[2] === "*" &&
            numsGrid[1] !== "*" &&
            numsGrid[1] !== target[1]
          ) {
            // Get 3th user's number
            numsGrid[2] = target[1];
          } else if (
            numsGrid[3] === "*" &&
            numsGrid[1] !== "*" &&
            numsGrid[1] !== target[1] &&
            numsGrid[2] !== "*" &&
            numsGrid[2] !== target[1]
          ) {
            // Get 4th user's number
            numsGrid[3] = target[1];
          } else if (
            numsGrid[4] === "*" &&
            numsGrid[3] !== "*" &&
            numsGrid[3] !== target[1] &&
            numsGrid[1] !== "*" &&
            numsGrid[1] !== target[1] &&
            numsGrid[2] !== "*" &&
            numsGrid[2] !== target[1]
          ) {
            // Get 5th user's number
            numsGrid[4] = target[1];
          }
        }
      }
    }
    // Generate DOM
    gridResult.children[0].innerHTML = numsGrid.join(" ");

    // IF stars button
  } else {
    // Check star's empty
    if (starsGrid.includes("*") || ev.target.className.includes("selected")) {
      ev.target.classList.toggle("selected");
    }
    // Check user's numbers
    if (starsGrid.every((current) => current === "*")) {
      starsGrid[0] = target[1];
    } else {
      if (starsGrid.includes(target[1])) {
        starsGrid.forEach((item, index) => {
          // Replace for "*"
          item === target[1] && (starsGrid[index] = "*");
        });
      } else {
        // Number not already use
        for (let index = 1; index < starsGrid.length; index++) {
          if (starsGrid[1] === "*") {
            starsGrid[1] = target[1];
          }
        }
      }
    }
    // Generate DOM
    gridResult.children[1].innerHTML = starsGrid.join(" ");
  }
}

// Reset click
function handleReset(ev) {
  ev.preventDefault();
  numsGrid = numsGrid.map((item) => (item = "*"));
  starsGrid = starsGrid.map((item) => (item = "*"));
  // Generate DOM
  gridResult.children[0].innerHTML = numsGrid.join(" ");
  gridResult.children[1].innerHTML = starsGrid.join(" ");
  // Remove selected button's class
  for (const button of gridNumbers.children) {
    button.classList.remove("selected");
  }
  for (const button of gridStars.children) {
    button.classList.remove("selected");
  }
}

// Create DOM grids
injectGrids(1, 51, "nums", gridNumbers);
injectGrids(1, 13, "stars", gridStars);

// List buttons DOM
const listButtons = document.querySelectorAll(
  "div.grid-nums > button, div.grid-stars > button"
);
// Listeners buttons action
getResult.addEventListener("click", handleResult);
getReset.addEventListener("click", handleReset);

// Listeners buttons numbers
listButtons.forEach((current) => current.addEventListener("click", handleNum));
