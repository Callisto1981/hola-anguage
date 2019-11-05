pokemonRepository = (function () {
    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    var $pokemonList = $('ul');

    function showModal(item) {
      var $modalContainer = $('#exampleModal');
      $modalContainer.innerHTML = '';

      var $modal = $('<div class="modal"></div>');
      $('body').append($modal);

      //modal.classList.add('modal');
      //$modalContainer.appendChild($modal);

      var $closeButtonElement = $('<button class="modal-close">Close</button>');
      $('body').append($closeButtonElement);

      //closeButtonElement.classList.add('modal-close');
      //closeButtonElement.innerText = 'Close';

      $closeButtonElement.on('click', hideModal); //put $closeButtonElement in ()?
      //modal.appendChild(closeButtonElement);

      var $pokName = $('<h1 class="pokemon-name"></h1>');
      $('body').append($pokName);

      //pokName.innerText = item.name;
      //pokName.classList.add('modal-name');
      //modal.appendChild(pokName);

      var $height = $('<p class="pokemon-height">Height: </p>');
      $('body').append($height);

      //height.innerText = height;
      //height.classList.add('modal-height');
      //modal.appendChild(height);

      var $pokImage = $('<img src="' + item.imageUrl + '">');
      $('div.pokemon-img').html($pokImage);

      //pokImage.classList.add('pokemon-img');
      //pokImage.setAttribute('src', item.imageUrl);
      //modal.appendChild(pokImage);
      $modalContainer.classList.add('is-visible');
    }

    $('#show-modal').on('click', () => {
      showModal('Name', 'Content');
    });

    function $hideModal() {
      $modalContainer = $('#exampleModal');

      //$modalContainer.classList
      $('body').removeClass('is-visible');//Not sure if adding Body is correct?
      $hideModal.fadeOut(2000);//For a fadeout effect.
    }

    function addListItem(pokemon) {//function to show list of pokemon
      var $listItem = $('li');
      pokemonlist.append($listItem);

      var $button = $('<button class="pokemon-button"></button>');//the button
      $button.innerText = pokemon.name;
      listItem.append($button);
      $button.on('click', function (event) {//the action of the button
        showDetails(pokemon);
      });
    }

    function loadList() {
      $.ajax(apiUrl, { dataType: 'json' })
      .then(function (responseJSON) {
        return responsejson;
      }).then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      }).catch(function (error) {
        console.log('Caught an error:' + error.statusText);
      });
    }

    function showDetails(item) {
      loadDetails(item).then(function () {
        showModal(item);
      });
    }

    function loadDetails(item) {
      var url = item.detailsUrl;
      return $.ajax(url, { dataType: 'json' }).then(function (responseJSON) {
        return responseJSON;
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
      $modalContainer = document.querySelector('#exampleModal');
      if (e.key === 'Escape' && $modalContainer.classList.contains('is-visibile'))
   {
        hideModal();
      }
    });
    $modalContainer.on('click', (e) => {
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

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
