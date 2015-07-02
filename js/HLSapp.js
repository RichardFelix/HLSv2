var app = angular.module('myApp', []);

app.controller('myController', function($scope){});

app.directive('stackchart', function(){
    return{
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/stackchart.html',
        scope:{
            filename: '@',
            theme: '@'
        },
        controller: function($scope, dataFactory){
               dataFactory.getData($scope.filename).success(function(d){
                   
                   var keys = Object.keys(d[0]);
                   var xColumn = 0; //
                   var yColumn = [1,2,3]; //
                   var index = yColumn.indexOf(xColumn);
                   if(index > -1) yColumn.splice(index,1);
                   
                   var barSize = 30;
                   var width = barSize * d.length + barSize/2 * (d.length - 1); 
                   console.log(width);
                   var height = 500;
                   var data = convertData(d,keys);
                   var minMax = findMaxminSumValue(data, xColumn, yColumn, keys);
                   var pts = scaleStackChart(data, xColumn, yColumn, keys, minMax, width, height);
                   pts = sortByKey(pts,keys[xColumn]);
                   pts = createStackChartPts(pts,xColumn,keys,barSize)
                   console.log(pts);
                   var xticks = createXStackTicks(data,pts,xColumn,keys, barSize);
                   var yticks = makeBarYticks(data,minMax,yColumn,keys,height);
                   
                   $scope.keys = keys;
                   $scope.yColumn = yColumn;
                   $scope.xColumn = xColumn;
                   $scope.viewbox = "-30 0 "+width*1.25+" "+height;
                   $scope.pts = pts;
                   $scope.color = function(y){return linearColor(y, $scope.theme)};
                   $scope.xticks = xticks;
                   $scope.yticks = yticks;
                   $scope.barSize = barSize; 
                   $scope.width = width;
                   $scope.height = height;
                   var fontsize = parseInt(Math.sqrt((height * width)/1736));
                   fontsize = fontsize > 20 ? 20 : fontsize;
                   $scope.fontsize = fontsize;
               })
        }
    };
})






app.directive('barchart', function(){
    return{
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/barchart.html',
        scope:{
            filename: '@',
            theme: '@'
            
        },
        controller: function($scope, dataFactory){
               dataFactory.getData($scope.filename).success(function(d){
                   var keys = Object.keys(d[0]);
                   var xColumn = 0; //
                   var yColumn = [2,1,3]; //
                   var index = yColumn.indexOf(xColumn);
                   if(index > -1) yColumn.splice(index,1);
                   var barSize = 40; //
                   var height = 500;
                   var width = barSize*d.length*yColumn.length + barSize/2 *(d.length - 1);
                   var data = convertData(d,keys);
                   var minMax = findMaxMinValue(data, xColumn, yColumn, keys);
                   var pts = scaleForBars(data,xColumn,yColumn,keys,minMax,width,height); 
                   pts = sortByKey(pts, keys[xColumn]);
                   var barPts = createBarChartPts(pts, xColumn, yColumn, keys, barSize);
                   var xticks = createXBarTicks(data,barPts,xColumn,keys);
                   var yticks = makeBarYticks(data,minMax,yColumn,keys,height);
                   $scope.viewbox = "-30 0 "+width*1.1+" "+height;
                   $scope.pts = barPts;
                   $scope.color = function(y){return linearColor(y, $scope.theme)};
                   $scope.xticks = xticks;
                   $scope.yticks = yticks;
                   $scope.width = width;
                   $scope.height = height;
                   $scope.barSize = barSize;    
                   var fontsize = parseInt(Math.sqrt((height * width)/1736));
                   fontsize = fontsize > 20 ? 20 : fontsize;
                   $scope.fontsize = fontsize;
                   
               
               })
        }
    };
})



app.directive('scatterchart', function(){
    
    return{
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/scatter.html',
        scope:{
            filename: '@',
            theme: '@'
        },
        controller: function($scope, dataFactory){
             dataFactory.getData($scope.filename).success(function(d){
                var keys = Object.keys(d[0]);
                var xColumn = 1; //
                var yColumn = [2,0,3]; //
                var index = yColumn.indexOf(xColumn);
                if(index > -1) yColumn.splice(index,1); 
                 
                var data = convertData(d, keys);
                var minMax = findMaxMinValue(data, xColumn, yColumn, keys);
                var pts = scale(data, xColumn, yColumn, keys, minMax);
                pts = sortByKey(pts, keys[xColumn]);
                var xticks = makeXTicks(data,minMax,xColumn,keys);
                var yticks = makeYticks(data,minMax,yColumn,keys,false);

                $scope.yColumn = yColumn;
                $scope.keys = keys;
                $scope.pts = pts;
                $scope.xColumn = xColumn;
                $scope.color = function(y){ 
                        y += $scope.theme;
                        return linearColor(y, $scope.theme)
                };
                $scope.xticks = xticks;
                $scope.yticks = yticks;
            });	
        }
    };
});

app.directive('linechart', function(){
    
    return{
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/linechart.html',
        scope:{
            filename: '@',
            theme: '@'
        },
        controller: function($scope, dataFactory){
             dataFactory.getData($scope.filename).success(function(d){
                var keys = Object.keys(d[0]);
                var xColumn = 0; //
                var yColumn = [1,2,3]; // 
                var index = yColumn.indexOf(xColumn);
                if(index > -1) yColumn.splice(index,1);
                var data = convertData(d, keys);
                var minMax = findMaxMinValue(data, xColumn, yColumn, keys);
                var pts = scale(data, xColumn, yColumn, keys, minMax);
                pts = sortByKey(pts, keys[xColumn]);
                var xticks = makeXTicks(data,minMax,xColumn,keys);
                var yticks = makeYticks(data,minMax,yColumn,keys,false);
                pts = createPolyLinePts(pts, xColumn, yColumn, keys);
                $scope.pts = pts;
                $scope.color = function(y){ 
                        y += $scope.theme;
                        return linearColor(y, $scope.theme)
                }; 
                $scope.xticks = xticks;
                $scope.yticks = yticks;
            });	
        }
    };
});



app.directive('axis', function(){
    
    return{
        restrict: 'E',
        replace: true,
        templateNamespace: 'svg',
        templateUrl: 'partials/axis.html',
        scope:{
            xticks: '=',
            yticks : '='
            
        } 
    };
})

app.directive('axisbar', function(){
    
    return{
        restrict: 'E',
        replace: true,
        templateNamespace: 'svg',
        templateUrl: 'partials/axisbar.html',
        scope:{
            xticks: '=',
            yticks : '=',
            width : '@',
            height: '@',
            fontsize:'@'
            
        } 
    };
})
