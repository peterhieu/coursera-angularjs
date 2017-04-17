(function() {
  'use strict';

  angular.module('ItemSearchModule', [])
  .controller('ItemSearchController', ItemSearchController)
  .service('ItemSearchService', ItemSearchService)
  .constant('ServerDomainPath', "http://davids-restaurant.herokuapp.com");

  ItemSearchController.$inject = ['$scope', 'ItemSearchService']
  function ItemSearchController($scope, ItemSearchService) {
    var searchCtl = this;
    searchCtl.foundItems = [];
    searchCtl.message = "";

    searchCtl.getFoundItems = function() {
      var search = $scope.searchStr;

      if (searchCtl.searchStr == null || searchCtl.searchStr == "") {
        searchCtl.message = "Please enter item name";
        return;
      }

      var response = ItemSearchService.requestAllItems();

      response.then(function (responseData) {
          var allItems = responseData.data.menu_items;
          searchCtl.foundItems = ItemSearchService.getFoundItems(search, allItems);

          if (searchCtl.foundItems.lenth == 0) {
            searchCtl.message = "Nothing found";
          } else {
            searchCtl.message = "Found";
          }
      })
      .catch(function (error) {
        console.log("Request to web server failed. " + error);
      });
    };


    // searchCtl.isFound = function() {
    //   if (searchCtl.foundItems.length == 0) {
    //       searchCtl.message = "Nothing found";
    //       return false;
    //   }
    //   return true;
    // };

  };

  ItemSearchService.$inject = ['$http', 'ServerDomainPath'];
  function ItemSearchService($http, ServerDomainPath) {
    var service = this;

    service.requestAllItems = function() {
      var response = $http({
        method: ("GET"),
        url: (ServerDomainPath + "/menu_items.json")
      });
      return response;
    };

    service.getFoundItems = function(search, itemList) {
      var foundItems = [];
      for (var index in itemList) {
        if (itemList[index].description.includes(search))
          var item = {menuitem: itemList[index].menu_item,
          short_name: itemList[index].short_name,
        short_name: itemList[index].description}
          foundItems.push(itemList[index].name);
      }
      return foundItems;
    };

  }

})();
