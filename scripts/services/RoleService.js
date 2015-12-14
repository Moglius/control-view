'use strict';

angular.module('Control')
    .factory('RoleResource',function($resource){
        return $resource("http://control.app/rolesApi/:id",{id: "@id"});
    });
