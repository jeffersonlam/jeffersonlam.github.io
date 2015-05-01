'use strict';

//This code executes on load
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

//This code is used live by the DOM
function toggleColors(){
  toggleHero();
  toggleAbout();
  // toggleFooter();
}

function toggleHero(){
  var elem = document.getElementsByClassName('hero')[0];
  toggleClass(elem, 'alternate');
}

function toggleAbout(){
  var elem = document.getElementsByClassName('about')[0];
  toggleClass(elem, 'alternate');
}

// function toggleFooter(){
//   var elem = document.getElementsByTagName('footer')[0];
//   console.log(elem);
//   toggleClass(elem, 'alternate');
// }

function toggleClass(element, className){
  if (!element || !className){
    return;
  }

  var classString = element.className, nameIndex = classString.indexOf(className);
  //if class doesn't exist, add it
  if (nameIndex == -1) {
    classString += ' ' + className;
  }
  //if class does exist, remove it
  else {
    classString = classString.substr(0, nameIndex-1) + classString.substr(nameIndex+className.length);
  }
  element.className = classString;
}
