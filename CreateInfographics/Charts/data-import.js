document.querySelector('input[type="file"]').addEventListener('change', function(e){
    var file = e.target.files[0];

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                var content = e.target.result;
                var result = '';

                if(/.json$/.test(file.name)){
                    result = parseJSON(content);
                }
                if(/.csv$/.test(file.name)){
                    result = parseCSV(content);
                }
                console.log(result)
            };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsText(file);
        //console.log(reader.readAsText(file));
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
});

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