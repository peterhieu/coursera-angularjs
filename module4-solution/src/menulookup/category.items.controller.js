(function () {
'use strict';

angular.module('data')
.controller('CategoryItemsController', CategoryItemsController);

// 'item' is injected through state's resolve
CategoryItemsController.$inject = ['cateogryItems'];
function CategoryItemsController(cateogryItems) {
  var $ctrl = this;

  $ctrl.items = cateogryItems;

}

})();
