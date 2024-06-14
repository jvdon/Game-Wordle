let rows = document.querySelectorAll(".row");

let remaining = 5;

let chosenWord = "";
let pokemonImg;
do {
      fetchPokemon();
} while (chosenWord.length != 8);

console.log(chosenWord);

rows.forEach(row => {
      let cols = [...row.children];

      cols.forEach(col => {
            col.onkeyup = (e) => {
                  let inp = e.target;

                  let lastSibling = row.lastElementChild;
                  let nextSibling = inp.nextElementSibling;

                  let isLast = (inp == lastSibling);

                  if (isLast) {
                        //TODO: Check if word is right
                        if (checkWord(cols) || remaining == 0) {
                              let inputs = document.querySelectorAll(".slot");
                              inputs.forEach(col => {
                                    col.setAttribute("disabled", true);
                                    col.setAttribute("readonly", true);
                              });
                              gameOver();
                        }
                  }

                  if (inp.value.length == inp.maxLength) {
                        if (!isLast) {
                              nextSibling.focus();
                        }
                  }


            }
      });
});

/**
 * 
 * @param {HTMLInputElement[]} cols 
 */

function checkWord(cols) {
      remaining--;
      let testWord = "";

      cols.forEach(inp => {
            testWord += inp.value;
      })

      //! Letter position on array
      let len = testWord.length;

      for (let i = 0; i < len; i++) {
            let testChar = testWord[i];
            let rightChar = chosenWord[i];

            let right = (testChar == rightChar);
            cols[i].classList.toggle("right", right);
            cols[i].classList.toggle("wrong", !right);

            cols[i].setAttribute("readonly", right);
      }

      return (testWord == chosenWord);
}

function fetchPokemon() {
      let url = `https://pokeapi.co/api/v2/pokemon/${random(1, 500)}`;
      $.ajax({
            type: "GET",
            url: url,
            success: function (response) {
                  chosenWord = (response["name"]);
                  pokemonImg = response["sprites"]["front_default"];
            },
            async: false
      });
}

function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
}

function gameOver() {
      let endGame = document.querySelector(".end-game");
      endGame.removeAttribute("hidden")

      endGame.children[0].textContent = "Tries: " + (5 - remaining);

      // Pokemon Name
      document.querySelector(".pokemon .name").textContent = `Your Pokemon was: \n${chosenWord}`;
      document.querySelector(".pokemon .sprite").src = pokemonImg;

}