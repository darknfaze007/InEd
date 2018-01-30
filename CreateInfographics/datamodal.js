var datamodal = document.getElementById('dataModal');

//var pyramidBtn = document.getElementById("insertPyramidChart");

var span = document.getElementsByClassName("close")[0];

/*pyramidBtn.onclick = function() {
    datamodal.style.display = "block";
};*/

$('.insertButton').click(function() {
    datamodal.style.display = "block";
});

span.onclick = function() {
    datamodal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == datamodal) {
        datamodal.style.display = "none";
    }
};

