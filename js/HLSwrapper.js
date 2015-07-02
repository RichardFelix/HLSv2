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
function scatterChart(filename, xColumn, yColumn, width, height, theme, logview){
    scatterchartCount++;
    this.scatterchartCount = scatterchartCount;
    
    makeAngularCalls(scatterchartCount, 'scatterchart', filename, xColumn, yColumn, width, height, this.theme, logview);
    
    this.setTheme = function(theme){
        theme = themeSelection(theme);
         var plot = document.getElementById("scatterchart"+this.scatterchartCount);
         if (typeof(plot)=="undefined")
             this.theme = theme;
        else
            plot.setAttribute('theme',theme);
    };
}

function lineChart(filename, xColumn, yColumn, width, height, theme, logview){
    linechartCount++;
    this.linechartCount = linechartCount;
    
    makeAngularCalls(linechartCount, 'linechart', filename, xColumn, yColumn, width, height, this.theme, logview);
    
    this.setTheme = function(theme){
        theme = themeSelection(theme);
         var plot = document.getElementById("linechart"+this.linechartCount);
         if (typeof(plot)=="undefined")
             this.theme = theme;
        else
            plot.setAttribute('theme',theme);
    };
}

function stackChart(filename, xColumn, yColumn, width, height, theme){
    stackchartCount++;
    this.stackchartCount = stackchartCount;
    
    makeAngularCalls(stackchartCount, 'stackchart', filename, xColumn, yColumn, width, height, this.theme);
    
    this.setTheme = function(theme){
        theme = themeSelection(theme);
         var plot = document.getElementById("stackchart"+this.stackchartCount);
         if (typeof(plot)=="undefined")
             this.theme = theme;
        else
            plot.setAttribute('theme',theme);
    };

}

function barChart(filename, xColumn, yColumn, width, height, theme){
    barchartCount++;
    this.barchartCount = barchartCount;
    
    makeAngularCalls(barchartCount, 'barchart', filename, xColumn, yColumn, width, height, this.theme);
    
    this.setTheme = function(theme){
        theme = themeSelection(theme);
         var plot = document.getElementById("barchart"+this.barchartCount);
         if (typeof(plot)=="undefined")
             this.theme = theme;
        else
            plot.setAttribute('theme',theme);
    };
}



//////////////////////////////////////////////////////////////////////////
///            Angular HTML calls to pass values to Angular            ///
//////////////////////////////////////////////////////////////////////////

function makeAngularCalls(counter, graphType, filename, xColumn, yColumn, width, height, theme,  logview){
    theme = themeSelection(theme);
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


function themeSelection(theme){
    if(theme == undefined || theme == null)
        theme = 0;
    else if(theme == 'dark')
        theme = 1;
    else if(theme == 'light')
        theme = 2;
    else if(theme == 'neon')
        theme = 3;
    return theme;
}