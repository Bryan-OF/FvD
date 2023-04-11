// script.js

const baseURL = "https://v2.jokeapi.dev/joke/";
const endPoint = "Any?type=single";

// combinatie van baseURL en endPoint
const URL = baseURL + endPoint;

// de joke-ljst
const jokeList = document.querySelector('section:nth-of-type(1) ul');
// de get-joke-button
const getJokeButton = document.querySelector('div button');
// de like-list
const likeList = document.querySelector('section:nth-of-type(3) ul');


// tab-buttons
const jokeTab = document.querySelector('section:nth-of-type(1) h2 button');
const likeTab = document.querySelector('section:nth-of-type(3) h2 button');



/////////////
// GET A JOKE
/////////////

function getJoke() {
  getData(URL).then(data => {
    const theJoke = data.joke;
    const theJokeHTML = `
      <li>
        <p>${theJoke}</p>
        <button class="like-button">Like</button>
      </li>
    `;
    jokeList.insertAdjacentHTML('afterbegin', theJokeHTML);

    // Select the like button inside the newly added li element
    const likeButton = document.querySelector('li button.like-button');
    likeButton.addEventListener('click', () => {
      // Move the li element to the dropArea
      
      const listItem = likeButton.closest('li');
      likeList.prepend(listItem);
    });
  });
}


/* FETCH DATA   */
/* RETURNS JSON */
async function getData(URL) {
  return (
    fetch(URL)
      .then(
        response => response.json()
      )
      .then(
        jsonData => { return jsonData }
      )
  );
}


/* START */
getJokeButton.addEventListener("click", getJoke);





//////////////
// SWITCH TABS
//////////////

function switchTab(event) {
  const geklikteButton = event.currentTarget;
  const bijbehorendeSection = geklikteButton.closest("section");

  // als die section de class active heeft dan hoeft er niets te gebeuren
  if (bijbehorendeSection.classList.contains("active")) {
    // do nothing
  }
  // anders de tabs wisselen
  else {
    const deActieveSection = document.querySelector(".list.active");

    bijbehorendeSection.classList.add("active");
    deActieveSection.classList.remove("active");
  }
}

jokeTab.addEventListener("click", switchTab);
likeTab.addEventListener("click", switchTab);






////////////////////////
// Drag and drop funtion
////////////////////////

// used http://sortablejs.github.io/Sortable/#simple-list for help
// Target the 'ul' inside the first and third sections
const jokesList = document.querySelector("section:nth-of-type(1) > ul");
const dropArea = document.querySelector("section:nth-of-type(3) > ul");

Sortable.create(jokesList, {
  group: "shared",
  animation: 150,
  onEnd: function (evt) {
    if (evt.to === dropArea) { // Replace 'likedJokesList' with 'dropArea'
      evt.item.classList.add("liked");
    }
  },
});

Sortable.create(likeList, {
  group: "shared",
  animation: 150,
});