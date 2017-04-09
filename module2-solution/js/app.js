(function(){
  'use strict';

  var prePopulateShoppingList  = [
    {name: "Chocolate", quantity:10},
    {name: "cookie", quantity:20},
    {name: "Peanut Butter", quantity:30},
    {name: "Pepto Bismol", quantity:40},
    {name: "Donut", quantity:50}
  ];

  angular.module('ShoppingListCheckOff', [])
  .controller('ShoppingListCheckOffController', ShoppingListCheckOffController)

    ShoppingListCheckOffController.inject = ['$scope']
    function ShoppingListCheckOffController ($scope) {
      $scope.PRE_MSG_NOTHING_BOUGHT = "Nothing bought yet.";
      $scope.MSG_EVERYTHING_BOUGHT = "Everything is bought!";
      $scope.isEmptyBuyList = false;
      $scope.isEmptyBoughtList = true;
      $scope.prePopulateList = prePopulateShoppingList;
      $scope.boughtList = [];

      $scope.toBuy = function(index) {
        var itemBought = prePopulateShoppingList[index];
        $scope.boughtList.push(itemBought);
        $scope.prePopulateList.splice(index, 1);
        console.log($scope.boughtList);

        if ($scope.prePopulateList.length == 0)
          $scope.isEmptyBuyList = true;
        $scope.isEmptyBoughtList = false;
      };
    }
})();
