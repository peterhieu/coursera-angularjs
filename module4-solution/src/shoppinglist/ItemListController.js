(function () {
'use strict';

angular.module('ShoppingList')
.controller('ItemListController', ItemListController);

// 'item' is injected through state's resolve
ItemListController.$inject = ['item']
function ItemListController(item) {
  var itemList = this;
  itemList.name = item.name;
  itemList.short_name = item.quantity;
  itemList.description = item.description;
}

})();
