// script.js

// JavaScript Document
console.log("howdy");

// api documentation: 'https://www.amiiboapi.com/'
const baseURL = "https://v2.jokeapi.dev/joke/";
const endPoint = "Any?type=single";

// combinatie van baseURL en endPoint
const URL = baseURL + endPoint;

// verder in de getAmiibo function

// de lijst
const list = document.querySelector('ul');
// de button
const button = document.querySelector('button');

/****************/
/* VUL DE LIJST */
/****************/
function getJoke() {
  getData(URL).then(data => {
    const theJoke = data.joke;
    const theJokeHTML = `
      <li>
        <p>${theJoke}</p>
        <button class="like-button">Like</button>
      </li>
    `;
    list.insertAdjacentHTML('afterbegin', theJokeHTML);

    // Select the like button inside the newly added li element
    const likeButton = document.querySelector('li button.like-button');
    likeButton.addEventListener('click', () => {
      // Move the li element to the dropArea
      const dropArea = document.querySelector('section:nth-of-type(3) > ul');
      const listItem = likeButton.closest('li');
      dropArea.prepend(listItem);
    });
  });
}

/****************/
/* FETCH DATA   */
/* RETURNS JSON */
/****************/
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

/*********/
/* START */
/*********/
button.addEventListener("click", getJoke);

// Drag and drop funtion
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

Sortable.create(dropArea, {
  group: "shared",
  animation: 150,
});


