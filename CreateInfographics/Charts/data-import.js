//document.getElementById('dataImportForm').addEventListener('submit', function(e){
//function onDataImportSubmit() {

$('#dataImportForm').submit(function() {
    var dataImportInput = document.getElementById('dataImport');
    var file = dataImportInput.files[0];
    if(!file) {
        return false;
    }

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                var content = e.target.result;
                var result = '';

                if (/.json$/.test(file.name)) {
                    result = parseJSON(content);
                }
                if (/.csv$/.test(file.name)) {
                    result = parseCSV(content);
                }
                console.log(result);
                var resultToObject = {};
                resultToObject = result;
                var selectedChartType = $("#chartSelect").val();
                createChart(resultToObject, selectedChartType);
            };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsText(file);
        //console.log(reader.readAsText(file));
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
    //$('#dataModal').modal('toggle');
    $('.canvasjs-chart-credit').remove();
    document.getElementById('dataImport').value = "";
    $('#closeModal').click();
    return false;
});

//});

function parseCSV(content){
    var lines = content.split('\n');
    var columns = lines[0].split(',');

    content = [];
    for(var i=1;i<lines.length; i++){
        var currentColumns = lines[i].split(',');
        content[i-1] = {};
        for(var j=0;j<columns.length;j++){
            content[i-1][columns[j]] = currentColumns[j];
        }
    }

    return content;
}

function parseJSON(content){
    content = JSON.parse(content);

    return content;
}