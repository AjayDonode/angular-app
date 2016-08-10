'use strict';

/**
 * @ngdoc overview
 * @name rrApp
 * @description
 * # rrApp
 *
 * Main module of the application.
 */
angular
  .module('rrApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'rt.select2'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/rapidtest', {
        templateUrl: 'views/rtestlist.html',
        controller: 'RapidTestCtrl',
        controllerAs: 'rapidTestCtrl'
      }).when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'users'
      }).when('/about', {
        templateUrl: 'views/about.html'
      }).when('/testdetails', {
        templateUrl: 'views/testdetails.html',
        controller: 'TestDetailsCtrl',
        controllerAs: 'testDetails'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
