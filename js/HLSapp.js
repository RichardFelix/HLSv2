var app = angular.module('myApp', []);

app.controller('myController', function($scope){});

app.directive('one', function(){
    
    return{
        restrict: 'E',
        replace: true,
        scope:{
            data: '@'
        },
        controller: function($scope,dataFactory,$http){
            
            $scope.data = [];
            dataFactory.getData().success(function(d){
    
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
            data: '@'
        },
         controller: function($scope,dataFactory,$http){
            
            $scope.data = [];
            dataFactory.getData().success(function(d){
    
                $scope.data = d;       
                console.log($scope.data);
            });	
        }
    }
});

app.factory('dataFactory', function($http){

   return{
        getData : function(){
            
            return $http({
                url: 'data/test.json',
                method: 'GET'
            })
        }
   }
   
});


//			$http.get("data/test.json").success(function(data) {
//
//                console.log(data);
//                $scope.work = data;
//			})