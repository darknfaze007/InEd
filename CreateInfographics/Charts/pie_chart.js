document.getElementById("insertChart").onclick = insertChart;

function insertChart(){
    var divu = d3.select("#graphCanvas")
    .append("div")
    .attr("id","chart_div")
    .attr("width", 315)
    .attr("height", 315)
    .style("border","1px solid rgb(39, 39, 77)")


    var canvas = d3.select("#chart_div")
      .append("svg")
      .attr("id","svg1")
      .attr("width", 300)
      .attr("height", 300)
      
//chart-ul
      var svg = d3.select("#svg1"),
      width = +svg.attr("width"),
      height = +svg.attr("height"),
      radius = Math.min(width, height) / 2,
      g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  
  var pie = d3.pie()
      .sort(null)
      .value(function(d) { return d.population; });
  
  var path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
  
  var label = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);
  
  d3.csv("Files/data.csv", function(d) {
    d.population = +d.population;
    return d;
  }, function(error, data) {
    if (error) throw error;
  
    var arc = g.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");
  
    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(d.data.age); });
  
    arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .text(function(d) { return d.data.age; });
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
    document.getElementById('chart_div').onmousedown=function(){divMove()};
    document.getElementById('chart_div').onmouseup=function(){stopMoving()};
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
    var div = document.getElementById('chart_div');
    div.style.position = 'absolute';
    /*div.style.top = e.clientY + 'px';
    div.style.left = e.clientX + 'px';*/
    startMoving(div);
}

function divMove2(e){
    var div = document.getElementById('chart_div');
    div.style.position = 'absolute';
    /*div.style.top = e.clientY + 'px';
    div.style.left = e.clientX + 'px';*/
    stopMoving(e);
}

}

