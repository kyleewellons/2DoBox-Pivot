loadPage();

var $titleInput = $('.title-input');
var $bodyInput = $('.body-input');
// var $saveBtn = $('.save-btn');
// var $ideas = [];

$('.save-btn').on('click', createIdea);

$('section').on('click', '.delete-button', deleteButtonClicked);
$('section').on('click', '.upvote-button', upVoteClicked);
$('section').on('click', '.downvote-button', downVoteClicked);
$('.idea-container').on('click', '.title-input, .body-input', editableTrue);
// $('.idea-container').on('keydown blur', '.title-input', updateTitleLS);
$('.idea-container').on('blur', '.title-input', updateTitle);
$('.idea-container').on('blur', '.body-input', updateBody);

function updateTitle() {
  var title = $(this).text();
  var updatedCardId = $(this).parent().attr('id');
  var card = JSON.parse(localStorage.getItem(updatedCardId));
  card.title = title; 
  saveToLocalStorage(card);
  };

function updateBody() {
  console.log(this)
  var body = $(this).text();
  var updatedCardId = $(this).parent().attr('id');
  var card = JSON.parse(localStorage.getItem(updatedCardId));
  card.body = body;
  saveToLocalStorage(card);
}

  function saveToLocalStorage(ideaCard) {
  var key = ideaCard.id;
  var stringifiedIdea = JSON.stringify(ideaCard)
  localStorage.setItem(key, stringifiedIdea);
}


function updateTitleLS(e) {
  if (e.keyCode == 13) {
    console.log(e)
  }
}

function prependCard(ideaCard) {
   return $('.idea-container').prepend(
     `<article id=${ideaCard.id}>
      <button class = 'delete-button'></button>
      <h2 class="title-input" contenteditable="false">${ideaCard.title}</h2>
       <p class="body-input" contenteditable="false">${ideaCard.body}</p>
       <button class = 'upvote-button' aria-label='upvote'></button>
       <button class = 'downvote-button' aria-label = 'downvote' ></button>
       <h4>quality: <span class='quality' role='quality'>${ideaCard.quality}</span></h4>
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
  var $downvoteButton = $(this);
  var $currentArticle = $downvoteButton.parent();
  var $quality = $currentArticle.children('.quality');
  if ($quality.text() === 'genius') {
    $quality.text('plausible');
  } else if ($quality.text() === 'plausible') {
    $quality.text('swill');
  } else {
    return
  } 
}


// function updateBody(key) {
//   $('.changeContent').on('blur', function(event) {
//   var body = $(this).val();
//   var title = $(this).parent().siblings('h2');
//   var ideaCard = createIdea(key, title, body);
//   localStorage.setItem(key, ideaCard);
//   })
// };

function clearInputs() {
  $titleInput.val('');
  $bodyInput.val('');
 }

function deleteButtonClicked (event, idGen) {
  $(this).parent().remove();
  localStorage.removeItem(localStorage.key(idGen));
}







