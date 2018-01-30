/*function createPyramidChart(dataArray) {
    createChart(dataArray, "pyramid");
}

function createColumnChart(dataArray) {
    createChart(dataArray, "column");
}

function createBarChart(dataArray) {
    createChart(dataArray, "bar");
}*/

function createChart(dataArray, chartType) {
    if(chartType && chartType !== "blank") {
        dataArray.data[0].type = chartType;
    }
    validateArray(dataArray);
    var chartId = generateId(dataArray.data[0].type + "Chart");
    var iDiv = document.createElement('div');
    iDiv.id = chartId;
    iDiv.style = "position:relative";
    document.getElementById('graphCanvas').appendChild(iDiv);
    addListeners(chartId);

    var newChart = new CanvasJS.Chart(chartId, dataArray);
    newChart.render();
}

//drag and drop
function move(divid,xpos,ypos){
    divid.style.left = xpos + 'px';
    divid.style.top = ypos + 'px';
}
function startMoving(divid){
    var evt = evt || window.event;
    var posX = evt.clientX,
        posY = evt.clientY,
        divTop = divid.style.top,
        divLeft = divid.style.left,
        eWi = parseInt(divid.style.width),
        eHe = parseInt(divid.style.height),
        cWi = document.getElementById("graphCanvas").style.width,
        cHe = parseInt(document.getElementById("graphCanvas").style.height);
    document.getElementById("graphCanvas").style.cursor='move';
    divTop = divTop.replace('px','');
    divLeft = divLeft.replace('px','');
    var diffX = posX - divLeft,
        diffY = posY - divTop;
    document.onmousemove = function(evt){
        evt = evt || window.event;
        var limit = 498;
        var posX = evt.clientX,
            posY = evt.clientY,
            aX = posX - diffX,
            aY = posY - diffY;
        if (aX < 0) aX = 0;
        if (aY < 0) aY = 0;
        if (aX + eWi > cWi) aX = cWi - eWi;
        if (aY + eHe > cHe) aY = cHe -eHe;
        if(aX>limit) aX=limit;
        if (aY > limit) aY = limit;
        move(divid,aX,aY);
    }
}
function stopMoving(){
    var a = document.createElement('script');
    document.getElementById("graphCanvas").style.cursor='default';
    document.onmousemove = function(){}
}

function addListeners(chartId){
    document.getElementById(chartId).onmousedown=function(){divMove(chartId)};
    document.getElementById(chartId).onmouseup=function(){stopMoving()};

}

function divMove(chartId){
    var div = document.getElementById(chartId);
    if(removeToolActivated) {
        $('#' + chartId).remove();
        return;
    }
    div.style.position = 'absolute';
    startMoving(div);
}

function divMove2(e){
    var div = document.getElementById('pyramidChart1');
    div.style.position = 'absolute';
    stopMoving(e);
}

function validateArray(dataArray) {
    if(!dataArray) {
        throw "Uploaded data is null!";
    } else if(!dataArray.data) {
        throw "No data object inside data array!"
    } else if(!dataArray.data[0].type) {
        throw "No type inside provided data!"
    }
}