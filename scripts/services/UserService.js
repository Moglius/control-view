'use strict';

angular.module('Control')
    .factory('UserResource',function($resource){
        return $resource("http://control.app/usersAPI/:id",{id: "@id"});
    });
