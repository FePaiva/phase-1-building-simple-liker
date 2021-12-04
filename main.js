// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// FIRST - creating the variables
let heartsArray = [...document.getElementsByClassName("like-glyph")]; // to convert the datatype to array
let modal = document.getElementById('modal');
let modalParagraph = document.getElementById('modal-message');

// THIRD - callServer gather the click event and call the mimicServerCall function
let callServer = (event) => { // calling mimicServerCall and catch an error in case it happens
  mimicServerCall()
  .then(()=> handleResponse(event)) // if it is a positive response, then do the handleResponse event
  .catch(error => handleError(error)) // if we catch an error, it will be passed to the handleError function
}
// FIFTH - if false
let handleError = (errorMessage) => {
  modal.classList.remove('hidden') // remove the 'hidden' class from the modal
  modalParagraph.innerText = errorMessage // add the erroMessage to the modal
  setTimeout(() => {    // this setTimeout is telling the modal to disappear after 3 seconds
    modal.classList.add('hidden') // after 3 seconds, the 'hidden' class is re added
    modalParagraph.innerText = "" // and clear out the paragraph so we do not have repeated messages compiled.
  }, 3000);
}

// FOURTH - if positive, the event is passed to handleResponse
let handleResponse = (event) => {
  if(event.target.textContent === EMPTY_HEART) { // we see the target of the event (where the user clicked), and get its text content.
    event.target.classList.add('activated-heart') // if the content is = EMPTY_HEART, then add the class activated heart to the target.
    event.target.textContent = FULL_HEART // and also change the content to the FULL_HEART.
  } else {
    event.target.classList.remove('activated-heart') // If false, remove the class 'activated-heart'
    event.target.textContent = EMPTY_HEART // and change the content to EMPTY_HEART
  }
}

// SECOND - event listener for the click. If clicked, callServer is called.
for(let index = 0; index < heartsArray.length; index++){
  heartsArray[index].addEventListener('click', callServer); 
}
// heartsArray.map(heartNode => {
// heartNode.addEventListener('click', callServer)
// })



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

// the mimicServerCall is pretending to be a real server, and it will resolve or reject the function
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  // console.log("deu certo")
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
