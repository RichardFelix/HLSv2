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
stackchartCount = -1;
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
    makeAngularCalls(barchartCount, 'barchart', filename, xColumn, yColumn, width, height, theme);
}

function stackChart(filename, xColumn, yColumn, width, height, theme){
    
    stackchartCount++;
    makeAngularCalls(stackchartCount, 'stackchart', filename, xColumn, yColumn, width, height, theme);
}

function scatterChart(filename, xColumn, yColumn, width, height, theme, logview){
    
    scatterchartCount++;
    makeAngularCalls(scatterchartCount, 'scatterchart', filename, xColumn, yColumn, width, height, theme, logview);
}

//////////////////////////////////////////////////////////////////////////
///            Angular HTML calls to pass values to Angular            ///
//////////////////////////////////////////////////////////////////////////

function makeAngularCalls(counter, graphType, filename, xColumn, yColumn, width, height, theme,  logview){
    console.log(logview);
    if(theme == undefined)
        theme = 0;
    else if(theme == 'dark')
        theme = 1;
    else if(theme == 'light')
        theme = 2;
    else if(theme == 'neon')
        theme = 3;
    var chartDiv = document.createElement(graphType+'Div');
        chartDiv.setAttribute('id', graphType +'Div' + counter);
        document.getElementById('myAppDiv').appendChild(chartDiv);

    var controllerDiv = document.createElement(graphType+'ControllerDiv');
        controllerDiv.setAttribute('id', graphType + 'controllerDiv' + counter);
        controllerDiv.setAttribute('ng-controller', "myController");
        document.getElementById(graphType +'Div' + counter).appendChild(controllerDiv);
    
    var chart = document.createElement(graphType);
        
        if( graphType == 'linechart' || graphType == 'scatterchart' ){
            chart.setAttribute('logview', logview);
            if(height == undefined)
                height = 500;
            if(width == undefined)
                width = 500;
        
        }else{
            
            if(height == undefined)
                height = 500;
            if( width == undefined && graphType == 'stackchart' )
                width == 500;
        }
    
        chart.setAttribute('id', graphType + counter );
        chart.setAttribute('filename', filename);
        chart.setAttribute('xColumn', xColumn);
        chart.setAttribute('yColumn', yColumn);
        chart.setAttribute('width', width);
        chart.setAttribute('height', height);
        chart.setAttribute('theme', theme);
    
        document.getElementById( graphType + 'controllerDiv' + counter).appendChild(chart);
}