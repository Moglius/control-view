'use strict';

angular.module('Control')
   .controller('IndexUserCtrl',function($scope, $route, UserResource, ngToast, NgTableParams){
        $scope.title ="Usuarios";

        var self = this;
        UserResource.get(function(data){
            $scope.users = data.users;
            self.tableParams = new NgTableParams({ count: 10}, { counts: [5, 10, 25], dataset: data.users});

        }).$promise.then(
        //success
        function( value ){/*Do something with value*/
             //ngToast.create(value);
        },
        //error
        function( error ){/*Do something with error*/
            ngToast.create(error);
            $scope.error = error;
        }
      )
    })
    .controller('Index2UserCtrl',function($scope, $route, UserResource, UserResourceSec, ngToast, NgTableParams){
        $scope.title ="Usuarios";

        var self = this;
        self.applyGlobalSearch = applyGlobalSearch;

        function applyGlobalSearch(){
          var term = self.globalSearchTerm;
          if (self.isInvertedSearch){
            term = "!" + term;
          }
          self.tableParams.filter({ $: term });

        }


        UserResourceSec.get(function(data){
            $scope.users = data.users;
            $scope.usersSec = data.users;
            $scope.tableHeaders = ['ID','Name', 'Email', 'Role'];

            self.tableParams = new NgTableParams({ count: 10}, { counts: [5, 10, 25], dataset: data.users});

        }).$promise.then(
        //success
        function( value ){/*Do something with value*/
             //ngToast.create(value);
              //$scope.getArray = value.users;
        },
        //error
            function( error ){/*Do something with error*/
                ngToast.create(error);
                $scope.error = error;
             }
        )

    })
    .controller('CreateUserCtrl',function($scope, $route, $location, $timeout, UserResource, ngToast){
        $scope.title ="Crear Usuario";
        $scope.button ="Crear";
        $scope.User ={};
        $scope.saveUser = function (){

            UserResource.save($scope.User).$promise.then(
                //success
                function( value ){/*Do something with value*/

                    if (value.created == "OK"){
                        ngToast.create("<strong>" + "El usuario ha sido Creado." + "</strong>");            $timeout(function(){
                            $location.path('/users');
                        },1000);

                    }else{
                        $scope.value = value;
                    }

                },
                //error
                function( error ){/*Do something with error*/

                    //console.log(error);
                    $scope.error = error;
                }
              )
             /*$timeout(function(){
                        $location.path('/users');
                    },1000);*/
        }
    })
    .controller('EditUserCtrl',function($scope, $route, $routeParams, UserResource, $location, $timeout, ngToast){
        $scope.title ="Editar Usuario";
        $scope.button ="Editar";
        $scope.User =UserResource.get({
            id: $routeParams.id
        });

        //console.log($scope.User);

        $scope.saveUser = function (){
            //UserResource.update($scope.User);
            //ngToast.create('Usuario Editado');

            UserResource.update($scope.User).$promise.then(
                //success
                function( value ){/*Do something with value*/

                    if (value.created == "OK"){
                        ngToast.create("<strong>" + "El usuario ha sido Editado." + "</strong>");            $timeout(function(){
                            $location.path('/users');
                        },1000);

                    }else{
                        $scope.value = value;
                    }

                },
                //error
                function( error ){/*Do something with error*/

                    //console.log(error);
                    $scope.error = error;
                }
              )

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

    })
    .controller('PasswordCtrl', function($scope, Password) {

		$scope.$watch('User.password', function(pass) {

			$scope.passwordStrength = Password.getStrength(pass);

			if($scope.isPasswordWeak()) {

				$scope.userForm.password.$setValidity('strength', false);

			} else {

				$scope.userForm.password.$setValidity('strength', true);
			}
		});

		$scope.isPasswordWeak = function() {

			return $scope.passwordStrength < 40;
		}

		$scope.isPasswordOk = function() {

			return $scope.passwordStrength >= 40 && $scope.passwordStrength <= 70;
		}

		$scope.isPasswordStrong = function() {

			return $scope.passwordStrength > 70;
		}

		$scope.isInputValid = function(input) {

			return input.$dirty && input.$valid;
		}

		$scope.isInputInvalid = function(input) {
			return input.$dirty && input.$invalid;
		}

	});

