(function(){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController)
  .filter('cust', CustomFilterFactory);

    LunchCheckController.inject = ['$scope', 'custFilter']
    function LunchCheckController ($scope, custFilter) {
      $scope.menu = "";     // containing the entered string of menu
      $scope.message = "";  // message will be showing under the button
      $scope.customStyle={};

      $scope.onCheckBtnClick = function() {
        var inputMenu = $scope.menu;
        var itemList = [];

        if(inputMenu == "" || inputMenu == " ") {
          $scope.message = "Please enter data first";
          $scope.customStyle.style = {"color":"red"};
          return;
        }

        itemList = inputMenu.split(',');
        if (itemList.length <= 3) {
          $scope.message = "Enjoy!";
          $scope.customStyle.style = {"color":"blue"};
        } else {
          $scope.message = "Too much!";
          $scope.customStyle.style = {"color":"red"};
        }
      };

      $scope.displayNumeric = function() {
        var totalNameValue = calculateNumericForString($scope.name);
        $scope.totalValue = totalNameValue;
      };

      $scope.saymessage = function() {
        return $scope.message;
      };
  }

  function CustomFilterFactory() {
    return function(input){
      var changedInput = ""
      return changedInput;
    };
  }


})();
