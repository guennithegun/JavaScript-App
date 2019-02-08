// New Code using IIFE

var starwarsRepository = (function () {
// Array with Star Wars Characters as Objects
  var characters = [];
// API URL
  var apiURL = 'https://akabab.github.io/starwars-api/api/all.json';
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
  function showModal(title, mass, height, gender, homeworld, species, more, image) {
    var $modalContainer = document.querySelector('#modal-container');
    $modalContainer.innerHTML = ''; // clear all content

    var modal = document.createElement('div'); // create inner modal div
    modal.classList.add('modal');

    // adding the new content
    var closeButtonElement = document.createElement('div'); // close button
    var closeButton = document.createElement('button');
    closeButtonElement.classList.add('button-element');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', hideModal);

    var imageContainer = document.createElement('div'); // image
    var characterImage = document.createElement('img');
    imageContainer.classList.add('image-container');
    characterImage.setAttribute('src', image);
    characterImage.classList.add('character-image');

    var titleElement = document.createElement('h1'); // create title element
    titleElement.innerText = title;

    var contentElementMass = document.createElement('p'); // create content elements
    var contentElementHeight = document.createElement('p');
    var contentElementGender = document.createElement('p');
    var contentElementHomeworld = document.createElement('p');
    var contentElementSpecies = document.createElement('p');
    var contentElementMore = document.createElement('p');
    var contentElementMoreLink = document.createElement('a');
    contentElementMass.innerText = 'Mass: ' + mass;
    contentElementHeight.innerText = 'Height: ' + height;
    contentElementGender.innerText = 'Gender: ' + gender;
    contentElementHomeworld.innerText = 'Homeworld: ' + homeworld;
    contentElementSpecies.innerText = 'Species: ' + species;
    contentElementMore.innerText = 'More Details: ';
    contentElementMoreLink.innerText = 'Here';
    contentElementMoreLink.setAttribute('href', more);
    contentElementMoreLink.setAttribute('target', '_blank');

    // apoending elements
    modal.appendChild(closeButtonElement);
    closeButtonElement.appendChild(closeButton);
    modal.appendChild(imageContainer);
    imageContainer.appendChild(characterImage);
    imageContainer.appendChild(titleElement);
    modal.appendChild(contentElementMass);
    modal.appendChild(contentElementHeight);
    modal.appendChild(contentElementGender);
    modal.appendChild(contentElementHomeworld);
    modal.appendChild(contentElementSpecies);
    modal.appendChild(contentElementMore);
    contentElementMore.appendChild(contentElementMoreLink);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible'); // add class to show modal
  }

  function hideModal() {
    var $modalContainer = document.querySelector('#modal-container');
    $modalContainer.classList.remove('is-visible'); // remove class to hide modal
  }

// function for showing the details of the characters in a modal
  function showDetails(item) {
    showModal(item.name, item.mass, item.height, item.gender, item.homeworld, item.species, item.more, item.img);
  }

// loading the characters from API
  function loadList() {
   return fetch(apiURL)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      json.forEach(function (item) {
        var character = {
          name: item.name,
          mass: item.mass,
          height: item.height,
          gender: item.gender,
          homeworld: item.homeworld,
          species: item.species,
          more: item.wiki,
          img: item.image
        };
        add(character);
      });
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
   loadList: loadList
 };
})();

// Call loadList() to create the elements for the DOM

starwarsRepository.loadList().then(function() {
  starwarsRepository.getAll().forEach(function(character){
    starwarsRepository.addListItem(character);
  });
});
