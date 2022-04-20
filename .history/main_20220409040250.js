let loading = false;
const API_STEAM = "https://cs-steam-api.herokuapp.com/";

const display = document.querySelector("#display");
const displayTitle = document.querySelector("#display-title");
const searchInput = document.querySelector("#search-form");
const categoryGroup = document.querySelector(".category-group");

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

fetchData();