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

app.directive('two', function(){
    
    return{
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/scatter.html',
        scope:{
            filename: '@',
            data:'@',
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
                console.log(pts);
                $scope.yColumn = yColumn;
                $scope.keys = keys;
                $scope.pts = pts;
                $scope.xColumn = xColumn;
                $scope.color = "blue"
            });	
        }
    }
});




