const apiKey =
  "?api_key=live_XWfF1hEAWjI9hbq2bCYKA3h7ysvOZeOP55FLXlKc8PmIdbWv0NbLq8QPxssSj1XT";
const baseUrl = `https://api.thecatapi.com/v1/breeds`;
const button = document.querySelector(".submit");
let breedsArray = [];
let characteristicsArray = [];
let checkedResults = [];
const addResult = document.querySelector(".results");
const breedTitle = document.querySelector(".breed-title");
const breedDes = document.querySelector(".description");
const breedTemps = document.querySelector(".temps");
const breedPic = document.querySelector(".breed-pic");

const getBreeds = async () => {
  const fetchUrl = baseUrl + apiKey;
  const checkedChar = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  );
  characteristicsArray = [];
  checkedResults = [];
  checkedChar.forEach((char) => characteristicsArray.push(char.value)); //pushes ticked characteristics to array
  console.log(characteristicsArray);
  breedTitle.innerText = ``;
  breedDes.innerText = ``;
  breedTemps.innerText = ``;
  breedPic.src = "";

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

      if (checkedResults.length > 0) {
        breedTitle.innerText = `${checkedResults[0].name}`;
        breedDes.innerText = `${checkedResults[0].description}`;
        breedTemps.innerText = `${checkedResults[0].temperament}`;
        breedPic.src = checkedResults[0].image.url;
      }
    }
  } catch (error) {
    alert(error);
  }
};

const displayResults = async () => {};

button.addEventListener("click", getBreeds);
