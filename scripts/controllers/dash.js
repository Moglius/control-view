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
    })
    .controller('validateForm', function($scope) {

        // function to submit the form after all validation has occurred
        $scope.submitForm = function() {

            // check to make sure the form is completely valid
            if ($scope.userForm.$valid) {
                alert('our form is amazing');
            }

        };

    });
