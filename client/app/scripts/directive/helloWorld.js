'use strict';
angular.module('rrApp').directive('helloWorld', function () {
        
        return {
            
            template: '<span>Hello {{name}}</span>',
            restrict: 'E',
		    link: function postLink(scope, element, attrs) {
	          scope.name = attrs.name; 
	      	}
        }
    })