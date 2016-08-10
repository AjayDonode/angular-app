'use strict';
angular.module('rrApp')
    .controller('TestDetailsCtrl', function($scope, $location, RapidTestService, UsersService, SessionData) {


        //var sessionData = SessionData.get();
        //$scope.testData = sessionData.testData;

        $scope.data = {}; 

        $scope.testStyles = [{
            "styledesc": "225769 Test Hooded Faux Wool",
            "compdesc": "Test Hooded Faux Wool",
            "cccount": 2,
            "units": 2,
            "size": 6,
            "retail": "$49.94"
        },
        {
            "styledesc": "225769 Test Hooded Faux Wool",
            "compdesc": "Test Hooded Faux Wool",
            "cccount": 2,
            "units": 2,
            "size": 6,
            "retail": "$49.94"
        },
        {
            "styledesc": "225769 Test Hooded Faux Wool",
            "compdesc": "Test Hooded Faux Wool",
            "cccount": 2,
            "units": 2,
            "size": 6,
            "retail": "$49.94"
        }
        ]

 	$scope.storeGroups = [{
            "code": "223",
            "store": "Test Location 1",
            "location": "SFO",
            "units": 2,
            "issue": "$49.94"
        },
        {
            "code": "224",
            "store": "Test Location 2",
            "location": "DEN",
            "units": 2,
            "issue": "$49.94"
        }]

        

        $scope.init = function() {
            $scope.testData = SessionData.getTestData();
            $scope.data = SessionData.getMasterData(); 

            $('#market')
            .select2();

            console.log(typeof $scope.testData);
            if ($scope.testData.name === undefined || $scope.testData.name === null) {
                console.log("Test page Undefined");
                $location.path("rapidtest");
            }
            console.log("Test page here " + $scope.testData.name);
        };

        $scope.steps = [
            'Product and Test Info',
            'Key Dates'
        ];

        $scope.selection = $scope.steps[0];
        $scope.getCurrentStepIndex = function() {

            // Get the index of the current step given selection
            return _.indexOf($scope.steps, $scope.selection);
        };

        // Go to a defined step index
        $scope.goToStep = function(index) {
            if (!_.isUndefined($scope.steps[index])) {
                $scope.selection = $scope.steps[index];
            }
        };

        $scope.submit = function() {
            RapidTestService.save($scope.testData).success(function(data) {
                
                $('#rapidTestModal').modal('hide');
                $location.path("rapidtest");
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        };

    });
