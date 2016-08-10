'use strict';
angular.module('rrApp')
    .factory('RapidTestService', function($http) {
    var urlBase = 'http://localhost:9091';

    var RapidTestService = {};
    
    RapidTestService.save =  function(rapidtest) {
        return $http.post(urlBase+'/rapidtest', rapidtest);
    }; 

    RapidTestService.get = function (id ,rapidtest) {
        for (var i in rapidtest) {
            if (rapidtest[i]._id == id) {
                return rapidtest[i];
            }
        }
    }
    
    //iterate through contacts list and delete 
    //contact if found
    RapidTestService.delete = function (id) {
         return $http.delete(urlBase+'/rapidtest/'+id , {'id' : id});
    }

    //Returns the categories
    RapidTestService.list = function () {
        return $http.get(urlBase+'/rapidtest');
    }

    return RapidTestService;

});