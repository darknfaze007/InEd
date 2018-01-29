$(document).ready(function(e) {
    $("#testForm").submit(function() {
        alert(toObject($("#testForm").serializeArray()));
    });
});

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)  {
        rv[i] = arr[i];
    }
    return rv;
}