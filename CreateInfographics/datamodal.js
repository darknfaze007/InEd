var datamodal = document.getElementById('dataModal');

var btn = document.getElementById("insertPyramidChart");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    datamodal.style.display = "block";
}

span.onclick = function() {
    datamodal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == datamodal) {
        datamodal.style.display = "none";
    }
}

