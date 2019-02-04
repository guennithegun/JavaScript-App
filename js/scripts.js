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

// modal functions (show/hide)
  function showModal(title, mass, height, gender) {
    var $modalContainer = document.querySelector('#modal-container');
    $modalContainer.innerHTML = ''; // clear all content

    var modal = document.createElement('div'); // create inner modal div
    modal.classList.add('modal');
    // adding the new content
    var closeButtonElement = document.createElement('button'); // close button
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    var titleElement = document.createElement('h1'); // create title element
    titleElement.innerText = title;

    var contentElementMass = document.createElement('p'); // create content elements
    var contentElementHeight = document.createElement('p');
    var contentElementGender = document.createElement('p');
    contentElementMass.innerText = 'Mass: ' + mass;
    contentElementHeight.innerText = 'Height: ' + height;
    contentElementGender.innerText = 'Gender: ' + gender;

    // apoending elements
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElementMass);
    modal.appendChild(contentElementHeight);
    modal.appendChild(contentElementGender);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible'); // add class to show modal
  }

  function hideModal() {
    var $modalContainer = document.querySelector('#modal-container');
    $modalContainer.classList.remove('is-visible'); // remove class to hide modal
  }

// function for showing the details of the characters in a modal
  function showDetails(item) {
    starwarsRepository.loadDetails(item).then(function (result) {
      showModal(item.name, item.mass, item.height, item.gender);
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

  // eventListeners for closing the modal by pressing ESC or clicking outside modal
  window.addEventListener('keydown', function(event) { // press ESC
    var $modalContainer = document.querySelector('#modal-container');

    if (event.key === "Escape" && $modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  var $modalContainer = document.querySelector('#modal-container'); // click outside modal
  $modalContainer.addEventListener('click', function(event) {
    var target = event.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

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
starwarsRepository.loadList();
