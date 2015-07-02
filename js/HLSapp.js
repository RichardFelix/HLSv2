var app = angular.module('myApp', []);

app.controller('myController', function($scope){});

app.directive('stackchart', function(){
    return{
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/stackchart.html',
        scope:{
            filename: '@',
            theme: '@',
            xcolumn: '@',
            ycolumn: '@',
            height: '@'
        },
        controller: function($scope, dataFactory){
               dataFactory.getData($scope.filename).success(function(d){
                   
                   var keys = Object.keys(d[0]);
                   var xColumn = Number($scope.xcolumn); //
                   var yColumn = convertArray($scope.ycolumn); //
                   var index = yColumn.indexOf(xColumn);
                   if(index > -1) yColumn.splice(index,1);
                   
                   var barSize = 30;
                   var width = barSize * d.length + barSize/2 * (d.length - 1); 
                   console.log(width);
                   var height = $scope.height
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
                   $scope.viewbox = "-50 0 "+width*1.25+" "+height;
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
                   $scope.xaxisname = keys[xColumn];
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
            theme: '@',
            xcolumn: '@',
            ycolumn: '@',
            height: '@'
        },
        controller: function($scope, dataFactory){
               dataFactory.getData($scope.filename).success(function(d){
                   var keys = Object.keys(d[0]);
                   var xColumn = Number($scope.xcolumn); //
                   var yColumn = convertArray($scope.ycolumn); //
                   var index = yColumn.indexOf(xColumn);
                   if(index > -1) yColumn.splice(index,1);
                   var barSize = 40; //
                   var height = $scope.height;
                   var width = barSize*d.length*yColumn.length + barSize/2 *(d.length - 1);
                   var data = convertData(d,keys);
                   var minMax = findMaxMinValue(data, xColumn, yColumn, keys);
                   var pts = scaleForBars(data,xColumn,yColumn,keys,minMax,width,height); 
                   pts = sortByKey(pts, keys[xColumn]);
                   var barPts = createBarChartPts(pts, xColumn, yColumn, keys, barSize);
                   var xticks = createXBarTicks(data,barPts,xColumn,keys);
                   var yticks = makeBarYticks(data,minMax,yColumn,keys,height);
                   $scope.viewbox = "-50 0 "+width*1.1+" "+height;
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
                  $scope.xaxisname = keys[xColumn];
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
            theme: '@',
            xcolumn: '@',
            ycolumn: '@',
            width: '@',
            height: '@',
            logview: '@'
        },
        controller: function($scope, dataFactory){
             dataFactory.getData($scope.filename).success(function(d){
                var keys = Object.keys(d[0]);
                var width = $scope.width;
                var height = $scope.height;
                var xColumn = Number($scope.xcolumn); //
                var yColumn = convertArray($scope.ycolumn); // 
                 console.log(yColumn);
                var index = yColumn.indexOf(xColumn);
                if(index > -1) yColumn.splice(index,1);
                 console.log(yColumn);
                var data = convertData(d, keys);
                var minMax = findMaxMinValue(data, xColumn, yColumn, keys);
                var pts = scale(data, xColumn, yColumn, keys, minMax, width, height, $scope.logview);
                pts = sortByKey(pts, keys[xColumn]);
                var xticks = makeXTicks(data,minMax,xColumn,keys,width);
                var yticks = makeYticks(data,minMax,yColumn,keys,$scope.logview,height);
                $scope.viewbox = "-50 0 "+width*1.1+" "+height;
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
                $scope.xaxisname = keys[xColumn];
                var fontsize = parseInt(Math.sqrt((height * width)/1736));
                fontsize = fontsize > 14 ? 14 : fontsize;
                $scope.fontsize = fontsize;
                $scope.radius = 5;

				if(width > 500){
					var divSize = width - 500;

					while( divSize >= 0 ){

						$scope.radius += 1;
						divSize -= 100;
					}
				}
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
            theme: '@',
            xcolumn: '@',
            ycolumn: '@',
            width: '@',
            height: '@',
            logview: '@'
        },
        controller: function($scope, dataFactory){
             dataFactory.getData($scope.filename).success(function(d){
                
                var keys = Object.keys(d[0]);
                var width = $scope.width;
                var height = $scope.height;
                var xColumn = Number($scope.xcolumn); //
                var yColumn = convertArray($scope.ycolumn); // 
                var index = yColumn.indexOf(xColumn);
                if(index > -1) yColumn.splice(index,1);
                var data = convertData(d, keys);
                var minMax = findMaxMinValue(data, xColumn, yColumn, keys);
                 
                var pts = scale(data, xColumn, yColumn, keys, minMax, width, height, $scope.logview);
                pts = sortByKey(pts, keys[xColumn]);
                var xticks = makeXTicks(data,minMax,xColumn,keys,width);
                var yticks = makeYticks(data,minMax,yColumn,keys,$scope.logview,height);
                pts = createPolyLinePts(pts, xColumn, yColumn, keys);
                $scope.viewbox = "-50 0 "+width*1.1+" "+height;
                $scope.xColumn = xColumn; 
                $scope.yColumn = yColumn; 
                $scope.pts = pts;
                $scope.color = function(y){ 
                        y += $scope.theme;
                        return linearColor(y, $scope.theme)
                }; 
                $scope.xticks = xticks;
                $scope.yticks = yticks;
                $scope.xaxisname = keys[xColumn];
                var fontsize = parseInt(Math.sqrt((height * width)/1736));
                fontsize = fontsize > 20 ? 20 : fontsize;
                $scope.fontsize = fontsize;
                $scope.linesize = 5;
				if(width > 500){

					var divSize = width - 500;

					while( divSize >= 0 ){
						$scope.linesize += .5;
						divSize -= 100;
					}
				}
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
            yticks : '=',
            width : '@',
            height: '@',
            fontsize:'@',
            xaxisname: '@'
        } 
    };
})
