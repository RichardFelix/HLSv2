var app = angular.module('myApp', []);

app.controller('myController', function($scope){});
app.controller('newController', function($scope){});

app.directive('one', function(){
    
    return{
        restrict: 'E',
        replace: true,
        scope:{
            filename: '@'
        },
        controller: function($scope,dataFactory){
            
            $scope.data = [];
            dataFactory.getData($scope.filename).success(function(d){
    
                $scope.data = d;       
               
            });	
        }
    }
});

app.directive('scatterchart', function(){
    
    return{
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/scatter.html',
        scope:{
            filename: '@',
            theme: '@'
        },
        controller: function($scope, $q, dataFactory){
             dataFactory.getData($scope.filename).success(function(d){
                var keys = Object.keys(d[0]);
                var xColumn = 0; //
                var yColumn = [1,2]; //
                var data = convertData(d, keys);
                var minMax = findMaxMinValue(data, xColumn, yColumn, keys);
                var pts = scale(data, xColumn, yColumn, keys, minMax);
                pts = sortByKey(pts, keys[xColumn]);
                ticks = makeTicks(data,minMax,xColumn,yColumn,keys);
                
                $scope.yColumn = yColumn;
                $scope.keys = keys;
                $scope.pts = pts;
                $scope.xColumn = xColumn;
                $scope.color = function(y){return linearColor(y)};
                
//                if( $scope.theme != 'undefinded' || $scope.theme != null ){
//                    var y = yColumn.length;
//                    $scope.color = function(y){ return linearColor(y)};
//                }
                    
                $scope.ticks = ticks;
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
            ticks: '='
        }  
    };
})


