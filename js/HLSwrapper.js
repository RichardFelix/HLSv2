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
    makeAngularCalls(linechartCount, 'lineChart', xColumn, yColumn, width, height, theme, logview);
}

function barChart(filename, xColumn, yColumn, width, height, theme){
    
    barchartCount++;
    makeAngularCalls(linechartCount, 'barChart', xColumn, yColumn, width, height, theme);
}

function histogram(filename, xColumn, yColumn, width, height, theme){
    
    histogramCount++;
    makeAngularCalls(linechartCount, 'histogram', xColumn, yColumn, width, height, theme);
}

function scatterChart(filename, xColumn, yColumn, width, height, theme, logview){
    
    scatterchartCount++;
    makeAngularCalls(linechartCount, 'scatterChart', xColumn, yColumn, width, height, theme, logview);
}

function makeAngularCalls(counter, graphType, filename, xColumn, yColumn, width, height, theme,  logview){

    var chartDiv = document.createElement(graphType+'Div');
        chartDiv.setAttribute('id', graphType +'Div' + counter);
        document.getElementById('myAppDiv').appendChild(chartDiv);
    
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
    
        document.getElementById(graphType +'Div' + counter).appendChild(chart);
}