pokemonRepository = (function () {
    var repository = [];

    function showModal(pokName, height) {
      var $modalContainer = $('#modal-container');
      $modalContainer.innerHTML = '';

      var $modal = $('<div class="modal"></div>');
      $('body').append($modal);
      //modal.classList.add('modal');
      //$modalContainer.appendChild($modal);

      var $closeButtonElement = $('<button class="modal-close">Close</button>');
      $('body').append($closeButtonElement);
      //closeButtonElement.classList.add('modal-close');
      //closeButtonElement.innerText = 'Close';

      closeButtonElement.addEventListener('click', hideModal); //How do I impliment an addEventListener?
      //modal.appendChild(closeButtonElement);

      var $pokName = $('<h1 class="modal-name"></h1>');
      $('body').append($pokName);//might need a period at the beginning of $pokName
      //pokName.innerText = item.name;
      //pokName.classList.add('modal-name');
      //modal.appendChild(pokName);

      var $height = $('<p class="modal-height">Height: </p>');
      $('body').append($height);
      //height.innerText = height;
      //height.classList.add('modal-height');
      //modal.appendChild(height);

      var $pokImage = $('<img src= class="pokemon-img">');//Put actual apiUrl in src?
      $('body').append($pokImage);
      //pokImage.classList.add('pokemon-img');
      //pokImage.setAttribute('src', item.imageUrl);
      //modal.appendChild(pokImage);
      $modalContainer.classList.add('is-visible');
    }

    $('#show-modal').on('click', () => {
      showModal('Name', 'Content');
    });


    function $hideModal() {
      var $modalContainer = $('#modal-container');
      //$modalContainer.classList
      $('body').removeClass('is-visible');//Not sure if adding Body is correct?
      $hideModal.fadeOut(2000);//For a fadeout effect.
    }


    function addListItem(pokemon) {//function to show list of pokemon
      var listItem = document.createElement('li');
      var button = document.createElement('button');//the button
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');//the class/connection to the html
      listItem.appendChild(button);
      pokemonlist.appendChild(listItem);
      button.addEventListener('click', function () {//the action of the button
        showDetails(pokemon);
      });
    }

    function loadList() {
      fetch('https://pokeapi.co/api/v2/pokemon').then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      }).catch(function (error) {
        console.error(error);
      });
    }

    function showDetails(item) {
      loadDetails(item).then(function () {
        showModal(item);
      });
    }

    function loadDetails(item) {
      var url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprite.front_default;
        item.height = details.height;
      }).catch(function (error) {
        console.error(error);
      });
    }

    function add(pokemon) {
      repository.push(pokemon);
    }

    function getAll() {
      return repository;
    }

    window.addEventListener('keydown', (e) => {
      var $modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && $modalContainer.classList.contains('is-visibile'))
   {
        hideModal();
      }
    });
    $modalContainer.addEventListener('click', (e) => {
      var target = e.target;
      if (target === $modalContainer) {
        hideModal();
      }
    });


    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal,
      hideModal: hideModal,
    };

  })();

var pokemonList = document.querySelector('ul');

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

var bulbasaur = {
  name: 'bulbasaur',
  height: 7,
  types: ['grass', 'poison'],
};

var charizard = {
  name: 'Charizard',
  height: 1.7,
  types: ['fire', 'flying'],
};

var blastoise = {
  name: 'Blastoise',
  height: 1.6,
  types: ['water'],
};

repository.forEach(function (cureentName) {
  console.log(currentName);
});
