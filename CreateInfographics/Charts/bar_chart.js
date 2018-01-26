document.getElementById("insertBarChart").onclick = insertBarChart;
// set the dimensions of the canvas
function insertBarChart(){
    var divu = d3.select("#graphCanvas")
    .append("div")
    .attr("id","bar_chart_div")
    .attr("width", 615)
    .attr("height", 315)
    .style("border","1px solid rgb(39, 39, 77)")


    var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
    
    // set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
    
    var y = d3.scale.linear().range([height, 0]);
    
    // define the axis
    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

    
    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
    
    
    // add the SVG element
    var svg = d3.select("#bar_chart_div").append("svg")
    .attr("id","svg3")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
    
    
    // load the data
    d3.json("Files/bar_chart.json", function(error, data) {
    
    data.forEach(function(d) {
        d.Letter = d.Letter;
        d.Freq = +d.Freq;
        return d;
    });
    
    // scale the range of the data
    x.domain(data.map(function(d) { return d.Letter; }));
    y.domain([0, d3.max(data, function(d) { return d.Freq; })]);
    
    // add axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");
    
    
    // Add bar chart
    svg.selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Freq); })
      .attr("height", function(d) { return height - y(d.Freq); });
    
    });

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
window.onload = addListeners();

function addListeners(){
    document.getElementById('bar_chart_div').onmousedown=function(){divMove()};
    document.getElementById('bar_chart_div').onmouseup=function(){stopMoving()};
    //document.getElementById('chart_div').addEventListener('mousedown', mouseDown, false);
    //window.addEventListener('mouseup', mouseUp, false);

}

function mouseUp()
{
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(){
  window.addEventListener('mousemove', divMove, true);
}

function divMove(){
    var div = document.getElementById('bar_chart_div');
    div.style.position = 'absolute';
    /*div.style.top = e.clientY + 'px';
    div.style.left = e.clientX + 'px';*/
    startMoving(div);
}

function divMove2(e){
    var div = document.getElementById('bar_chart_div');
    div.style.position = 'absolute';
    /*div.style.top = e.clientY + 'px';
    div.style.left = e.clientX + 'px';*/
    stopMoving(e);
}

}
