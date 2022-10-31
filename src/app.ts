// DOM elements
const gridNumbers = document.querySelector(".grid-nums") as HTMLDivElement;
const gridStars = document.querySelector(".grid-stars") as HTMLDivElement;
const gridResult = document.querySelector(".app-results") as HTMLHtmlElement;
const getResult = document.querySelector(".app-exe") as HTMLButtonElement;
const getReset = document.querySelector(".app-reset") as HTMLButtonElement;

// Results Dom
let numsGrid: string[] = gridResult.children[0].innerHTML.split(" ");
let starsGrid: string[] = gridResult.children[1].innerHTML.split(" ");

// Random number
function randomNumber(max: number): string {
  return (Math.floor(Math.random() * max) + 1).toString();
}

// Create grids
function createGrids(min: number, max: number): string[] {
  let arrNums: string[] = [];
  for (let index: number = min; index < max; index++) {
    arrNums.push(index.toString());
  }

  return arrNums;
}

// Inject Grid
function injectGrids(
  min: number,
  max: number,
  grid: string,
  target: { innerHTML: string }
): void {
  let list: string[] | string = createGrids(min, max);
  list = list
    .map(
      (num: string) =>
        `<button type="button" class=${grid + "_" + num}>${num}</button>`
    )
    .join("");

  // Generate DOM
  target.innerHTML = `${list}`;
}

// Find loto numbers
function findJackpot(length: number, max: number, arrUser: string[]): string[] {
  let arrDef: string[] = [];
  for (let index = 0; index < length; index++) {
    // Create random number
    let randomNum: string = randomNumber(max);
    // Check same number
    if (arrDef.length < 1 && !arrUser.includes(randomNum)) {
      arrDef.push(randomNum);
    } else {
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
function arrFiltNumAlreadyUse(arrDom: string[]) {
  // Filter user's numbers
  const arrUser: string[] = arrDom.filter(
    (item: string) => item.toString() !== "*"
  );

  // Get length array number's find
  const length: number = arrDom.length - arrUser.length;
  // Toggle max
  const max: number = arrDom.length > 3 ? 50 : 12;
  // Get results
  const arrResult: string[] = findJackpot(length, max, arrUser).concat(arrUser);

  return arrResult.sort((a: any, b: any) => a - b).join(" - ");
}

// Handle select number's buttons
function handleNum(target: HTMLButtonElement): void {
  // Target button
  const targetValue: string = target.innerText;

  // IF numbers buttons
  if (target.className.includes("nums")) {
    // Check user's numbers
    if (numsGrid.every((current) => current === "*")) {
      // Get user's number
      numsGrid[0] = targetValue;
    } else {
      // Number already use
      if (numsGrid.includes(targetValue)) {
        numsGrid.forEach((item, index) => {
          // Replace for "*"
          item === targetValue && (numsGrid[index] = "*");
        });
      } else {
        // Number not already use
        for (let index = 1; index < numsGrid.length; index++) {
          // Get 2nd user's number
          if (numsGrid[1] === "*") {
            numsGrid[1] = targetValue;
          } else if (
            numsGrid[2] === "*" &&
            numsGrid[1] !== "*" &&
            numsGrid[1] !== targetValue
          ) {
            // Get 3th user's number
            numsGrid[2] = targetValue;
          } else if (
            numsGrid[3] === "*" &&
            numsGrid[1] !== "*" &&
            numsGrid[1] !== targetValue &&
            numsGrid[2] !== "*" &&
            numsGrid[2] !== targetValue
          ) {
            // Get 4th user's number
            numsGrid[3] = targetValue;
          } else if (
            numsGrid[4] === "*" &&
            numsGrid[3] !== "*" &&
            numsGrid[3] !== targetValue &&
            numsGrid[1] !== "*" &&
            numsGrid[1] !== targetValue &&
            numsGrid[2] !== "*" &&
            numsGrid[2] !== targetValue
          ) {
            // Get 5th user's number
            numsGrid[4] = targetValue;
          }
        }
      }
    }
    // Generate DOM
    gridResult.children[0].innerHTML = numsGrid.join(" ");
  } else {
    // IF stars button
    // Check user's numbers
    if (starsGrid.every((current) => current === "*")) {
      starsGrid[0] = targetValue;
    } else {
      if (starsGrid.includes(targetValue)) {
        starsGrid.forEach((item, index) => {
          // Replace for "*"
          item === targetValue && (starsGrid[index] = "*");
        });
      } else {
        // Number not already use
        for (let index = 1; index < starsGrid.length; index++) {
          if (starsGrid[1] === "*") {
            starsGrid[1] = targetValue;
          }
        }
      }
    }
    // Generate DOM
    gridResult.children[1].innerHTML = starsGrid.join(" ");
  }
  // ToggleStyle button
  target.classList.toggle("selected");
}

// Handle click "Find"
function handleResult(ev: MouseEvent): void {
  ev.preventDefault();
  // Generate DOM
  gridResult.children[0].innerHTML = arrFiltNumAlreadyUse(numsGrid);
  gridResult.children[1].innerHTML = arrFiltNumAlreadyUse(starsGrid);
}

// Reset click
function handleReset(ev: MouseEvent): void {
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

injectGrids(1, 51, "nums", gridNumbers);
injectGrids(1, 13, "stars", gridStars);

// List buttons DOM
const listButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  "div.grid-nums > button, div.grid-stars > button"
);

// Listeners buttons action
getResult.addEventListener("click", handleResult);
getReset.addEventListener("click", handleReset);

// Listeners buttons numbers
listButtons.forEach((current) => {
  current.addEventListener("click", () => handleNum(current));
});
