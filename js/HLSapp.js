var app = angular.module('myApp', []);

app.controller('myController', function($scope){});
app.controller('newController', function($scope){});

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
                var yColumn = [2,0]; //
                var index = yColumn.indexOf(xColumn);
                if(index > -1) yColumn.splice(index,1) 
                 
                var data = convertData(d, keys);
                var minMax = findMaxMinValue(data, xColumn, yColumn, keys);
                var pts = scale(data, xColumn, yColumn, keys, minMax);
                pts = sortByKey(pts, keys[xColumn]);
                xticks = makeXTicks(data,minMax,xColumn,keys);
                yticks = makeYticks(data,minMax,yColumn,keys,false);

                $scope.yColumn = yColumn;
                $scope.keys = keys;
                $scope.pts = pts;
                $scope.xColumn = xColumn;
                $scope.color = function(y){ 
                        y += $scope.theme;
                        return linearColor(y)
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
                if(index > -1) yColumn.splice(index,1) 
                 
                var data = convertData(d, keys);
                var minMax = findMaxMinValue(data, xColumn, yColumn, keys);
                var pts = scale(data, xColumn, yColumn, keys, minMax);
                pts = sortByKey(pts, keys[xColumn]);
                xticks = makeXTicks(data,minMax,xColumn,keys);
                yticks = makeYticks(data,minMax,yColumn,keys,false);

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


