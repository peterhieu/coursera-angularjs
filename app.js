(function(){
  'use strict';

  angular.module('NameCalculator', [])
  .controller('NameCalculatorController', function($scope) {
    $scope.name = "";
    $scope.totalValue = 0;

    $scope.displayNumeric = function() {
      var totalNameValue = calculateNumericForString($scope.name);
      $scope.totalValue = totalNameValue;
    };

    function calculateNumericForString(str) {
      var totalStrValue = 0;
      for (var i = 0; i < str.length; i++) {
        totalStrValue += str.charCodeAt(i);
      }

      return totalStrValue;
    }

  });
})();
