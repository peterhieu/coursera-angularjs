(function () {
'use strict';

angular.module('data')
.component('itemsList', {
  templateUrl: 'src/shoppinglist/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
