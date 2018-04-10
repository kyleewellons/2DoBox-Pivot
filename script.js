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

function saveToLocalStorage(ideaCard) {
  var key = ideaCard.id;
  var stringifiedKey = JSON.stringify(key)
  var stringifiedIdea = JSON.stringify(ideaCard)
  localStorage.setItem(stringifiedKey, stringifiedIdea);
}

function upVoteClicked(ideaCard, idGen, storedQuality) {
  var $upvoteButton = $(this);
  var $currentArticle = $upvoteButton.parent();
  var $quality = $currentArticle.children('h4').children('.quality');
  if ($quality.text() ==='swill') {
    $quality.text('plausible');
  } else if ($quality.text() === 'plausible') {
    $quality.text('genius');
  } else {
    return
  } 
  // var stringifyCard = JSON.stringify(ideaCard);
  // localStorage.setItem(key, storedQuality.text);
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
  //  var stringifyCard = JSON.stringify(ideaCard);
  // localStorage.setItem(idGen, quality.text);
}


// function storeQuality() {
//   var stringifyArticle = JSON.strinfy(ideaCard);
//   localStorage.setItem(idGen, ideaCard);
// } 

//   function prependIdeas() {
// // $( document ).ready(function(event) {
//   for(var i = 0; i < localStorage.length; i++){
//   var parsedIdeas = parse(localStorage.getItem(localStorage.key(i)));
//   $('section').prepend(parsedIdeas);
//   }  



// function updateTitle(event) {
//   if (event.keycode === 13) {
//       console.log('hi')
//   }
// }

// function updateTitle(key) {
//   $('.changeTitle').on('blur',function(event) {
//   var title = $(this).val();
//   var body = $(this).parent().siblings('p');
//   var ideaCard = createIdea(key, title, body);
//   localStorage.setItem(key, ideaCard);
//   });
// }


function updateBody(key) {
  $('.changeContent').on('blur', function(event) {
  var body = $(this).val();
  var title = $(this).parent().siblings('h2');
  var ideaCard = createIdea(key, title, body);
  localStorage.setItem(key, ideaCard);
  })
};

function clearInputs() {
  $titleInput.val('');
  $bodyInput.val('');
 }

function deleteButtonClicked (event, idGen) {
  $(this).parent().remove();
  localStorage.removeItem(localStorage.key(idGen));
}

// $('p').on('click', function(event) {
//   var newText = $(this).text();
//   var addInput = `<input type="text" value=${newText} class="changeContent">`;
//    if ($(this).children().length === 0) {
//     $(this).text('');
//     $(this).append(addInput);
//     $(this).children().focus();
//     var key = $(this).parent().attr('id');
//     updateBody(key);
//   } else {
//     return
//   }
//   });

// $('h2').on('click',function(event) {
//   var key1 = localStorage.getItem(localStorage.key($(this).parent().attr('id')));
//   console.log(key1);
//   var newText = $(this).text();
//   var addInput = `<input type="text" value=${newText} class="changeTitle">`;
//   if ($(this).children().length === 0) {
//     $(this).text('');
//     $(this).append(addInput);
//     $(this).children().focus();
//     var key = $(this).parent().attr('id');
//     updateTitle(key);
//   } else {
//     return
//   }

// });




