'use strict';
angular.module('rrApp')
    .controller('UsersCtrl', function($scope, UsersService) {

        $scope.data = {
            roles: [{
                id: 1,
                role: 'Guest'
            }, {
                id: 2,
                role: 'Vendor'
            }, {
                id: 3,
                role: 'Gis User'
            }, {
                id: 4,
                role: 'Admin'
            }],
        };

        $scope.user = {
            id: null,
            name: '',
            lastname: '',
            email: '',

            role: {
                id: '',
                role: ''
            }
        };


        loadUsers();

        function loadUsers() {
            $scope.userList = UsersService.list().success(function(data) {
               
                $scope.userList = data;
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }


        $scope.submit = function() {

            UsersService.save($scope.user).success(function(data) {
                
                loadUsers();
                $scope.reset();
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        };

        $scope.edit = function(id) {
            console.log('id to be edited', id);
            for (var i = 0; i < $scope.userList.length; i++) {
                if ($scope.userList[i]._id === id) {
                    $scope.user = angular.copy($scope.userList[i]);
                    break;
                }
            }
        }

        $scope.remove = function(id) {
            console.log('id to be deleted', id);
            UsersService.delete(id).success(function(data) {
                console.log("Deleted " + data);
                loadUsers();
                $scope.reset();
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }

        $scope.reset = function() {
            $scope.user = {
                id: null,
                name: '',
                lastname: '',
                email: '',

                role: {
                    id: '',
                    role: ''
                }
            };
            $scope.myForm.$setPristine(); //reset Form
        }

    });
