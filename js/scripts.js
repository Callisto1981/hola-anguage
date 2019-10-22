function $showModal($pokemon, $height, $image) {
  var $modalContainer = $('#modal-container');
  $modalContainer.addClass('is-visible');
  $modalContainer.innerHTML = ('');
  $modalContainer.append(modal);

  var $modal = $('div');
  $modal.addClass('modal');

  var $closeButton = $('<button class="modal-close">Close</button>');
  $(/*'click'*/$modal).append($closeButton);
  $closeButton.addClass('modal-close');
  $closeButton.innerText = 'Close';
  $closeButton.$('click', $hideModal);

  var $name = $('<h1>title</h1>');
  $name.innerText = (pokemon.name);
  $name.addClass('modal-$name');
  $modal.append($name)

  var $height = $('<p>height</p>');
  $height.innerText =('height: ' + poksmon.height);
  $height.addClass('modal-$height');
  $height.append($height);

  var $image = $('<img src=#>');
  $image.src = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  $modal.append($image);
  //$modal.append($closeButton);// maybe there needs to be a pokemon. added to each item in the parenthesis?.
  //$modal.append($name);
  //$modal.append($height);
  //$modalContainer.append(modal);
  //$modalContainer.add('is-visible');
};




function $hideModal() {
  var $modalContainer = $('#modal-container');
  $modalContainer.remove('is-visible');
};

window.$('keydown', (e) => {
  var $modalContainer = $('#modal-container');
  if(e.key === 'Escape' && $modalContainer.contains('is-visible'))
  {
    hideModal();
  }
});


var $modalContainer = $('pokemon_list');
$modalContainer = $('click', (e) => {
  var target= e.target;
  if(target === $modalContainer) {
    hideModal();
  }
});


var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150' //Removed ()
var pokemonRepository = (function() {
  var repository = [];



  function $loadList(pokemon) {
    return $.ajax('https://pokeapi.co/api/v2/pokemon/?limit=150', { dataType: 'json'}).then(function(responseJSON) {
      return responseJSON;
    }).then(function(json) {
      json.results.forEach(function(item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    });
  }


  function $add(pokemon) {
    repository.push(pokemon);
  }

  function $getAll() {
    return repository;
  }

  function $loadDetails(pokemon) {
    var url = pokemon.detailsUrl;
    return $.ajax('https://pokeapi.co/api/v2/pokemon/?limit=150', { dataType: 'json'}).then(function(responseJSON) {
      return responseJSON;
    }).then(function (details) {
      pokemon.name = details.name;
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = Object.keys(details.types);
      pokemon.weight = details.weight;
    }).catch(function(e) {
      console.error(e);
    });
  }



  function $addListItem(pokemon) {
    var $pokemonList = $('<button type=button class=pokemon-list>pokemon_list</button>');
    var $listItem = $('<li></li>');
    button.innerText = pokemon.name;
    button.addClass('pokemonButton');
    listItem.append(button);
    button.$('click', function(event) {
      showDetails(pokemon);
    });
  }
  function $showDetails(pokemon) {
    $loadDetails(pokemon).then ('click', function(event) {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
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
  };
});

const poke = pokemonRepository();
pokemonRepository.$loadList().then(function() {
  poke.getAll().forEach(function (item) {
    poke.add(item);
  });
});
