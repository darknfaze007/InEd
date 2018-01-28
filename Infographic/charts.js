window.onload = function () {
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
        },
    ];
    createPieChart(testPieChartData);
    createDoughnutChart(testPieChartData);
    createPyramidChart(testPieChartData);
};

var createPieChart = function(dataArray) {
    var pieChart = new CanvasJS.Chart("pieChartContainer", {
        exportEnabled: true,
        animationEnabled: true,
        title:{
            text: "State Operating Funds"
        },
        legend:{
            cursor: "pointer",
            itemclick: explodePie
        },
        data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: "{label} - {y}%",
            dataPoints: dataArray
        }],

    });
    
    pieChart.render();
};

var createDoughnutChart = function(dataArray) {
    var doughnutChart = new CanvasJS.Chart("doughnutChartContainer", {
        animationEnabled: true,
        title:{
            text: "Email Categories",
            horizontalAlign: "left"
        },
        data: [{
            type: "doughnut",
            startAngle: 60,
            //innerRadius: 60,
            indexLabelFontSize: 17,
            indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            dataPoints: dataArray
        }]
    });
    doughnutChart.render();
};

var createPyramidChart = function(dataArray) {
    var pyramidChart = new CanvasJS.Chart("pyramidChartContainer", {
        animationEnabled: true,
        exportEnabled: true,
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
            dataPoints: dataArray
        }]
    });
    pyramidChart.render();
};

function populateChartWithData(dataArray) {
    var resultArray = [];
    var tempObject;
    for(var i=0; i<dataArray.length; i++) {
        tempObject = {
            y: dataArray[i].y,
            name: dataArray[i].label,
            label: dataArray[i].label
        }
        resultArray.push(tempObject);
        /*pieChart.options.data.dataPoints[i].y = dataArray[i].y;
        pieChart.options.data.dataPoints[i].name = dataArray[i].name;*/
    }
    return resultArray;
};

function explodePie (e) {
    if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();
};