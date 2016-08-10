'use strict';
angular.module('rrApp')
    .factory('SessionData', function() {
 
 var sessionData = {}
 
 var testData = {}

 var masterData = {}
 
 function set(data) {
   sessionData = data;
 }

 function get() {
  return sessionData;
 }

function setTestData(data){
	testData = data;
	console.log("Data O/P "+testData.name);
}

function getTestData() {
  return testData;
 }
 
 //Master Data 
 function setMasterData(data){
  masterData = data;
  
}

function getMasterData() {
  return masterData;
 }


 return {
  set: set,
  get: get,
  setTestData: setTestData,
  getTestData:getTestData,
  setMasterData: setMasterData,
  getMasterData:getMasterData
 }

});