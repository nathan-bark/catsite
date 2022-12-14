const apiKey =
  "?api_key=live_XWfF1hEAWjI9hbq2bCYKA3h7ysvOZeOP55FLXlKc8PmIdbWv0NbLq8QPxssSj1XT";
const baseUrl = `https://api.thecatapi.com/v1/breeds`;
const button = document.querySelector(".submit");
let breedsArray = [];
let characteristicsArray = [];
let checkedResults = [];
const addResult = document.querySelector(".results");

const getBreeds = async () => {
  const fetchUrl = baseUrl + apiKey;
  const checkedChar = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  );
  characteristicsArray = [];
  checkedResults = [];
  checkedChar.forEach((char) => characteristicsArray.push(char.value)); //pushes ticked characteristics to array
  console.log(characteristicsArray);

  try {
    const response = await fetch(fetchUrl); //gets database

    if (response.ok) {
      breedsArray = await response.json(); //converts database data
    }

    if (characteristicsArray.length > 0) {
      for (let i = 0; i < breedsArray.length; i++) {
        let count = 0;
        for (let j = 0; j < characteristicsArray.length; j++) {
          if (breedsArray[i].temperament.includes(characteristicsArray[j])) {
            count++;
            if (count >= characteristicsArray.length) {
              checkedResults.push(breedsArray[i]);
            }
          }
        }
      }
      console.log(checkedResults);
    }
  } catch (error) {
    alert(error);
  }

  while (addResult.firstChild) {
    addResult.removeChild(addResult.firstChild);
  }

  if (checkedResults.length > 0) {
    displayResults();
  } else {
    const errorMessage = document.createElement("h4");
    errorMessage.classList.add("error-text");
    errorMessage.innerText =
      "Sorry! There are no cats with that combination. Please try again!";
    addResult.appendChild(errorMessage);

    const errorImage = document.createElement("img");
    errorImage.classList.add("error-image");
    errorImage.src =
      "https://static5.tgstat.ru/channels/_0/c0/c05c08dd5b20108f2990b095f1fbe328.jpg";
    addResult.appendChild(errorImage);
  }
};

const displayResults = () => {
  const resultsIntro = document.createElement("h3");
  resultsIntro.innerText = `We found ${checkedResults.length} cat(s) for you!`;
  addResult.appendChild(resultsIntro);

  checkedResults.forEach((cat) => {
    const div = document.createElement("div");
    div.classList.add("cat-result");
    addResult.appendChild(div);

    const h4 = document.createElement("h4");
    h4.innerText = `${cat.name}`;
    div.appendChild(h4);

    const description = document.createElement("p");
    description.innerText = `${cat.description}`;
    description.classList.add("result-description");
    div.appendChild(description);

    const temperament = document.createElement("p");
    temperament.innerText = `${cat.temperament}`;
    temperament.classList.add("result-temperament");
    div.appendChild(temperament);

    if (cat?.image?.url) {
      const image = document.createElement("img");
      image.src = cat.image.url;
      div.appendChild(image);
    } else {
      const imageLink = "";
    }
  });
};

const cleanResults = () => {
  document.querySelector(".character-options").style.display = "none";
  document.querySelector("h1").style.display = "none";

  const newButton = document.createElement("button");
  newButton.innerText = "Restart search";
  newButton.setAttribute("id", "restart-button");
  newButton.classList.add("restart-button");
  document.querySelector(".heading").appendChild(newButton);
};

const resetSearch = (e) => {
  if (e.target.id === "restart-button") window.location.reload();
};

button.addEventListener("click", cleanResults);
button.addEventListener("click", getBreeds);
document.body.addEventListener("click", resetSearch);
