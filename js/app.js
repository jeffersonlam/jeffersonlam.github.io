'use strict';

//This code executes on load
(function(){
  console.log('Hello, developer!');
  createEmailLink(['jefferson','w','lam','@','gmail','.','com'], 'email-link');

  function createEmailLink(array, anchorId){
    var email = array.join('');
    document.getElementById(anchorId).href = 'mailto:' + email + '?subject=Reaching Out';
  }
}());

//This code is used live by the DOM
function toggleDarkUI(){
  var elem = document.body;
  toggleClass(elem, 'is-dark-ui');
}

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
