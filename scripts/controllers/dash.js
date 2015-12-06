'use strict';

angular.module('Control')
    .controller('IndexDashCtrl',function(){})
    .controller('CreateUserCtrl',function($scope, $route, UserResource, ngToast){
        $scope.title ="Crear Usuario";
        $scope.button ="Crear";
        $scope.User ={};
        $scope.saveUser = function (){
            //console.log($scope.User);
            $scope.msj = UserResource.save($scope.User);
            //ngToast.create('Usuario Guardado');
            console.log($scope.msj);
            $route.reload();
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

	})
    .directive("passwordVerify", function() {
       return {
          require: "ngModel",
          scope: {
            passwordVerify: '='
          },
          link: function(scope, element, attrs, ctrl) {
            scope.$watch(function() {
                var combined;

                if (scope.passwordVerify || ctrl.$viewValue) {
                   combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function(value) {
                if (value) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
         }
       };
    })

    .directive('equals', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      if(!ngModel) return; // do nothing if no ng-model

      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function() {
        validate();
      });

      // observe the other value and re-validate on change
      attrs.$observe('equals', function (val) {
        validate();
      });

      var validate = function() {
        // values
        var val1 = ngModel.$viewValue;
        var val2 = attrs.equals;

        // set validity
        ngModel.$setValidity('equals', ! val1 || ! val2 || val1 === val2);
      };
    }
  }
});

