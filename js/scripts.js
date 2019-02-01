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

  function loadList(link = apiURL, characters = []) {
    return new Promise (function (resolve, reject) {
      return fetch(link)
        .then(function (response) {
          return response.json();
          console.log(response);
        })
        .then(function (json) {
          characters = characters.concat(json.results);
          json.results.forEach(function (item) {
            var character = {
             name: item.name,
             detailsUrl: item.url
            };
            add(character);
            starwarsRepository.addListItem(character);
          });
          if (json.next !== null) {
            loadList(json.next, characters);
          } else {
            resolve(characters);
          }
        })
        .catch(function (e) {
          console.error(e);
        })
    })
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

// Call loadList() to create the elements for the DOM
starwarsRepository.loadList()
