/**
  * Name: Trey Michaels
  * Date: 4/16/2019
  * Section: CSE 154 AG
  * This main.js file provides interactability with the buttons for the index.html file
  * It also can add to the html or alter classes with the style.css file. I use the Tmdb database
  * for the fetch request and all data and content belongs to them.
*/

(function() {
  "use strict";

  let apiKey = "a1de9dd956709bc982a2e0e349e0dd32";
  const COLOR = ["blue", "purple", "yellow", "orange", "pink"];
  const URL_BASE = "https://api.themoviedb.org/3/movie";

  /** Calls main when window is loaded. */
  window.addEventListener("load", main);

  /**
    * Provides ability for users to change the color of the background, change images,
    * show hidden content, and add features to the extra sections. Also makes a request out
    * to the Tmdb api.
  */
  function main() {
    makeRequest();
  }

  /**
   *  Make sure to always add a descriptive comment above
   *  every function detailing what it's purpose is
   *  Use JSDoc format with @param and @return.
   */

  /**
   * Fetches data from a URL while considering query values.
   * Checks to see if everything works while fetching data.
   * If successful, a function successfully uses the information.
   * If not, an error is caught and logged.
   * All data belongs to tmdb (https://www.themoviedb.org/documentation/api)
   */
  function makeRequest() {
    let url = URL_BASE; // if no params needed in request url
    url += "/popular?api_key="; // one query/value pair, indicated with a starting ?
    url += apiKey; // two or more query/value pairs, joined by &
    url += "&language=en-US&page=1";
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(successFunction)
      .catch(console.log);
  }

  /**
    * Creates a dom list element with the names of the top 10 most popular movies.
    * Adds the movies to that section.
    * @param{object} responseData is the data given after making the fetch request.
    * All data from (https://api.themoviedb.org/3/movie).
   */
  function successFunction(responseData) {
    console.log(responseData);
    let movies = id("popular-movies");
    for (let i = 0; i < 12; i++) {
      let card = document.createElement("div");
      let front = document.createElement("div");
      let back = document.createElement("div");
      card.classList.add("card");
      card.id = i;
      front.classList.add("front");
      back.classList.add("back");
      back.classList.add("hidden");
      let poster = document.createElement("img");
      poster.src = "https://image.tmdb.org/t/p/w200" + responseData.results[i].poster_path;
      let title = document.createElement("p");
      title.innerText = "Title: " + responseData.results[i].title;
      let releaseDate = document.createElement("p");
      let hiddenInfo = document.createElement("p");
      hiddenInfo.innerText = "Overview: \n" + responseData.results[i].overview;
      releaseDate.innerText = "Release Date: " + responseData.results[i].release_date;
      front.appendChild(poster);
      front.appendChild(title);
      back.appendChild(releaseDate);
      back.appendChild(hiddenInfo);
      card.appendChild(front);
      card.appendChild(back);
      card.addEventListener("click", showBackSide);
      movies.appendChild(card);
    }

    function showBackSide() {
      id(this.id).querySelector('.back').classList.remove("hidden");
      id(this.id).querySelector(".front").classList.add("hidden");
      id(this.id).addEventListener("click", showFrontSide);
      id(this.id).removeEventListener("click", showBackSide);
    }

    function showFrontSide() {
      id(this.id).querySelector('.front').classList.remove("hidden");
      id(this.id).querySelector(".back").classList.add("hidden");
      id(this.id).addEventListener("click", showBackSide);
      id(this.id).removeEventListener("click", showFrontSide);

    }
  }

   /** Randomly sets the background color to another color */


  /** Sets the background color of the document to its default color */


  /** Changes the profile picture and changes text to red. */

  /** Adds a ":-)" to the document html within the Extra section. */

  /**
   * Helper function to make it easier to get the id of an element.
   * @param {object} element - id specified
   * @returns {object} - returns the DOM element associated with the id.
   */
  function id(element) {
    return document.getElementById(element);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

})();
