let loading = false;
const API_STEAM = "https://cs-steam-api.herokuapp.com";

const display = document.querySelector("#display");
const displayTitle = document.querySelector("#display-title");
const searchInput = document.querySelector("#search-form");
const categoryGroup = document.querySelector(".category-group");
const searchButton = document.querySelector("#search-logo");

// Get data

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://cs-steam-api.herokuapp.com/games", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
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
                    <p>RECENT REVIEWS : ${data.allReviews.summary}</p>
                    <p>RELEASE DATE: ${data.released}</p>
                    <p>DEVELOPER : <a href="${data.developer.link}">${data.developer.name}</a></p>
                    <p>PUBLISHER: <a href="${data.publisher.link}">${data.publisher.name}</a></p>
                </div>
            </div>
        </div>
        <div class="tags-contain">
        Popular user-defined tags for this product:
            <div class="tags">
                <div class="tag"><a href="${data.tags[0].url}">${data.tags[0].name}</a></div>
                </div>
                <div class="tag"><a href="${data.tags[1].url}">${data.tags[1].name}</a></div>
                </div>
                <div class="tag"><a href="${data.tags[2].url}">${data.tags[2].name}</a></div>
                </div>
                <div class="tag"><a href="${data.tags[3].url}">${data.tags[3].name}</a></div>
                </div>
                <div class="tag"><a href="${data.tags[4].url}">${data.tags[4].name}</a></div>
                </div>
                <div class="tag"><a href="${data.tags[5].url}">${data.tags[5].name}</a></div>
                </div>
                <div class="tag"><a href="${data.tags[6].url}">${data.tags[6].name}</a></div>
                </div>
                <div class="tag"><a href="${data.tags[7].url}">${data.tags[7].name}</a></div>
                </div>      
        </div>   
    </div>
    `;
    display.appendChild(newDiv);
};

const appDetail = async (appId) => {
    const data = await fetchData("appDetail", appId);
    renderDetail(data);
  };
  const renderGame = (el) => {
    const newDiv = document.createElement("div");
  
    newDiv.innerHTML = `<div class="game_wrapper">
      <div class="cover" onClick="appDetail(${el["appId"]})">
      <img
      src="${el["imgUrl"].replace(/\/\w+.jpg/, "/header.jpg")}" data-id="${
      el["appId"]
    }"
      />
      <div class="game_info">
      <p>${el["title"]}</p>
      <p>${el["price"]}</p>
      </div>
      </div>
      </div>`;
    display.appendChild(newDiv);
  };
  
