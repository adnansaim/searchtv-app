const searchBtn = document.querySelector(".search-button");
const displayData = document.querySelector(".flex");
const searchInput = document.querySelector(".tvSearchInput");

searchBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  // if input doesn't exist then
  if (searchInput.value === "") {
    return (displayData.innerHTML = "<h1>Please give a valid input</h1>");
  }
  //after new search is clicked previously shown data is gone
  displayData.innerHTML = "";
  try {
    // calling api
    const res = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${searchInput.value}`
    );
    // checking whether the data recieved from the api returns anhything
    if (res.data.length > 0) {
      //creating all the cards and appending it
      for (movieObject of res.data) {
        let newCard = createCard(movieObject.show);
        displayData.append(newCard);
      }
      searchInput.value = "";
    }
  } catch (e) {
    displayData.innerHTML = "<h1>Uh Oh! something went wrong</h1>"
  }
});

//card creation function
function createCard(movieObjShow) {
  const container = document.createElement("div");
  container.classList.add("card");
  const containerImg = document.createElement("img");
  if (movieObjShow.image && movieObjShow.image.medium) {
    containerImg.src = movieObjShow.image.medium;
  } else {
    containerImg.src = `https://placehold.co/210x295`;
  }

  containerImg.classList.add("cardImg");
  const containerTitle = document.createElement("h1");
  containerTitle.textContent = movieObjShow.name;
  const rated = document.createElement("h3");
  if (movieObjShow.rating.average) {
    rated.textContent = movieObjShow.rating.average;
  } else {
    rated.textContent = "not available";
  }

  container.append(containerImg, rated, containerTitle);

  container.addEventListener('click',function(){
    
  })
  return container;
}
