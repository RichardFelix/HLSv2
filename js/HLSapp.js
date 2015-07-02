var app = angular.module('myApp', []);

app.controller('myController', function($scope){});
app.controller('newController', function($scope){});


app.directive('stackchart', function(){
    return{
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/stackchart.html',
        scope:{
            filename: '@' 
        },
        controller: function($scope, dataFactory){
               dataFactory.getData($scope.filename).success(function(d){
                   
                   var keys = Object.keys(d[0]);
                   var xColumn = 0; //
                   var yColumn = [2,1]; //
                   var index = yColumn.indexOf(xColumn);
                   if(index > -1) yColumn.splice(index,1);
                   var data = convertData(d,keys);
                   var minMax = findMaxminSumValue(data, xColumn, yColumn, keys);
                   var pts = scaleStackChart(data, xColumn, yColumn, keys, minMax);
                   pts = sortByKey(pts,keys[xColumn]);
                   console.log(pts);
                   var xticks = makeXTicks(data,minMax,xColumn,keys);
                   var yticks = makeYticks(data,minMax,yColumn,keys,false);
                   console.log(minMax);
                   $scope.yColumn = yColumn;
                   $scope.keys = keys;
                   $scope.pts = pts;
                   $scope.xColumn = xColumn;
                   $scope.color = function(y){return linearColor(y)};
                   $scope.xticks = xticks;
                   $scope.yticks = yticks;
                   $scope.barSize = 100/(2*d.length);
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
            filename: '@'
            
        },
        controller: function($scope, dataFactory){
               dataFactory.getData($scope.filename).success(function(d){
                   var keys = Object.keys(d[0]);
                   var xColumn = 0; //
                   var yColumn = [2,1]; //
                   var index = yColumn.indexOf(xColumn);
                   if(index > -1) yColumn.splice(index,1);
                   var barSize = 7.5; //
                   var width = barSize*d.length*yColumn.length + barSize/2 *(d.length - 1);
                   var data = convertData(d,keys);
                   var minMax = findMaxMinValue(data, xColumn, yColumn, keys);
                   var pts = scale(data,xColumn,yColumn,keys,minMax); 
                   pts = sortByKey(pts, keys[xColumn]);
                   var barPts = createBarChartPts(pts, xColumn, yColumn, keys);
                   var xticks = createXBarTicks(data,barPts,xColumn,keys);
                   var yticks = makeYticks(data,minMax,yColumn,keys,false);
                   
                   console.log(barPts);
                   console.log(xticks);
                   $scope.pts = barPts;
                   $scope.color = function(y){return linearColor(y)};
                   $scope.xticks = xticks;
                   $scope.yticks = yticks;
                   $scope.width = width;
                   $scope.barSize = 100/(pts.length*(yColumn.length+0.5)-0.5);    
               
               
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
            filename: '@'
        },
        controller: function($scope, dataFactory){
             dataFactory.getData($scope.filename).success(function(d){
                var keys = Object.keys(d[0]);
                var xColumn = 1; //
                var yColumn = [2,0]; //
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
                $scope.color = function(y){return linearColor(y)};
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
            filename: '@'
        },
        controller: function($scope, dataFactory){
             dataFactory.getData($scope.filename).success(function(d){
                var keys = Object.keys(d[0]);
                var xColumn = 0; //
                var yColumn = [1,2]; //
                var index = yColumn.indexOf(xColumn);
                if(index > -1) yColumn.splice(index,1);
                 
                var data = convertData(d, keys);
                var minMax = findMaxMinValue(data, xColumn, yColumn, keys);
                var pts = scale(data, xColumn, yColumn, keys, minMax);
                pts = sortByKey(pts, keys[xColumn]);
                var xticks = makeXTicks(data,minMax,xColumn,keys);
                var yticks = makeYticks(data,minMax,yColumn,keys,false);
                pts = createPolyLinePts(pts, xColumn, yColumn, keys);
                console.log(pts);
                $scope.pts = pts;
                $scope.color = function(y){return linearColor(y)};
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


