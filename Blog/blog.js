filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = ""; 
  //adaugam clasa show(display:block) la elementele filtrate si stergem clasa show din elementele neselectate
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
  }
}

function addClass(element, name) {
  var i, arrayNameOfClass, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}


function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" "); //iau valorile claselor
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1); //daca gasesc elem din clasa show in arr1 le sterg
    }
  }
  element.className = arr1.join(" ");
}