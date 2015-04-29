'use strict';

(function(){
  console.log('Hello, developer!');
  createEmailLink(['jefferson','w','lam','@','gmail','.','com'], 'email-text', 'email-link');

  function createEmailLink(array, textId, anchorId){
    var text = document.getElementById(textId);
    var email = array.join('');
    text.innerHTML = email;
    document.getElementById(anchorId).href = 'mailto:' + email;
  }
}());
