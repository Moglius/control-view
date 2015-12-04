'use strict';

angular.module('Control')
    .controller('IndexDashCtrl',function(){})
    .controller('CreateUserCtrl',function($scope, UserResource){
        $scope.title ="Crear Usuario";
        $scope.button ="Crear";
        $scope.User ={};
        $scope.saveUser = function (){
            console.log($scope.User);
            UserResource.save($scope.User);
        }
    });
