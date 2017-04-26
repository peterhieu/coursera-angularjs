(function () {
'use strict';

angular.module('menuapp')
.service('MenuDataService', MenuDataService)
.constant('APIBase', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$http', '$q', '$timeout', 'APIBase']
function MenuDataService($http, $q, $timeout, APIBase) {
  var service = this;
  var categories = [];
  var items = [];

  service.getAllCategories = function() {
    return $http({
      method:"GET",
      url: APIBase+"/categories.json"
    }).then (function(returnObj) {
      categories = returnObj.data;
      return categories;
    });
  };


  service.getItemsForCategory = function(short_name) {
    return $http({
      method:"GET",
      url: APIBase+"/menu_items.json?category="+short_name
    }).then (function(returnObj) {
      items = returnObj.data.menu_items;
      return items;
    });
  };

}

})();
