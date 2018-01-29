var modal = document.getElementById('myModal');

var btn1 = document.getElementById("insertChart");
var btn2 = document.getElementById("insertDonutChart");
var btn3 = document.getElementById("insertBarChart");
var btn4 = document.getElementById("insertPyramidChart");

var span = document.getElementsByClassName("close")[0];

btn1.onclick = function() {
    modal.style.display = "block";
}

btn2.onclick = function() {
    modal.style.display = "block";
}


btn3.onclick = function() {
    modal.style.display = "block";
}


btn4.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}