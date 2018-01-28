testPieChartData = [
    {
        y: 26,
        label: "School Aid"
    },
    {
        y: 17,
        label: "Medical Aid"
    },
    {
        y: 20,
        label: "Debt/Capital"
    },
    {
        y: 5,
        label: "Elected Officials"
    },
    {
        y: 3,
        label: "University"
    },
    {
        y: 7,
        label: "ARIBA ARIBA"
    },
    {
        y: 6,
        label: "Other Local Assistance"
    }
];
document.getElementById("insertPyramidChart").onclick = createPyramidChart;

function createPyramidChart(/*dataArray, divId*/) {
    var chartId = generateId("pyramidChart");
    var iDiv = document.createElement('div');
    iDiv.id = chartId;
    iDiv.style = "position:relative";
    document.getElementById('graphCanvas').appendChild(iDiv);
    /*var viewport = $('graphCanvas');
    var viewportOffset = viewport.offset();
    var box =
        {
            x1: viewportOffset.left + (viewport.outerWidth() - draggable.outerWidth()),
            y1: viewportOffset.top + (viewport.outerHeight() - draggable.outerHeight()),
            x2: viewportOffset.left,
            y2: viewportOffset.top
        };
    $('#pyramidChart1').draggable({containment: [box.x1, box.y1, box.x2, box.y2 ]});*/
    addListeners(chartId);

    var pyramidChart = new CanvasJS.Chart(chartId, {
        height:400,
        width:400,
        theme: "light1",
        title:{
            text: "Software Sales Conversion"
        },
        data: [{
            type: "pyramid",
            yValueFormatString: "#\"%\"",
            indexLabelFontColor: "black",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}",
            //reversed: true, // Reverses the pyramid
            dataPoints: testPieChartData
        }]
    });
    pyramidChart.render();
}

//drag and drop
function move(divid,xpos,ypos){
    divid.style.left = xpos + 'px';
    divid.style.top = ypos + 'px';
    //  divid.style.right = 400 + 'px';
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
    //console.log("asta e width"+document.getElementById("graphCanvas").style.width);
    //console.log("asta e height"+cHe);
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
//window.onload = addListeners();

function addListeners(chartId){
    document.getElementById(chartId).onmousedown=function(){divMove(chartId)};
    document.getElementById(chartId).onmouseup=function(){stopMoving()};
    //document.getElementById('chart_div').addEventListener('mousedown', mouseDown, false);
    //window.addEventListener('mouseup', mouseUp, false);

}

/*function mouseUp()
{
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(){
    window.addEventListener('mousemove', divMove, true);
}*/

function divMove(chartId){
    var div = document.getElementById(chartId);
    div.style.position = 'absolute';
    /*div.style.top = e.clientY + 'px';
    div.style.left = e.clientX + 'px';*/
    startMoving(div);
}

function divMove2(e){
    var div = document.getElementById('pyramidChart1');
    div.style.position = 'absolute';
    /*div.style.top = e.clientY + 'px';
    div.style.left = e.clientX + 'px';*/
    stopMoving(e);
}