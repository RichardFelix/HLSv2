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
                console.log($scope.data);
            });	
        }
    }
});

app.directive('two', function(){
    
    return{
        restrict: 'E',
        replace: true,
        scope:{
            filename: '@',
            data:'@'
        },
        controller: function($scope, $q, dataFactory,convertFactory){
             dataFactory.getData($scope.filename).success(function(d){
    
                var data = convertData(d);
                var mM = findMaxMinValue(data,null,null);
                 
                 
                 
                 
            });	
        }
    }
});




