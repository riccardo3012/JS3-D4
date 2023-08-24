const loadImagesButton = document.querySelector(".btn-primary");
const loadSecondaryImagesButton = document.querySelector(".btn-secondary");
const cardsContainer = document.querySelector(".album .container .row");
console.log(cardsContainer);
const apiKey = "rzjlEJDO5Ge9VV1iiKImqIbVCR25JwaBi7XHoQCPD4XFNcfvujlnOutZ";
const link = "https://api.pexels.com/v1/search";
const linkDue = "https://api.pexels.com/v1/search?query=[your-secondary-query]";

//CHIAMATA FETCH
function fetchImages(query) {
  return fetch("${link}?query=${query}", {
    headers: {
      Authorization: apiKey,
    },
  }).then((response) => response.json());
}
/*
  loadImagesButton.addEventListener("click", function () {
    fetchImages("[your-query]")
      .then((data) => updateCardData(data.photos))
      .catch((error) => console.error(error));
  });

  loadSecondaryImagesButton.addEventListener("click", function () {
    fetchImages("[your-secondary-query]")
      .then((data) => updateCardData(data.photos))
      .catch((error) => console.error(error));
  });

  function updateCardData(images) {
    const cardImages = document.querySelectorAll(".card-img-top");
    console.log(cardImages);
    cardImages.forEach((cardImage, index) => {
      if (images[index]) {
        cardImage.src = images[index].src.large;
        cardImage.alt = images[index].photographer;
      }
    });
  }
});
*/

document.addEventListener("DOMContentLoaded", function () {
  const loadImagesButton = document.querySelector(".btn-primary");
  const loadSecondaryImagesButton = document.querySelector(".btn-secondary");
  const cardsContainer = document.querySelector(".album .container .row");
  const searchField = document.getElementById("searchField");
  const hideButton = document.getElementById("hideButton");

  const apiKey = "rzjlEJDO5Ge9VV1iiKImqIbVCR25JwaBi7XHoQCPD4XFNcfvujlnOutZ";
  const baseUrl = "https://api.pexels.com/v1/search";

  function fetchImages(query) {
    return fetch(`${baseUrl}?query=${query}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }).then((response) => response.json());
  }

  loadImagesButton.addEventListener("click", function () {
    fetchImages("[your-query]").then((data) => updateCardData(data.photos));
  });

  loadSecondaryImagesButton.addEventListener("click", function () {
    fetchImages("[your-secondary-query]").then((data) => updateCardData(data.photos));
  });

  searchField.addEventListener("change", function () {
    const query = searchField.value;
    fetchImages(query).then((data) => updateCardData(data.photos));
  });

  hideButton.addEventListener("click", function () {
    cardsContainer.innerHTML = "";
  });

  function updateCardData(images) {
    cardsContainer.innerHTML = "";

    images.forEach(function (image) {
      const card = createCard(image);
      cardsContainer.appendChild(card);
    });
  }
  function createCard(image) {
    const card = document.createElement("div");
    card.classList.add("col-md-4");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card", "mb-4", "shadow-sm");

    const imageElement = document.createElement("img");
    imageElement.src = image.src.large;
    imageElement.classList.add("bd-placeholder-img", "card-img-top");
    imageElement.width = "100%";
    imageElement.height = 225;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = image.photographer;

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = image.photographer_url;

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("d-flex", "justify-content-between", "align-items-center");

    const viewButton = document.createElement("button");
    viewButton.type = "button";
    viewButton.classList.add("btn", "btn-sm", "btn-outline-secondary");
    viewButton.textContent = "View";

    const hideButton = document.createElement("button");
    hideButton.type = "button";
    hideButton.classList.add("btn", "btn-sm", "btn-outline-secondary");
    hideButton.textContent = "Hide";

    const smallText = document.createElement("small");
    smallText.classList.add("text-muted");
    smallText.textContent = "9 mins";

    buttonGroup.appendChild(viewButton);
    buttonGroup.appendChild(hideButton);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(buttonGroup);
    cardBody.appendChild(smallText);

    cardInner.appendChild(imageElement);
    cardInner.appendChild(cardBody);

    card.appendChild(cardInner);

    return card;
  }
});
