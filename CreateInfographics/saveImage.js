var node = document.getElementById('graphCanvas');
var btn = document.getElementById('saveImage');

btn.onclick = function() {
  domtoimage.toBlob(document.getElementById('graphCanvas'))
    .then(function(blob) {
      window.saveAs(blob, 'image.png');
    });
}