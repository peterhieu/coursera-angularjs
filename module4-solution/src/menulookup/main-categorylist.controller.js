(function () {
'use strict';

angular.module('menuapp')
.controller('MainShoppingListController', MainShoppingListController);


MainShoppingListController.$inject = ['MenuDataService'];
function MainShoppingListController(MenuDataService) {
  var mainList = this;
  mainList.categories = [];

  MenuDataService.getAllCategories().then(function(dataObj) {
      var receivedCatList = [];
      receivedCatList = dataObj;

      for (var index in receivedCatList) {
        var category = {};
        category = {
          'id': receivedCatList[index].id,
          'name': receivedCatList[index].name,
          'short_name' : receivedCatList[index].short_name,
          'url' : receivedCatList[index].url,
        };
        mainList.categories.push(category);
      }
  });

}

})();
