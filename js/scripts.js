pokemonRepository = (function () {
    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    var $pokemonList = $('ul');
    var $modalContainer = ('#examplModal');

    function showModal(item) {
      var $modalContainer = $('#exampleModal');//#exampleModal
      var $closeButtonElement = $('<button class="modal-close">Close</button>');

      var $pokName = $(`<h1 class="pokemon-name">${item.name}</h1>`);
      var $height = $(`<p class="pokemon-height">Height: ${item.height} </p>`);
      var $pokImage = $(`<img src="${item.imageUrl}">`);

      $($modalContainer).append($closeButtonElement);
      $($modalContainer).append($pokName);
      $($modalContainer).append($height);
      $($modalContainer).append($pokImage);

      $modalContainer.classList.add('is-visible');
      $modalContainer.innerHTML = '';

      //var $modal = $('<div class="modal"></div>');
      //$('body').append($modal);

      //modal.classList.add('modal');
      //$modalContainer.appendChild($modal);

      //closeButtonElement.classList.add('modal-close');
      //closeButtonElement.innerText = 'Close';

      $closeButtonElement.on('click', $hideModal); //put $closeButtonElement in ()?
      //modal.appendChild(closeButtonElement);

      //pokName.innerText = item.name;
      //pokName.classList.add('modal-name');
      //modal.appendChild(pokName);

      //height.innerText = height;
      //height.classList.add('modal-height');
      //modal.appendChild(height);

      //$('div.pokemon-img').html($pokImage);

      //$pokImage.attr('src', item.imageUrl);
      //$modalContainer.append($pokImage);

      //pokImage.classList.add('pokemon-img');
      //pokImage.setAttribute('src', item.imageUrl);
      //modal.appendChild(pokImage);
      $('#show-modal').on('click', () => {
        showModal('Name', 'Content');
      });
    }

    function $hideModal() {
      var $modalContainer = $('#exampleModal');
      $($modalContainer).removeClass('is-visible');  //$modalContainer.classList
      $modalContainer.fadeOut(2000);//For a fadeout effect.
    }

    function addListItem(pokemon) {//function to show list of pokemon
      var $paraElement = $('.text-center');
      var $listItem = $('<li></li>');
      var $button = $('<button class="pokemon-button"></button>');//the button
      $button.text(pokemon.name);
      $button.on('click', function (event) {//the action of the button
          showDetails(pokemon);
        });

      $listItem.append($button);
      $paraElement.append($listItem);
    }

    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        showModal(item);
      });
    }

    function loadList() {
      return $.ajax(apiUrl, { dataType: 'json' }).then(function (responseJSON) {
        return responseJSON;
      }).then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      }).catch(function (e) {
        // console.error(e);
      });
    }

    function loadDetails(item) {
      var url = item.detailsUrl;
      return $.ajax(url, { dataType: 'json' }).then(function (responseJSON) {
        return responseJSON;
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = Object.keys(details.types);
      }).catch(function (e) {
        console.error(e);
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
    $modalContainer = ('click', (e) => {
      var target = e.target;
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
      loadDetails: loadDetails,
      showModal: showModal,
    };
  })();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
