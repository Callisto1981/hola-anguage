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
