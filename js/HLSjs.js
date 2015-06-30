///////////////////////////////////////////////////////////////////////
///                initial Javascript                               ///
///////////////////////////////////////////////////////////////////////
function createInitDivs(){
    
    var myAppDiv = document.createElement('div');
        myAppDiv.setAttribute('ng-app', 'myApp');
        myAppDiv.setAttribute('id', 'myAppDiv');
        document.body.appendChild(myAppDiv);
}

window.onload = createInitDivs();

linechartCount = -1;
scatterchartCount = -1;

///////////////////////////////////////////////////////////////////////
///                   Wrapper Functions                             ///
///////////////////////////////////////////////////////////////////////
function lineChart(filename, xColumn, yColumn, width, height, tickview, logview){

    makeAngularCalls(linechartCount, 'linechart', xColumn, yColumn, width, height, tickview, logview);
//    linechartCount++;
//    var linechartDiv = document.createElement('linechartDiv');
//        linechartDiv.setAttribute('id', 'linechartDiv' + linechartCount);
//        document.getElementById('myAppDiv').appendChild(linechartDiv);
//    var linechart = document.createElement('linechart');
//        linechart.setAttribute('filename', filename);
//        linechart.setAttribute('xColumn', xColumn);
//        linechart.setAttribute('yColumn', yColumn);
//        linechart.setAttribute('width', width);
//        linechart.setAttribute('height', height);
//        linechart.setAttribute('tickview', tickview);
//        linechart.setAttribute('logview', logview);
//        linechart.setAttribute('id', 'linechart');
//        document.getElementById('linechartDiv'+linechartCount).appendChild(linechart);
}

function makeAngularCalls(counter, graphType, filename, xColumn, yColumn, width, height, tickview, logview){
    
    counter++;
    var linechartDiv = document.createElement('linechartDiv');
        linechartDiv.setAttribute('id', graphType +'Div' + counter);
        var graphTypeString = graphType +'Div';
        document.getElementById('myAppDiv').appendChild(graphTypeString);
    var linechart = document.createElement('graphType');
        linechart.setAttribute('filename', filename);
        linechart.setAttribute('xColumn', xColumn);
        linechart.setAttribute('yColumn', yColumn);
        linechart.setAttribute('width', width);
        linechart.setAttribute('height', height);
        linechart.setAttribute('tickview', tickview);
        linechart.setAttribute('logview', logview);
        linechart.setAttribute('id', 'graphType');
        document.getElementById(graphType +'Div'+counter).appendChild(graphType);
}