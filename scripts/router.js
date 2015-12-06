'use strict';

angular.module('Control', ['ngResource', 'ngRoute', 'ngToast'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'IndexDashCtrl'
        })
        .when('/users/new',{
            templateUrl: 'views/users/create.html',
            controller: 'CreateUserCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    });
