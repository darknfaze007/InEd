var node = document.getElementById('graphCanvas');
var primarbtn = document.getElementById('saveImage');
var pngbtn = document.getElementById('png');
var svgbtn = document.getElementById('svg');

var savemodal = document.getElementById('saveModal');

var  savespan = document.getElementsByClassName("saveclose")[0];

primarbtn.onclick = function() {
    savemodal.style.display = "block";
}
pngbtn.onclick = function() {
        domtoimage.toBlob(document.getElementById('graphCanvas'))
          .then(function(blob) {
            window.saveAs(blob, 'image.png');
          });
}
svgbtn.onclick = function() {
    domtoimage.toBlob(document.getElementById('graphCanvas'))
      .then(function(blob) {
        window.saveAs(blob, 'image.svg');
      });
}
savespan.onclick = function() {
    savemodal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == savemodal) {
        savemodal.style.display = "none";
    }
}

