const apiKey =
  "?api_key=live_XWfF1hEAWjI9hbq2bCYKA3h7ysvOZeOP55FLXlKc8PmIdbWv0NbLq8QPxssSj1XT";
const baseUrl = `https://api.thecatapi.com/v1/breeds`;
const selector = document.querySelector(".breed-list");
const breedTitle = document.querySelector(".breed-title");
const wiki = document.querySelector(".wiki");
const temperament = document.querySelector(".temperament");
const description = document.querySelector(".description");
const catImg = document.querySelector(".cat-img");
let breedsList = []; //empty array for appropraite cats later

const catInfo = async () => {
  const fetchUrl = baseUrl + apiKey;

  try {
    const response = await fetch(fetchUrl);
    if (response.ok) { 
      const catArray = await response.json();
      catArray.filter((cat) => cat.image?.url != null); //filters cats without image object
      breedsList = catArray;
    }

    for (let i = 0; i < breedsList.length; i++) {
      const breed = breedsList[i];
      let option = document.createElement("option");

      if (!breed.image) continue; //ignores cats without picture

      //creates options in dropdown menu
      option.value = i;
      option.innerText = `${breed.name}`;
      selector.appendChild(option);
    }
  } catch (error) {
    alert(error);
  }

  
  showInfo(0);
};

catInfo();

//change info for selected breed
const showInfo = (value) => {
    breedTitle.innerText = `${breedsList[value].name}`;
    wiki.href = breedsList[value].wikipedia_url;
    temperament.innerText = breedsList[value].temperament;
    description.innerText = breedsList[value].description;
    catImg.src = breedsList[value].image.url;
  };

