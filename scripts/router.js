'use strict';

angular.module('Control',['ngResource','ngRoute'])
    .config(function($routeProvider){
        $routeProvider
        .when('/',{
            templateUrl: 'views/index.html',
            controller: 'IndexDashCtrl',
        })
        .when('/users/new',{
            templateUrl: 'views/create.html',
            controller: 'CreateUserCtrl',
        })
        .otherwise({
            redirectTo: '/'
        });
    });
