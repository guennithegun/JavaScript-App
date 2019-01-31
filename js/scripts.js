// New Code using IIFE

var starwarsRepository = (function () {
// Array with Star Wars Characters as Objects
  var characters = [];
// API URL
  var apiURL = 'https://swapi.co/api/people/';
// function to add characters
  function add(item) {
    characters.push(item);
 }
// function to select characters
  function getAll() {
    return characters;
 }
// function to add List item to DOM
  function addListItem(character) {
    var $unorderedList = document.querySelector('ul');
    // create necessary elements
    var $newListElement = document.createElement('li');
    var $newSpanElement = document.createElement('span');
    var $newButtonElement = document.createElement('button');
    // inner text for elements
    $newButtonElement.innerText = '+';
    $newSpanElement.innerText = character.name;
    // add the classes
    $newListElement.classList.add('content__item');
    $newButtonElement.classList.add('content__item--button');
    //append new elements
    $unorderedList.appendChild($newListElement);
    $newListElement.appendChild($newSpanElement);
    $newListElement.appendChild($newButtonElement);
    // add event listener
    $newButtonElement.addEventListener('click', function (event) {
      showDetails(character);
    });
    $newButtonElement.addEventListener('click', function (event) {
      var audio = new Audio('files/lasrhit4.mp3');
      audio.play();
    });
  }
  // function for showing the details of the characters
  function showDetails(item) {
    starwarsRepository.loadDetails(item).then(function () {
       console.log(item);
    });
  }
  // loading the characters from API
  function loadList(link = apiURL) {
    var currentURL = link;

    return fetch(currentURL).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var character = {
         name: item.name,
         detailsUrl: item.url
        };
        add(character);
      });
      currentURL = json.next; // Page that lists next 10 characters
      console.log(currentURL); // Check if correct
      console.log(characters.length); // Check if new characters were added to characters array
      if (currentURL !== null) { // Use this as recursion to run function again with next page of characters
        loadList(currentURL);
      }
    }).catch(function (e) {
      console.error(e);
    })
    // ORIGINAL CODE commented out
    /*return fetch(apiURL).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var character = {
         name: item.name,
         detailsUrl: item.url
        };
        add(character);
      });
    }).catch(function (e) {
      console.error(e);
    })*/
  }
  //selecting the details that should be shown by clicking the button
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        // Now add the details to the item
        item.mass = details.mass;
        item.height = details.height;
        item.gender = details.gender;
    }).catch(function (e) {
        console.error(e);
    });
  }

  return {
   add: add,
   getAll: getAll,
   addListItem: addListItem,
   showDetails: showDetails,
   loadList: loadList,
   loadDetails: loadDetails
 };
})();

// forEach() function to create the elements for the DOM
starwarsRepository.loadList().then(function() {
  starwarsRepository.getAll().forEach(function(character) {
    starwarsRepository.addListItem(character);
  });
  console.log(starwarsRepository.getAll().length) // checking the length of characters
});
