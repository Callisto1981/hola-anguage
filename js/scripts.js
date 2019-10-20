  (function showModal(/*title, content, dog-image*/) {
    var $modalContainer = $('#modal-container');
    $modalContainer.addClass('is-visible');
    $modalContainer.innerHTML = '';

    var $modal = $('div');
    $modal.addClass('modal');

    var $closeButtonElement = $('<button class='modal-close'>'Close</div>');
    $('click').append($closeButtonElement);
    /*$closeButtonElement.addClass('modal-close');
    $closeButtonElement.innerText = 'Close';
    $closeButtonElement.$('click', hideModal);*/
    var $nameElement = $('<h1>title</h1>');
    //$nameElement.innerText = title;
    var $heightElement = $('<p>height</p>');
    //$heightElement.innerText =height;
    var $imageElement = $('<img src=''>');
    //$imageElement.src = /*dog-image*/;
    $modal.append($closeButtonElement);
    $modal.append($nameElement);
    $modal.append($heightElement);
    $modal.append($imageElement);
    $modalContainer.append(modal);
    $modalContainer.add('is-visible');
  });



  function hideModal() {
    var $modalContainer = $('#modal-container');
    $modalContainer.remove('is-visible');
  };
  window.$('kedown', (e) => {
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
  var apiUrl =('https://pokeapi.co/api/v2/pokemon/')
  var pokemonRepository = (function() {
    var repository = [];

    function $loadlist(item) {
      $.ajax('https://pokeapi.co/api/v2/pokemon/', { dataType: 'json'}).then(function(responseJSON) {
       console.log(responseJSON);
     }).catch(function(err){
       console.log('Caught an error:' + err.statusText);
     });
   )}

   function add(pokemon) {
     repository.push(pokemon)
   }

  function getAll() {
    return repository;
  }

  function loadDetails(pokemon) {
    var url = pokemon.detailsUrl;
    return $.ajax(url).then(function(response) {
      return response.json();
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

  function $addListItem(pokmeon) {
    var $pokemonList = $('<button type='button' class='pokemon-list');
    var $listItem = $('li'); //Not sure how to incert this.
    button.innerText = pokemon.name;
    button.addClass('pokemonButton');
    listItem.append(listItem);
    button.$('click', function() {
      showDetails(pokemon)
    });
  }
  function $showDetails(pokemon) {
    $loadDetials(pokemon).then ('click', function(event) {
    showModal(pokemon.name, pokemon.height, pokemon.imageUrl));
  });
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
  };
  });
  const poke = pokemonRepository();
  poke.loadList().then(function() {
    poke.getAll().each(function (item) {
      poke.add(item);
    });
  });
