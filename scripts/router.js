'use strict';

angular.module('Control', ['ngResource', 'ngRoute', 'ngToast', 'ngTable', 'ngSocial', 'embedCodepen', 'ngSanitize'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/dashboard/index.html',
            controller: 'IndexDashCtrl',
        })
        .when('/users/new',{
            templateUrl: 'views/users/create.html',
            controller: 'CreateUserCtrl'
        })
        .when('/users/index2',{
            templateUrl: 'views/users/index2.html',
            controller: 'Index2UserCtrl',
            controllerAs: 'vm'
        })
        .when('/users/edit/:id',{
            templateUrl: 'views/users/edit.html',
            controller: 'EditUserCtrl'
        })
         .when('/users/editPass/:id',{
            templateUrl: 'views/users/editPass.html',
            controller: 'EditUserCtrl'
        })
        .when('/users',{
            /*templateUrl: 'views/users/index.html',
            controller: 'IndexUserCtrl',*/
            templateUrl: 'views/users/index2.html',
            controller: 'Index2UserCtrl',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
    })
    .config(['ngToastProvider', function(ngToast) {
    ngToast.configure({
      verticalPosition: 'top',
      horizontalPosition: 'center',
      maxNumber: 10,
      dismissButton: true
    });
    }]);
