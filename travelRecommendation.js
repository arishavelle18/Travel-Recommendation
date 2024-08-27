const destination = document.getElementById("search-destination");
let count = 0;
let destinationWord = "";

const displayDestination = () => {
  const destination = document.getElementsByClassName("destination");
  try {
    if (!destination[0].value) throw "Destination is required";
    fetch("./travelRecommendation.json")
      .then((response) => response.json())
      .then((data) => {
        const keyword = destination[0].value.toLowerCase();
        let check = ["australia", "japan", "brazil"].indexOf(keyword);
        const type = ["countries", "temples", "beaches"];
        let checkCountryTempleBeach = type.indexOf(keyword);
        if (check !== -1) {
          const mainDiv = document.createElement("div");
          const country = data.countries.filter(
            (ctry) => ctry.name.toLowerCase() === keyword
          )[0];
          if (destinationWord !== keyword) {
            destinationWord = keyword;
            count = 0;
          }
          if (count > country.cities.length - 1) {
            count--;
            return;
          }

          mainDiv.classList.add("main");
          mainDiv.innerHTML = `
          <h1 class="shadow-pop-bl header-main">
          Share Your Travel Tales
          </h1>
          <p class=" p-main">Enter your thoughts, experiences, or any memorable moments from your travels</p>

          <div class="socmed-main">
            <a href="https://www.facebook.com/arishavellekarl.villanueva" class="fa-brands fa-facebook-f animate-button"></a>
            <a href="https://www.linkedin.com/in/arishavelle-karl-villanueva-276574241/"
              class="fa-brands fa-linkedin animate-button"></a>
            <a href="https://github.com/arishavelle18" class="fa-brands fa-github animate-button"></a>
          </div>
          <button class="book-main animate-button" onclick="booking()">Book Now</button>
          `;

          const rightSide = document.createElement("div");
          rightSide.classList.add("rightSide");
          rightSide.innerHTML = `
          <div class="image-travel">
            <button id="previous" onclick="backFunction()"><i class="animate-button ${
              count !== 0 ? "fa-solid fa-arrow-left" : "icon-sign-blank"
            }"></i></button>
            <img src="${
              country.cities[count].imageUrl
            }" alt="" width="300" height="300">
            <button id="move" onclick="moveFunction()"><i class=" animate-button ${
              count !== country.cities.length - 1
                ? "fa-solid fa-arrow-right"
                : "icon-sign-blank"
            }"></i></button>
          </div>
          <div class="image-description">
            <h2>${country.cities[count].name}</h2>
            <p>${country.cities[count].description}e</p>
          </div>`;

          const mainRightContainer =
            document.getElementsByClassName("real-main")[0];
          mainRightContainer.innerHTML = "";
          mainRightContainer.appendChild(mainDiv);
          mainRightContainer.appendChild(rightSide);
          mainRightContainer.classList.remove("main");
          mainRightContainer.classList.add("main-right-container");
        } else if (checkCountryTempleBeach !== -1) {
          const countriesArr = [];
          if (type[checkCountryTempleBeach] === "countries") {
            data.countries.forEach((country) => {
              country.cities.forEach((city) => {
                countriesArr.push(city);
              });
            });
          } else if (type[checkCountryTempleBeach] === "temples") {
            data.temples.forEach((temple) => {
              countriesArr.push(temple);
            });
          } else {
            data.beaches.forEach((beach) => {
              countriesArr.push(beach);
            });
          }

          const mainDiv = document.createElement("div");
          const country = data.countries.filter(
            (ctry) => ctry.name.toLowerCase() === keyword
          )[0];
          if (count > countriesArr.length - 1) {
            count--;
            return;
          }
          if (destinationWord !== keyword) {
            destinationWord = keyword;
            count = 0;
          }
          mainDiv.classList.add("main");
          mainDiv.innerHTML = `
          <h1 class="shadow-pop-bl header-main">
          Share Your Travel Tales
          </h1>
          <p class=" p-main">Enter your thoughts, experiences, or any memorable moments from your travels</p>

          <div class="socmed-main">
            <a href="https://www.facebook.com/arishavellekarl.villanueva" class="fa-brands fa-facebook-f animate-button"></a>
            <a href="https://www.linkedin.com/in/arishavelle-karl-villanueva-276574241/"
              class="fa-brands fa-linkedin animate-button"></a>
            <a href="https://github.com/arishavelle18" class="fa-brands fa-github animate-button"></a>
          </div>
          <button class="book-main" onclick="booking()">Book Now</button>
          `;
          console.log(countriesArr);
          const rightSide = document.createElement("div");
          rightSide.classList.add("rightSide");
          rightSide.innerHTML = `
          <div class="image-travel">
            <button id="previous" onclick="backFunction()"><i class="animate-button ${
              count !== 0 ? "fa-solid fa-arrow-left" : "icon-sign-blank"
            }"></i></button>
            <img src="${
              countriesArr[count].imageUrl
            }" alt="" width="300" height="300">
            <button id="move" onclick="moveFunction()"><i class="animate-button ${
              count !== countriesArr.length - 1
                ? "fa-solid fa-arrow-right"
                : "icon-sign-blank"
            }"></i></button>
          </div>
          <div class="image-description">
            <h2>${countriesArr[count].name}</h2>
            <p>${countriesArr[count].description}e</p>
          </div>`;

          const mainRightContainer =
            document.getElementsByClassName("real-main")[0];
          mainRightContainer.innerHTML = "";
          mainRightContainer.appendChild(mainDiv);
          mainRightContainer.appendChild(rightSide);
          mainRightContainer.classList.remove("main");
          mainRightContainer.classList.add("main-right-container");
        } else {
          toastr.error("Destination not found");
        }
      });
  } catch (error) {
    toastr.error(error);
  }
};

destination.addEventListener("click", displayDestination);

const moveFunction = () => {
  count += 1;
  displayDestination();
};

const backFunction = () => {
  count -= 1;
  if (count === -1) {
    count = 0;
    return;
  } else {
    displayDestination();
  }
};

const clearDestination = () => {
  const mainRightContainer = document.getElementsByClassName("real-main")[0];
  mainRightContainer.classList.remove("main-right-container");
  mainRightContainer.classList.add("main");
  mainRightContainer.innerHTML = `
      <h1 class="shadow-pop-bl header-main">
        Share Your Travel Tales
      </h1>
      <p class=" p-main">Enter your thoughts, experiences, or any memorable moments from your travels</p>

      <div class="socmed-main">
        <a href="https://www.facebook.com/arishavellekarl.villanueva"
          class="fa-brands fa-facebook-f animate-button"></a>
        <a href="https://www.linkedin.com/in/arishavelle-karl-villanueva-276574241/"
          class="fa-brands fa-linkedin animate-button"></a>
        <a href="https://github.com/arishavelle18" class="fa-brands fa-github animate-button"></a>
      </div>
      <button class="book-main animate-button" onclick="booking()">Book Now</button>
  `;
};

const booking = () => {
  alert("Thank you for booking");
};
