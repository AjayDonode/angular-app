'use strict';
angular.module('rrApp').directive('dataslat', function () {
    return {
      template:   "<div class='slat'><div class='media'>"+
                "<div class='pull-left mt-10 thumb slat-brand-img'> <img class='media-object img-circle-sm' src='images/{{testData.brand}}-Logo.png' alt='{{testData.brand}}'></div>"+
                    "<div class='pull-right mt-10'>"+
                        "<button type='button' ng-click='edit(testData._id)' class='btn btn-success btn-round btn-xs'>"+
                            "<span class='glyphicon glyphicon-pencil'></span>"+
                        "</button>"+
                        "<button type='button' ng-click='remove(testData._id)' class='btn btn-danger btn-round btn-xs'>"+
                            "<span class='glyphicon glyphicon-trash'></span>"+
                        "</button>"+
                    "</div>"+
                    "<div class='media-body'>"+
                        "<p class='media-heading mb-0 mt-5'>"+
                            "<span class='slat-label' ng-bind='testData.name'></span>"+
                            "<br>"+
                            "<span style='font-weight:bold'>Brand :</span> <span ng-bind='testData.brand'></span>"+
                            "<br>"+
                            "<span style='font-weight:bold'>Created On :</span> <span ng-bind='testData.created_at | date:'MM/dd/yyyy''></span>"+
                            "<br>"+
                            "<span style='font-weight:bold'>Update On :</span> <span ng-bind='testData.updated_at | date:'dd/MM/yyyy' '></span>"+
                        "</p>"+
                    "</div>"+
                    "<div class='media-body'>"+
                        "<p class='media-heading mb-0 mt-5'>"+
                            "<span style='font-weight:bold'>Status :</span> <span ng-bind='testData.status'></span>"+
                            "<br>"+
                            "<span style='font-weight:bold'>Created By :</span> <span ng-bind='testData.created_by | date:'MM/dd/yyyy' '></span>"+
                            "<br>"+
                            "<span style='font-weight:bold'>Details :</span> <span ng-bind='testData.details'></span>"+
                        "</p>"+
                    "</div>"+
                "</div>"+
            "</div>",
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.testData = attrs.data;
      }
    };
  });