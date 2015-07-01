///////////////////////////////////////////////////////////////////////
///                initial Load                                     ///
///////////////////////////////////////////////////////////////////////
function createInitDivs(){
    
    var myAppDiv = document.createElement('div');
        myAppDiv.setAttribute('ng-app', 'myApp');
        myAppDiv.setAttribute('id', 'myAppDiv');
        document.body.appendChild(myAppDiv);
}

window.onload = createInitDivs();

barchartCount = -1;
linechartCount = -1;
histogramCount = -1;
scatterchartCount = -1;

///////////////////////////////////////////////////////////////////////
///                   Wrapper Functions                             ///
///////////////////////////////////////////////////////////////////////
function lineChart(filename, xColumn, yColumn, width, height, theme, logview){
    
    linechartCount++;
    makeAngularCalls(linechartCount, 'linechart', filename, xColumn, yColumn, width, height, theme, logview);
}

function barChart(filename, xColumn, yColumn, width, height, theme){
    
    barchartCount++;
    makeAngularCalls(linechartCount, 'barchart', filename, xColumn, yColumn, width, height, theme);
}

function histogram(filename, xColumn, yColumn, width, height, theme){
    
    histogramCount++;
    makeAngularCalls(linechartCount, 'histogram', filename, xColumn, yColumn, width, height, theme);
}

function scatterChart(filename, xColumn, yColumn, width, height, theme, logview){
    
    scatterchartCount++;
    makeAngularCalls(linechartCount, 'scatterchart', filename, xColumn, yColumn, width, height, theme, logview);
}

function makeAngularCalls(counter, graphType, filename, xColumn, yColumn, width, height, theme,  logview){
    console.log(theme);
    if(theme == undefined)
        theme = 0;
    
    var chartDiv = document.createElement(graphType+'Div');
        chartDiv.setAttribute('id', graphType +'Div' + counter);
        document.getElementById('myAppDiv').appendChild(chartDiv);

    var controllerDiv = document.createElement(graphType+'ControllerDiv');
        controllerDiv.setAttribute('id', graphType + 'controllerDiv' + counter);
        controllerDiv.setAttribute('ng-controller', "myController");
        document.getElementById(graphType +'Div' + counter).appendChild(controllerDiv);
    
    var chart = document.createElement(graphType);
        chart.setAttribute('id', graphType + counter );
        chart.setAttribute('filename', filename);
        chart.setAttribute('xColumn', xColumn);
        chart.setAttribute('yColumn', yColumn);
        chart.setAttribute('width', width);
        chart.setAttribute('height', height);
        chart.setAttribute('theme', theme);
    
        if( graphType == 'lineChart' || graphType == 'scatterChart' )
            chart.setAttribute('logview', logview);
    
        document.getElementById( graphType + 'controllerDiv' + counter).appendChild(chart);
}