var $titleInput = $('.title-input');
var $bodyInput = $('.body-input');
var $saveBtn = $('.save-btn');
var $ideas = [];

$saveBtn.on('click', createIdea);
$('section').on('click', '.delete-button', deleteButtonClicked);
$('section').on('click', '.upvote-button', upVoteClicked);
$('section').on('click', '.downvote-button', downVoteClicked);
$('.idea-container').on('click', '.title-input, .body-input', editableTrue);
$('.idea-container').on('keydown blur', '.title-input', updateTitleLS);

function updateTitleLS(e) {
  if (e.keyCode == 13) {
    console.log(e)
  }
}

function buildMarkup(idGen, titleInput, bodyInput) {
     return `<article id=${idGen}>
      <button class = 'delete-button'></button>
      <h2 class="title-input" contenteditable="false">${titleInput}</h2>
       <p class="body-input" contenteditable="false">${bodyInput}</p>
       <button class = 'upvote-button' aria-label='upvote'></button>
       <button class = 'downvote-button' aria-label = 'downvote' ></button>
       <h4>quality: <span class='quality' role='quality'> swill</span></h4>
       <hr>
       </article>`
};

function editableTrue() {
  $('.title-input').attr("contenteditable", "true");
  $('.body-input').attr("contenteditable", "true");
}

function Card(titleInput, bodyInput) {
  this.title = titleInput;
  this.body = bodyInput;
  this.id = Date.now();
  // this.quality = quality.text || 'swill';
  this.quality = 'swill';
}


function createIdea() {
  event.preventDefault();
  var $deleteButton = $('.delete-button'); 
  var ideaCard = new Card($titleInput.val(), $bodyInput.val());
  $('.idea-container').prepend(ideaCard);
  clearInputs();
  saveIdea(ideaCard);
  // var ideas = push(ideaCard);
};



function saveIdea(ideaCard) {
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

$(document).ready(function(event) {
  for(var i = 0; i < localStorage.length; i++){
  $('section').prepend(localStorage.getItem(localStorage.key(i)));
  }  


// function updateTitle(event) {
//   if (event.keycode === 13) {
//       console.log('hi')
//   }
// }

// function updateTitle(key) {
//   $('.changeTitle').on('blur',function(event) {
//   var title = $(this).val();
//   var body = $(this).parent().siblings('p');
//   var ideaCard = buildMarkup(key, title, body);
//   localStorage.setItem(key, ideaCard);
//   });
// }


function updateBody(key) {
  $('.changeContent').on('blur', function(event) {
  var body = $(this).val();
  var title = $(this).parent().siblings('h2');
  var ideaCard = buildMarkup(key, title, body);
  localStorage.setItem(key, ideaCard);
  })
}
});

function clearInputs() {
  $titleInput.val('');
  $bodyInput.val('');
 }

function deleteButtonClicked (event, idGen) {
  $(this).parent().remove();
  localStorage.removeItem(localStorage.key(idGen));
}

 
 // function disableButton(saveBtn,event) {
 //  event.preventDefault();
 //  if ($titleInput.val() === '' || $bodyInput.val() === '')
 //    saveBtn.disabled = true; {
 //  } else {
 //    saveBtn.disabled = false;
 //  }
 // }

$('p').on('click', function(event) {
  var newText = $(this).text();
  var addInput = `<input type="text" value=${newText} class="changeContent">`;
   if ($(this).children().length === 0) {
    $(this).text('');
    $(this).append(addInput);
    $(this).children().focus();
    var key = $(this).parent().attr('id');
    updateBody(key);
  } else {
    return
  }
  });

$('h2').on('click',function(event) {
  var key1 = localStorage.getItem(localStorage.key($(this).parent().attr('id')));
  console.log(key1);
  var newText = $(this).text();
  var addInput = `<input type="text" value=${newText} class="changeTitle">`;
  if ($(this).children().length === 0) {
    $(this).text('');
    $(this).append(addInput);
    $(this).children().focus();
    var key = $(this).parent().attr('id');
    updateTitle(key);
  } else {
    return
  }

});

// function storeNewTitle() {
//   var 
// }


