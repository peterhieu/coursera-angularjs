(function() {
  'use strict';

  angular.module('ItemSearchModule', [])
  .controller('ItemSearchController', ItemSearchController)
  .service('ItemSearchService', ItemSearchService)
  .constant('ServerDomainPath', "http://davids-restaurant.herokuapp.com")
  .component('foundItems', foundItems);

  ItemSearchController.$inject = ['$scope', 'ItemSearchService']
  function ItemSearchController($scope, ItemSearchService) {
    var searchCtl = this;
    searchCtl.foundItems = [];
    searchCtl.message = "";

    searchCtl.getFoundItems = function() {
      var search = $scope.searchStr;

      if (searchCtl.searchStr == null || searchCtl.searchStr == "") {
        searchCtl.message = "Please enter what item you want";
        return;
      }

      var response = ItemSearchService.requestAllItems();

      response.then(function (responseData) {
          ItemSearchService.sch = searchCtl.searchStr;
          ItemSearchService.itemList = responseData.data.menu_items;

          for (var index in ItemSearchService.itemList) {
            if (ItemSearchService.itemList[index].description.includes(ItemSearchService.sch)) {
              var item = {};
              item.name = ItemSearchService.itemList[index].name;
              item.short_name = ItemSearchService.itemList[index].short_name;
              item.description = ItemSearchService.itemList[index].description;
              searchCtl.foundItems.push(item);

            }
          }
      //    console.log(searchCtl.foundItems);

      })
      .catch(function (error) {
        console.log("Request to web server failed. " + error);
      });
    };

    searchCtl.onRemove = function(index) {
      searchCtl.foundItems.splice(index, 1);
    };

    searchCtl.remove = function (idx) {
      searchCtl.onRemove({ index: idx });
    };
  };

  ItemSearchService.$inject = ['$http', 'ServerDomainPath'];
  function ItemSearchService($http, ServerDomainPath) {
    var service = this;
    var sch = '';
    var itemList = [];
    var foundItems = [];

    service.requestAllItems = function() {
      var response = $http({
        method: ("GET"),
        url: (ServerDomainPath + "//menu_items.json")
      });
      return response;
    };

  }

  function foundItems() {
    var directive = {
      templateUrl: 'foundItems.html',
      bindings: {
        message: '@message',
        foundItems: '<',
        onRemove: '&'
      },
      controller: ItemSearchController,
      controllerAs: 'searchCtl',
      bindToController: true
    };
    return directive;
  }

})();
