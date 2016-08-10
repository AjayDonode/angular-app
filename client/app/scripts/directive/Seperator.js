angular.module('rrApp').directive('seperator', function() {
    return {
        restrict: 'E',
        scope:true,
        template: "<div style='width: 100%; height: 10px; border-bottom: 1px solid #ddd; text-align: left; padding-left:10px;'>"+
        "<span style='font-size: 15px; background-color: #FFFFFF; padding: 0 5px;'> {{name}}</span></div>",
        link: function postLink(scope, element, attrs) {
	          scope.name = attrs.name; 
	     }
    }
})
