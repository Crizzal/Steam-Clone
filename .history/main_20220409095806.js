let loading = false;
const API_STEAM = "https://cs-steam-api.herokuapp.com/";

const display = document.querySelector("#display");
const displayTitle = document.querySelector("#display-title");
const searchInput = document.querySelector("#search-form");
const categoryGroup = document.querySelector(".category-group");

// Get data

const fetchData = async (endpoint, value = " ") => {
    if(loading) return;
    display.innerHTML = `<div class="loader"> Loading ...</div>`;
    let data = {};

    let url = `${API_STEAM}${endpoint}/${value}`;
    if (endpoint === "search") url += "/page/1";
    try {
      loading = true;
      const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host" : "https://cs-steam-api.herokuapp.com",
          },
      });
      data = await response.json();

      loading = false;
      return data;
    } catch (err) {
        renderDisplay(error.msg);
    }
};

// Image on click

const renderDetail = (data) => {
    display.innerHTML = "";
    displayTitle.innerHTML = data.title;

    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <div class="showing-game show-detail">
        <div class="title-contain">
            <div class="title">${data.title}</div>
            <div class="price">${data.price}</div>
        </div>
        <div class="img-detail">
            <img src="${data.imgUrl}" alt="${data.price}"/>
            <div className="game-details">
                <div class="game-description">${data.description}</div>
                <div className="game-informations">
                    <p> RECENT REVIEWS : ${data.allReviews.summary}</p>
                </div>
            </div>
        </div>
    </div>
    `
}