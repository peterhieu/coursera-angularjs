(function() {
  'use strict';

  angular.module('ItemSearchModule', [])
  .controller('ItemSearchController', ItemSearchController)
  .service('SearchListService', SearchListService)
  .constant('ServerDomainPath', "http://davids-restaurant.herokuapp.com")
  .component('foundItems', foundItems);

  ItemSearchController.$inject = ['$scope', 'SearchListService']
  function ItemSearchController($scope, SearchListService) {
    var searchCtl = this;
    searchCtl.foundItems = [];
    searchCtl.message = "";

    searchCtl.getFoundItems = function() {
      var search = $scope.searchStr;

      if (searchCtl.searchStr == null || searchCtl.searchStr == "") {
        searchCtl.message = "Please enter what item you want";
        return;
      }

      var response = SearchListService.requestAllItems(searchCtl.searchStr);
      
    };

    searchCtl.onRemove = function(index) {
      searchCtl.foundItems.splice(index, 1);
    };

    searchCtl.remove = function (idx) {
      searchCtl.onRemove({ index: idx });
    };
  };


  SearchListService.$inject = ['$http', 'ServerDomainPath']
  function SearchListService($http, ServerDomainPath) {
    var service = this;
    var itemList = [];
    var Items = [];


    service.requestAllItems = function(sch) {
      var response = $http({
        method: ("GET"),
        url: (ServerDomainPath + "//menu_items.json")
      }).then(function (responseData) {
          SearchListService.itemList = responseData.data.menu_items;

          if (SearchListService.itemList.length == 0) {
            searchCtl.foundItems = [];
            searchCtl.message = "Nothing found";
          }

          for (var index in SearchListService.itemList) {
            if (SearchListService.itemList[index].description.includes(sch)) {
              var item = {};
              item = {
                'name': SearchListService.itemList[index].name,
                'short_name' : SearchListService.itemList[index].short_name,
                'description' : SearchListService.itemList[index].description,
              };
              Items.push(item);
            }
          }
      })
      .catch(function (error) {
        console.log("Request to web server failed. " + error);
      });

      return Items;
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

  SearchListFactory.$inject = ['$http', 'ServerDomainPath'];
  function SearchListFactory($http, ServerDomainPath, maxItems) {
    var factory = function (maxItems) {
      return new SearchListService(maxItems);
    };

    return factory;
  }

})();
