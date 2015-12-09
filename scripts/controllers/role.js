'use strict';

angular.module('Control')
   .controller('IndexRoleCtrl',function($scope, $route, RoleResource, $location, $timeout, ngToast, NgTableParams){
        $scope.title ="Roles";
        $scope.location = $location.path();

        var self = this;
        self.applyGlobalSearch = applyGlobalSearch;

        function applyGlobalSearch(){
          var term = self.globalSearchTerm;
          if (self.isInvertedSearch){
            term = "!" + term;
          }
          self.tableParams.filter({ $: term });

        }


        function createTable(){
            RoleResource.get(function(data){
            $scope.roles = data.roles;
            $scope.tableHeaders = ['ID','Name'];

            self.tableParams = new NgTableParams({ count: 10}, { counts: [5, 10, 25], dataset: data.roles});

        }).$promise.then(
        //success
        function( value ){/*Do something with value*/
        },
        //error
            function( error ){/*Do something with error*/
                ngToast.create(error);
                $scope.error = error;
             }
        )
        }

        createTable();

                $scope.removeRole = function(id){
                    var delRole = $scope.roles[id];
                    RoleResource.delete({
                    id: id
                }).$promise.then(
                //success
                function( value ){/*Do something with value*/
                        if (value.deleted == "OK"){
                        ngToast.create("<strong>" + "El Rol ha sido Eliminado." + "</strong>");

                        $("#"+id).remove();
                         createTable();
                        //$route.reload();
                    }else{
                        $scope.value = value;
                    }
                },
                //error
                    function( error ){/*Do something with error*/

                        ngToast.create({
                          className: 'danger',
                          content: "<strong>Error de la APP.</strong>"
                        });

                        $scope.error = error;
                     }
                )
        };



    })
