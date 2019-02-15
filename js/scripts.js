// New Code using IIFE

var nhlTeamsRepository = (function () {
// Array with Star Wars Characters as Objects
  var teams = [];
// API URL
  var apiURL = 'https://statsapi.web.nhl.com/api/v1/teams/';

// object with team logos
  var teamLogos = [
    {
      abbreviation: 'TBL',
      logoURL: 'img/logos/tampabay.png'
    },
    {
      abbreviation: 'NYI',
      logoURL: 'img/logos/islanders.png'
    },
    {
      abbreviation: 'NJD',
      logoURL: 'img/logos/newjersey.png'
    },
    {
      abbreviation: 'NYR',
      logoURL: 'img/logos/newyorkrangers.png'
    },
    {
      abbreviation: 'PHI',
      logoURL: 'img/logos/philadelphia.png'
    },{
      abbreviation: 'PIT',
      logoURL: 'img/logos/penguins.png'
    },
    {
      abbreviation: 'BOS',
      logoURL: 'img/logos/boston.png'
    },{
      abbreviation: 'BUF',
      logoURL: 'img/logos/buffalo.png'
    },
    {
      abbreviation: 'MTL',
      logoURL: 'img/logos/montreal.png'
    },{
      abbreviation: 'OTT',
      logoURL: 'img/logos/ottawa.png'
    },
    {
      abbreviation: 'TOR',
      logoURL: 'img/logos/toronto.png'
    },{
      abbreviation: 'CAR',
      logoURL: 'img/logos/carolinahurricanes.png'
    },
    {
      abbreviation: 'FLA',
      logoURL: 'img/logos/floridapanthers.png'
    },{
      abbreviation: 'WSH',
      logoURL: 'img/logos/washington.png'
    },
    {
      abbreviation: 'CHI',
      logoURL: 'img/logos/chicago.png'
    },{
      abbreviation: 'DET',
      logoURL: 'img/logos/redwings.png'
    },
    {
      abbreviation: 'NSH',
      logoURL: 'img/logos/nashville.png'
    },{
      abbreviation: 'STL',
      logoURL: 'img/logos/stlouisblues.png'
    },
    {
      abbreviation: 'CGY',
      logoURL: 'img/logos/calgaryflames.png'
    },{
      abbreviation: 'COL',
      logoURL: 'img/logos/colorado.png'
    },
    {
      abbreviation: 'EDM',
      logoURL: 'img/logos/edmonton.png'
    },{
      abbreviation: 'VAN',
      logoURL: 'img/logos/vancouver.png'
    },
    {
      abbreviation: 'ANA',
      logoURL: 'img/logos/anaheim.png'
    },{
      abbreviation: 'DAL',
      logoURL: 'img/logos/dallas.png'
    },
    {
      abbreviation: 'LAK',
      logoURL: 'img/logos/losangeles.png'
    },{
      abbreviation: 'SJS',
      logoURL: 'img/logos/sanjose.png'
    },
    {
      abbreviation: 'CBJ',
      logoURL: 'img/logos/columbus.png'
    },{
      abbreviation: 'MIN',
      logoURL: 'img/logos/minnesota.png'
    },
    {
      abbreviation: 'WPG',
      logoURL: 'img/logos/winnipegjets.png'
    },{
      abbreviation: 'ARI',
      logoURL: 'img/logos/arizonacoyotes.png'
    },
    {
      abbreviation: 'VGK',
      logoURL: 'img/logos/vegas.png'
    }
  ];

// function to add characters
  function add(item) {
    teams.push(item);
  }

// function to select characters
  function getAll() {
    return teams;
  }

// function to add List item to DOM
  function addListItem(team) {
    var $unorderedList = document.querySelector('ul');
    // create necessary elements
    var $newListElement = document.createElement('li');
    var $newSpanElement = document.createElement('p');
    var $newButtonElement = document.createElement('button');
    // inner text for elements
    $newButtonElement.innerText = 'more';
    $newSpanElement.innerText = team.name;
    // add the classes
    $newListElement.classList.add('content__item');
    $newButtonElement.classList.add('content__item--button');
    //append new elements
    $unorderedList.appendChild($newListElement);
    $newListElement.appendChild($newSpanElement);
    $newListElement.appendChild($newButtonElement);
    // add event listener
    $newButtonElement.addEventListener('click', function (event) {
      showDetails(team);
    });
  }

// modal functions (show/hide)
  function showModal(title, venue, abbreviation, location, teamName, firstYearOfPlay, division, conference, franchiseName, shortName, logo, more) {
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
    var nhlImage = document.createElement('img');
    imageContainer.classList.add('image-container');
    nhlImage.setAttribute('src', logo);
    nhlImage.classList.add('logo-image');

    var titleElement = document.createElement('h1'); // create title element
    titleElement.innerText = title;

    var contentElementVenue = document.createElement('p'); // create content elements
    var contentElementAbbreviation = document.createElement('p');
    var contentElementLocation = document.createElement('p');
    var contentElementTeamName = document.createElement('p');
    var contentElementFirstYearOfPlay = document.createElement('p');
    var contentElementDivision = document.createElement('p');
    var contentElementConference = document.createElement('p');
    var contentElementFranchiseName = document.createElement('p');
    var contentElementShortName = document.createElement('p');
    var contentElementMore = document.createElement('p');
    var contentElementMoreLink = document.createElement('a');
    contentElementVenue.innerText = 'Venue: ' + venue;
    contentElementAbbreviation.innerText = 'Abbreviation: ' + abbreviation;
    contentElementLocation.innerText = 'Location: ' + location;
    contentElementTeamName.innerText = 'Team Name: ' + teamName;
    contentElementFirstYearOfPlay.innerText = 'First Year of Play: ' + firstYearOfPlay;
    contentElementDivision.innerText = 'Division: ' + division;
    contentElementConference.innerText = 'Conference: ' + conference;
    contentElementFranchiseName.innerText = 'Franchise Name: ' + franchiseName;
    contentElementShortName.innerText = 'Short Name: ' + shortName;
    contentElementMore.innerText = 'Official Site URL: ';
    contentElementMoreLink.innerText = 'Here';
    contentElementMoreLink.setAttribute('href', more);
    contentElementMoreLink.setAttribute('target', '_blank');

    // apoending elements
    modal.appendChild(closeButtonElement);
    closeButtonElement.appendChild(closeButton);
    modal.appendChild(imageContainer);
    imageContainer.appendChild(nhlImage);
    imageContainer.appendChild(titleElement);
    modal.appendChild(contentElementVenue);
    modal.appendChild(contentElementAbbreviation);
    modal.appendChild(contentElementLocation);
    modal.appendChild(contentElementTeamName);
    modal.appendChild(contentElementFirstYearOfPlay);
    modal.appendChild(contentElementDivision);
    modal.appendChild(contentElementConference);
    modal.appendChild(contentElementFranchiseName);
    modal.appendChild(contentElementShortName);
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
    showModal(item.name, item.venue, item.abbreviation, item.location, item.teamName, item.firstYearOfPlay, item.division, item.conference, item.franchiseName, item.shortName, item.logo, item.more);
  }

// loading the characters from API
  function loadList() {
   return fetch(apiURL)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      json.teams.forEach(function (item) {
        var findLogo = teamLogos.find(findLogo => findLogo.abbreviation === item.abbreviation);
        var team = {
          name: item.name,
          venue: item.venue.name,
          abbreviation: item.abbreviation,
          location: item.locationName,
          teamName: item.teamName,
          firstYearOfPlay: item.firstYearOfPlay,
          division: item.division.name,
          conference: item.conference.name,
          franchiseName: item.franchise.teamName,
          shortName: item.shortName,
          logo: findLogo.logoURL,
          more: item.officialSiteUrl
        };
        add(team);
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

nhlTeamsRepository.loadList().then(function() {
  nhlTeamsRepository.getAll().forEach(function(team){
    nhlTeamsRepository.addListItem(team);
  });
});
