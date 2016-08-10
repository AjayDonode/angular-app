'use strict';
angular.module('rrApp')
    .factory('UsersService', function($http) {
    var urlBase = 'http://localhost:9091';

    var UsersService = {};
    
    UsersService.save =  function(user) {
        return $http.post(urlBase+'/users', user);
    }; 

    UsersService.get = function (id ,user) {
        for (var i in users) {
            if (users[i]._id == id) {
                return users[i];
            }
        }
    }
    
    //iterate through contacts list and delete 
    //contact if found
    UsersService.delete = function (id) {
         return $http.delete(urlBase+'/users/'+id , {'id' : id});
    }

    //Returns the categories
    UsersService.list = function () {
        return $http.get(urlBase+'/users');
    }

    return UsersService;

});