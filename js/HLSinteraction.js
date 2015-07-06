function onclickcall(evt){
    
    var deleteChartDivs = evt.parentNode.parentNode.parentNode.parentNode;
    var chartDiv = deleteChartDivs.parentNode.getAttribute('id');
    deleteChartDivs.parentNode.removeChild(deleteChartDivs);  

    drawNewChart(chartDiv);
}

function drawNewChart(chartDiv){

    var controllerDiv = document.createElement('great' + 'ControllerDiv');
       // controllerDiv.setAttribute('id', graphType + 'controllerDiv' + counter);
        controllerDiv.setAttribute('ng-controller', "myController");
        document.getElementById(chartDiv).appendChild(controllerDiv);
    
    ///////////////////////////
    
//    var chart = document.createElement(graphType);
//    
//        if( graphType == 'linechart' || graphType == 'scatterchart' ){
//            chart.setAttribute('logview', logview);
//            if(height == undefined)
//                height = 500;
//            if(width == undefined)
//                width = 500;
//        
//        }else{
//            
//            if(height == undefined)
//                height = 500;
//            if( width == undefined && graphType == 'stackchart' )
//                width == 500;
//        }
//    
//        chart.setAttribute('id', graphType + counter );
//        chart.setAttribute('filename', filename);
//        chart.setAttribute('xColumn', xColumn);
//        chart.setAttribute('yColumn', yColumn);
//        chart.setAttribute('width', width);
//        chart.setAttribute('height', height);
//        chart.setAttribute('theme', theme);
//    
//        document.getElementById( graphType + 'controllerDiv' + counter).appendChild(chart);
//}
//
//
//function themeSelection(theme){
//    
//    if(theme == 'dark')
//        theme = 1;
//    else if(theme == 'light')
//        theme = 2;
//    else if(theme == 'neon')
//        theme = 3;
//    else
//        theme = 0;
//    
//    return theme;
}