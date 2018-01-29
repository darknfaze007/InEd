$(document).ready(function(e) {
    $("#testForm").submit(function() {
        console.log(toObject($("#testForm").serializeArray()));
        return false;
    });
});

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)  {
        rv[i] = arr[i];
    }
    return rv;
}

$(function() {
    $(".button").click(function() {
        $("#myform #valueFromMyButton").text($(this).val().trim());
        $("#myform input[type=text]").val('');
        $("#valueFromMyModal").val('');
        $("#myform").show(500);
    });
    $("#btnOK").click(function() {
        $("#valueFromMyModal").val($("#myform input[type=text]").val().trim());
        $("#myform").hide(400);
    });
    $("#addNewField").click(function() {
        var input = $("<div>\n" +
            "                    <label>Label</label>\n" +
            "                    <input type=\"text\" name=\"label\">\n" +
            "                    <label>Value</label>\n" +
            "                    <input type=\"text\" name=\"value\">\n" +
            "                </div>");
        $("#formInputs").append(input);
    });
});

