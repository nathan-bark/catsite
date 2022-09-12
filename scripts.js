const img = document.querySelector('.main-pic')
const button = document.querySelector('.get-cat-btn')
const apiKey = '?api_key=live_XWfF1hEAWjI9hbq2bCYKA3h7ysvOZeOP55FLXlKc8PmIdbWv0NbLq8QPxssSj1XT'

const getCats = async () => {
    
    const catBase = 'https://api.thecatapi.com/v1/images/search';
    const urlFetch = catBase + apiKey;

   try {
    const response = await fetch(urlFetch);
    if (response.ok){
        const catArray = await response.json();
        const imgLink = catArray[0].url;
        img.src = imgLink

    }
   }
   catch(error){
    alert(error)
   }
}


button.addEventListener('mousedown', getCats);

