function shuffleTiles() {
   let number = [...Array(15).keys()].map((i) => i + 1);
   number.sort(() => Math.random() - 0.5);
   console.log(number);
   return number;
}
let number = shuffleTiles();

for (let i = 0; i < number.length; i++) {
   const newDiv = document.createElement("div");
   newDiv.classList.add("tile");
   newDiv.textContent = number[i];
   const container = document.querySelector(".playing__field");
   container.appendChild(newDiv);
}
const emptyTile = document.createElement("div");
emptyTile.classList.add("tile", "empty");
document.querySelector(".playing__field").appendChild(emptyTile);

const tiles = document.querySelectorAll(".tile");

// function isAdjacent(tile) {
//    const tileIndex = Array.from(tiles).indexOf(tile);
//    const tileRow = Math.floor(tileIndex / 4);
//    const tileColumn = tileIndex % 4;

//    const nextTile = tile.nextElementSibling;
//    const prevTile = tile.previousElementSibling;

//    if (tileColumn < 3) {
//       const nextTile = tiles[tileIndex + 1];
//       if (nextTile && !nextTile.classList.contains("empty")) {
//          return true;
//       }
//    }
//    if (tileColumn > 0) {
//       const prevTile = tiles[tileIndex - 1];
//       if (prevTile && !prevTile.classList.contains("empty")) {
//          return true;
//       }
//    }

//    if (tileRow > 0) {
//       const aboveTile = tiles[tileIndex - 4];
//       if (aboveTile && !aboveTile.classList.contains("empty")) {
//          return true;
//       }
//    }
//    if (tileRow < 3) {
//       const belowTile = tiles[tileIndex + 4];
//       if (belowTile && !belowTile.classList.contains("empty")) {
//          return true;
//       }
//    }
//    return false;
// }
// Функція для перевірки на сусіда з класом empty
function isAdjacentToEmpty(tile) {
   const tileIndex = Array.from(tiles).indexOf(tile); // Отримуємо індекс плитки в сітці
   const tileRow = Math.floor(tileIndex / 4); // Визначаємо ряд плитки
   const tileColumn = tileIndex % 4; // Визначаємо стовпець плитки

   if (tileColumn < 3) {
      const nextTile = tiles[tileIndex + 1];
      if (nextTile && nextTile.classList.contains("empty")) {
         console.log(
            `Плитка ${tile.textContent} має порожнього сусіда праворуч.`
         );
         return true;
      }
   }

   if (tileColumn > 0) {
      const prevTile = tiles[tileIndex - 1];
      if (prevTile && prevTile.classList.contains("empty")) {
         console.log(
            `Плитка ${tile.textContent} має порожнього сусіда ліворуч.`
         );
         return true;
      }
   }

   if (tileRow > 0) {
      const aboveTile = tiles[tileIndex - 4];
      if (aboveTile && aboveTile.classList.contains("empty")) {
         console.log(
            `Плитка ${tile.textContent} має порожнього сусіда зверху.`
         );
         return true;
      }
   }

   if (tileRow < 3) {
      const belowTile = tiles[tileIndex + 4];
      if (belowTile && belowTile.classList.contains("empty")) {
         console.log(`Плитка ${tile.textContent} має порожнього сусіда знизу.`);
         return true;
      }
   }

   return false;
}

tiles.forEach((tile) => {
   tile.addEventListener("click", () => {
      const isAdjacentTile = isAdjacentToEmpty(tile);
      console.log(
         `Плитка ${tile.textContent} має сусіда з класом "empty"?`,
         isAdjacentTile
      );
   });
});

function moveTile(tile) {
   const emptyTile = document.querySelector(".empty");

   const isAdjacentTile = isAdjacentToEmpty(tile);
   if (isAdjacentTile) {
      const tileRect = tile.getBoundingClientRect();
      const emptyTileRect = emptyTile.getBoundingClientRect();

      const deltaX = emptyTileRect.left - tileRect.left;
      const deltaY = emptyTileRect.top - tileRect.top;

      tile.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      setTimeout(() => {
         const tempText = tile.textContent;
         tile.textContent = emptyTile.textContent;
         emptyTile.textContent = tempText;

         tile.classList.add("empty");
         emptyTile.classList.remove("empty");

         tile.style.transform = "";
         emptyTile.style.transform = "";
      }, 200);
   }
}

tiles.forEach((tile) => {
   tile.addEventListener("click", () => {
      moveTile(tile);
      console.log(`Плитка ${tile.textContent} переміщена.`);
   });
});

function checkGameCompletion() {
   const tiles = document.querySelectorAll(".tile");
   const tileNumbers = [];

   tiles.forEach((tile) => {
      if (!tile.classList.contains("empty")) {
         tileNumbers.push(parseInt(tile.textContent)); // Додаємо число плитки
      }
   });

   // Перевіряємо, чи є числа від 1 до 15 у правильному порядку
   const sortedNumbers = [...tileNumbers].sort((a, b) => a - b); // Сортуємо числа

   // Якщо плитки від 1 до 15 йдуть по порядку, гра завершена
   if (
      JSON.stringify(sortedNumbers) ===
      JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
   ) {
      console.log("Гра завершена!");
      alert("Вітаємо! Ви виграли!");
   }
}
