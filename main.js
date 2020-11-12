let title = document.querySelector("#message")
let items = document.querySelectorAll(".game-item")
let reset = document.querySelector("#reset-game")
let player = "X"
let stepCount = 0
let dataX = []
let dataO = []
let winCombinations = [
   [1, 2, 3],
   [1, 4, 7],
   [1, 5, 9],
   [2, 5, 8],
   [3, 6, 9],
   [3, 5, 7],
   [4, 5, 6],
   [7, 8, 9]
]


for (let i = 0; i < items.length; i++) {
   items[i].addEventListener("click", currentStep)
}

reset.addEventListener("click", resetGame)

function currentStep() {
   let num = +this.getAttribute("data-ceil")
   if (!this.innerHTML) {
      this.innerHTML = player;
      (player === "X")
         ? dataX.push(num) && this.classList.add("x")
         : dataO.push(num) && this.classList.add("o");

      if (
         (dataX.length > 2 || dataO.length > 2) &&
         (checkWin(dataO, num) || checkWin(dataX, num))
      ) {
         for (let i = 0; i < items.length; i++) {
            items[i].removeEventListener("click", currentStep)
         }
         return title.innerHTML = "Победил игрок " + player
      };
      changePlayer()
      stepCount++
      stepCount > 8
         ? title.innerHTML = "Ничья"
         : title.innerHTML = "Ходит игрок " + player
   }
}

function changePlayer() {
   if (player === "X") player = "O";
   else player = "X"
}

function resetGame() {
   for (let i = 0; i < items.length; i++) {
      items[i].innerHTML = ""
      title.innerHTML = "Ходит игрок X"
      player = "X"
      stepCount = 0
      dataO = []
      dataX = []
      items[i].addEventListener("click", currentStep)
      items[i].classList.remove("x", "o")
   }
}

function checkWin(arr, number) {
   for (let i = 0; i < winCombinations.length; i++) {
      let someWinArr = winCombinations[i]
      let count = 0
      if (someWinArr.indexOf(number) != -1) {
         for (let k = 0; k < someWinArr.length; k++) {
            if (arr.indexOf(someWinArr[k]) != -1) {
               count++;
               if (count === 3) {
                  return true;
               }
            }
         }
         count = 0;
      }
   }
}

