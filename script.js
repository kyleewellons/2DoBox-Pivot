loadPage();

var $titleInput = $('.task-title-input');
var $bodyInput = $('.task-body-input');
var $searchInput = $('.search');

$('.idea-container').on('keyup', '.title-input',updateTitleLS);
$('.save-btn').on('click', createIdea,);
$('.search').on('keydown', searchIdeas);
$('section').on('click', '.delete-button', deleteButtonClicked);
$('section').on('click', '.upvote-button', upVoteClicked);
$('section').on('click', '.downvote-button', downVoteClicked);
$('.idea-container').on('click', '.title-input, .body-input', editableTrue);
$('.idea-container').on('blur', '.title-input', updateTitle);
$('.idea-container').on('blur', '.body-input', updateBody);
$('section').on('click', '.task-btn', completedTask);



// $('.task-complete').on('click')



function updateTitle(e) {
  var title = $(this).text();
  var updatedCardId = $(this).parent().attr('id');
  var card = JSON.parse(localStorage.getItem(updatedCardId));
  card.title = title; 
  saveToLocalStorage(card);
  };

function updateBody() {
  var body = $(this).text();
  var updatedCardId = $(this).parent().attr('id');
  var card = JSON.parse(localStorage.getItem(updatedCardId));
  card.body = body;
  saveToLocalStorage(card);
};


  function saveToLocalStorage(ideaCard) {
  var key = ideaCard.id;
  var stringifiedIdea = JSON.stringify(ideaCard)
  localStorage.setItem(key, stringifiedIdea);
}

function clearInputs() {
  $titleInput.val('');
  $bodyInput.val('');

  if ($('.task-title-input').val() && $('.task-body-input').val()) {
      $('.save-btn').prop('disabled', false);
     } else {
      $('.save-btn').prop('disabled', true);
     }
 }

function updateTitleLS(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    $titleInput.focus()
  }
}

function prependCard(ideaCard) {
   return $('.idea-container').prepend(
     `<article class="new-task" id=${ideaCard.id}>
      <button class = 'delete-button'></button>
      <h2 class="title-input" contenteditable="false">${ideaCard.title}</h2>
       <p class="body-input" contenteditable="false">${ideaCard.body}</p>
       <button class = 'upvote-button' aria-label='upvote'></button>
       <button class = 'downvote-button' aria-label = 'downvote' ></button>
       <h4>quality: <span class='quality' role='quality'>${ideaCard.quality}</span></h4>
       <button class="task-btn">Completed Task</button>
       <hr>
       </article>`)
};

function editableTrue() {
  $('.title-input').attr("contenteditable", "true");
  $('.body-input').attr("contenteditable", "true");
}

function loadPage() {
  for (var i = 0; i < localStorage.length; i++) {
    var parsedCard = JSON.parse(localStorage.getItem(localStorage.key(i)));
    prependCard(parsedCard);
  }
}

function Card(titleInput, bodyInput) {
  this.title = titleInput;
  this.body = bodyInput;
  this.id = Date.now();
  this.quality = 'swill';
}


function createIdea(event) {
  event.preventDefault();
  var ideaCard = new Card($titleInput.val(), $bodyInput.val());
  prependCard(ideaCard);
  clearInputs();
  saveToLocalStorage(ideaCard);
};

function upVoteClicked(ideaCard, idGen, storedQuality) {
  var $quality = $(this).parent().children('h4').children('.quality');
  if ($quality.text() ==='swill') {
    $quality.text('plausible');
  } else if ($quality.text() === 'plausible') {
    $quality.text('genius');
  }  
  var updatedCardId = $(this).parent().attr('id');
  var card = JSON.parse(localStorage.getItem(updatedCardId));
  card.quality = $quality.text();
  saveToLocalStorage(card);
 }

function downVoteClicked(ideaCard, idGen, storedQuality) {
  console.log(this);
  var $quality = $(this).parent().children('h4').children('.quality');
  if ($quality.text() === 'genius') {
    $quality.text('plausible');
  } else if ($quality.text() === 'plausible') {
    $quality.text('swill');
  } 
  var updatedCardId = $(this).parent().attr('id');
  var card = JSON.parse(localStorage.getItem(updatedCardId));
  card.quality = $quality.text();
  saveToLocalStorage(card);
  } 



function deleteButtonClicked (event, idGen) {
  $(this).parent().remove();
  localStorage.removeItem(localStorage.key(idGen));
}

function searchIdeas() {
  var searchInput = $(this).val().toLowerCase();
    $('.title-input').each(function() {
      var searchText = $(this).text().toLowerCase();
      if (searchText.match(searchInput)) {
        $(this).closest('article').toggle(true);
      }else {
        $(this).closest('article').toggle(false);
      }
    });
};




function completedTask(){

  $(this).parent('article').toggleClass('task-complete')
};



