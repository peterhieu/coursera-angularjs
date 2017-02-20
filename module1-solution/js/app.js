(function(){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', function($scope) {
    $scope.menu = "";     // containing the entered string of menu
    $scope.message = "";  // message will be showing under the button

    $scope.onCheckBtnClick = function() {
      var inputMenu = $scope.menu;
      var itemList = [];

      if(inputMenu == "" || inputMenu == " ") {
        $scope.message = "Please enter data first";
        return;
      }

      itemList = inputMenu.split(',');
      if (itemList.length <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }
    };

    $scope.displayNumeric = function() {
      var totalNameValue = calculateNumericForString($scope.name);
      $scope.totalValue = totalNameValue;
    };
  });
})();
