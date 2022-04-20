//--------------------------------------------------
//--CORE FUNCTIONS
//---Fetching data
const loader = document.querySelector(".loader");
const URL = "https://cs-steam-api.herokuapp.com/";
async function getGames(query, value) {
  try {
    let url = `${URL}games?${query}=${value}`;
    const response = await fetch(url);
    if (response.ok) {
      loader.classList.add("hidden");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
//---Rendering items
const itemsContainer = document.querySelector(".items-container");
async function displayGames(query, value) {
  try {
    const res = await getGames(query, value);
    const data = res["data"];
    console.log(data);
    itemsContainer.innerHTML = "";
    const itemsList = document.createElement("div");
    itemsList.classList.add("items-list");
    itemsContainer.appendChild(itemsList);
    data.forEach((game) => {
      const x = document.createElement("div");
      x.classList.add("item-card");
      x.addEventListener("click", () => {
        displayAppDetail(`${game.appid}`);
      });
      //---marking prices

      function freeGame() {
        if (game.price === 0) {
          x.innerHTML = `
                    <a class="card steam-card">
        <img
          class="card-img-top"
          src="${game.header_image}";
          alt="${game.name}"
        />
        <div class="card-body">
          <h2>${game.name}</h2>
          <p class="card-text red">Free</p>
        </div>
      </a>
      `;
        } else {
          x.innerHTML = `<a class="card steam-card">
        <img
          class="card-img-top"
          src="${game.header_image}";
          alt="${game.name}"
        />
        <div class="card-body">
          <h2>${game.name}</h2>
          <p class="card-text green">$${game.price}</p>
        </div>
      </a>`;
        }
      }
      //---displaying games
      for (let i = 0; i < data.length; i++) {
        freeGame();
      }

      itemsList.appendChild(x);
    });
  } catch (err) {
    console.log(err.message);
  }
}
displayGames("q", "restaurant");
//--------------------------------------------------
//--SEARCH TOOL
const searchInput = document.querySelector("#search-query");
const form = document.querySelector(".search-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchInput.value) {
    console.log("inputValuehere=> ", searchInput.value);
    displayGames("q", searchInput.value);
  }
});
//--------------------------------------------------
//--CATEGORY FILTER
async function getGenres() {
  try {
    const res = await fetch("https://cs-steam-api.herokuapp.com/genres");
    if (res.ok) {
      loader.classList.toggle("hidden");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
async function displayGenres() {
  try {
    const res = await getGenres();
    const data = res["data"];
    const categoryFilter = document.querySelector(".category-filter");
    categoryFilter.innerHTML = "";
    data.forEach((genre) => {
      const x = document.createElement("button");
      x.innerHTML = `${genre.name}`;
      x.addEventListener("click", () => {
        console.log("button clicked");
        displayGames("genres", `${genre.name}`);
      });
      categoryFilter.appendChild(x);
    });
  } catch (err) {
    console.log(err.message);
  }
}
displayGenres();
//--------------------------------------------------
//--APP DETAIL
async function getGameDetail(appid) {
  try {
    loader.classList.toggle("hidden");
    let url = `${URL}single-game/${appid}`;
    const response = await fetch(url);
    console.log(url);
    if (response.ok) {
      loader.classList.toggle("hidden");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
const displayAppDetail = async (appid) => {
  itemsContainer.innerHTML = "";
  try {
    const data = await getGameDetail(appid);
    const app = data["data"];
    console.log(app);
    const appDetail = document.createElement("div");
    appDetail.classList.add("app-detail");
    appDetail.innerHTML = `
              
        <img src="${app.header_image}" alt="header-img">
      <div class="right-detail">
        <div class="title">
          <p>${app.name}</p>
        </div>
        <div class="top-content-box">
          <p>${app.description}</p>

          <div class="tags">
            <div class="tag-box">${app.steamspy_tags[0]}</div>
            <div class="tag-box">${app.steamspy_tags[1]}</div>
            <div class="tag-box">${app.steamspy_tags[2]}</div>
        </div>
          
        </div>
        <div class="bottom-content-box">
          <div class="platform">
            <div class="plat-img ${app.platforms[0]}"></div>
            <div class="plat-img ${app.platforms[1]}"></div>
            <div class="plat-img ${app.platforms[2]}"></div>
          </div>
            <div class="rating">
              <img src="https://icones.pro/wp-content/uploads/2021/04/icone-noire-vert.png" style="width: 20px;" alt="">
              <p>${app.positive_ratings}</p>
            </div>
        </div>
      </div>
  `;
    itemsContainer.appendChild(appDetail);
  } catch (err) {
    console.log(err.message);
  }
};
