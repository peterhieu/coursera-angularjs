(function () {
'use strict';

angular.module('data')
.controller('CategoryItemsController', CategoryItemsController)
.component('itemsList', {
  templateUrl: 'src/shoppinglist/templates/cateogry-items.template.html',
  controller: CategoryItemsController,
  bindings: {
    items: '<'
  }
});

// 'item' is injected through state's resolve
CategoryItemsController.$inject = ['cateogryItems'];
function CategoryItemsController(cateogryItems) {
  var $ctrl = this;

  $ctrl.items = cateogryItems;
  
}

})();
