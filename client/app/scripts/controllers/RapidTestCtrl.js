'use strict';
angular.module('rrApp')
    .controller('RapidTestCtrl', function($scope,$location, RapidTestService,UsersService, SessionData) {


        $scope.showModal = false;
        $scope.currentUser = 'adonode';
        $scope.testData = {};
        $scope.data = {
            brands: ['Gap', 'Gap Outlet', 'Old Navy', 'Banana Republic', 'Banana Republic Factory Store','Atheleta'],
            status: ['New', 'GIS Approved', 'TA Approved'],
            types: ['New Product/Style', 'Test and Respond', 'Test and Control', 'Crowd Sourced Testing', 'Others'],
            markets: ['UNITED STATES','CANADA','EUROPE','CHINA', 'JAPAN'],
            categories: ['Mens Denim', 'Mens Knit', 'Mens Fit','Bottoms', 'OTWR', 'Woven TP'],
            divisions: ['MENS', 'WOMENS','ACCESSORIES', 'MATERNITY', 'BABY','BOYS',  'GIRLS', 'KIDS ACCESSORIES'],
            departments: ['Mens Denim', 'Mens Knit', 'Mens Fit','Bottoms', 'OTWR', 'Woven TP'],
            approvers: ['adonode', 'ssubu', 'dehuh', 'rbsmallman', 'rpalapa'],
            outputs : ['Predictive APS', 'CC Ranking', 'Silhouette Ranking','Pront/Graphic Ranking',
                                 'Validate New Trend','Test Messaging/Item Name', 'Test New Idea Against Comp',
                                 'Sales/Margin/Unit Lift','Store traffic Increase', 'other'],
            months: ['Jan', 'Feb','March','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'],
            classes: ['Class1', 'Class2']
        };
 
        SessionData.setMasterData($scope.data); //TODO Revisit code to storee it in local storage

        $scope.steps = [
            'Step 1: Test Request',
            'Step 2: Test Details'
          ];

          $scope.selection = $scope.steps[0];
          $scope.getCurrentStepIndex = function(){
            $('#market')
            .select2();

            $('#offerflowmonth')
            .select2();
            // Get the index of the current step given selection
            return _.indexOf($scope.steps, $scope.selection);
          };


         // Go to a defined step index
          $scope.goToStep = function(index) {
            if ( !_.isUndefined($scope.steps[index]) )
            {
              $scope.selection = $scope.steps[index];
            }
          };


        initUserObject();
        loadtestData();
        loadUsers();
        

       
        function loadUsers() {
            $scope.userList = UsersService.list().success(function(data) {
                console.log("Loaded " + data);
                $scope.userList = data;
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }

        function loadtestData() {
            $scope.testDataList = RapidTestService.list().success(function(data) {
                $scope.testDataList = data;
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }

        $scope.submit = function() {
            RapidTestService.save($scope.testData).success(function(data) {
                
                $('#rapidTestModal').modal('hide');
                $scope.reset();
                loadtestData();
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        };

        $scope.edit = function(id) {
            //rapidTestModal
            toggleModal();
            for (var i = 0; i < $scope.testDataList.length; i++) {
                if ($scope.testDataList[i]._id === id) {
                    $scope.testData = angular.copy($scope.testDataList[i]);
                    break;
                }
            }
        }

        $scope.editDetail = function(id) {
            //rapidTestModal
            //toggleModal();
            for (var i = 0; i < $scope.testDataList.length; i++) {
                if ($scope.testDataList[i]._id === id) {
                    $scope.testData = angular.copy($scope.testDataList[i]);
                    break;
                }
            }
            SessionData.setTestData($scope.testData);
            $location.path("testdetails");
        }

        

        $scope.add = function() {
            toggleModal();
            this.reset();
        }

        $scope.remove = function(id) {
            RapidTestService.delete(id).success(function(data) {
                console.log("Deleted " + data);
                loadtestDatas();
                $scope.reset();
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }

        $scope.reset = function() {
            initUserObject();
            $scope.myForm.$setPristine(); //reset Form
        };

        function initUserObject() {
            

            $scope.testData = {
                id: null,
                name: '',
                owner: '', 
                approver:'',
                brand: '',
                market: '',
                division: '',
                department:'',
                class:'',
                type: '',
                details: '', 
                output:'', 
                secoutput:'', 
                objective:'',
                stylecount:'',
                cc_count: '', 
                retailvalue:'',
                bizimpact:'', 
                testweeks:'',
                offerflowmonth: '',
                startdate: '',
                resultdate: '',
                status: 'New',
                created_by: $scope.currentUser
            };


        };

        var toggleModal = function() {

            
           

            $scope.showModal = !$scope.showModal;
        };

        $scope.filterFunction = function(element) {
                //return element.name.match(/^Ma/) ? true : false;
            };
    });
