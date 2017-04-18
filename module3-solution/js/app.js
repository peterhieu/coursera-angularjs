(function () {
'use strict';

angular.module('SearchMenuItemApp', [])
.controller('SearchMenuItemController', SearchMenuItemController)
.factory('SearchMenuItemFactory', SearchMenuItemFactory)
.component('foundItems', {
  templateUrl: 'foundItems.html',
  controller: SearchMenuItemComponentController,
  bindings: {
    items: '<',
    message: '@message',
    onRemove: '&'
  }
});

SearchMenuItemComponentController.$inject = ['$scope', '$element']
function SearchMenuItemComponentController($scope, $element) {
  var $ctrl = this;

  $ctrl.remove = function (indx) {
    $ctrl.onRemove({ index: indx });
  };
}


SearchMenuItemController.$inject = ['SearchMenuItemFactory', '$http'];
function SearchMenuItemController(SearchMenuItemFactory, $http) {
  var searchCtl = this;

  var foundList = SearchMenuItemFactory();

  searchCtl.items = SearchMenuItemService.getItems;
  searchCtl.message = "";

  searchCtl.getFoundItems = function() {
    searchCtl.message = "";
    if (searchCtl.searchStr == null || searchCtl.searchStr == "") {
      searchCtl.message = "Please enter what item you want";
      return;
    }


    var response = $http({
      method: ("GET"),
      url: ("http://davids-restaurant.herokuapp.com/menu_items.json")
    }).then(function (responseData) {
        var allItemList = responseData.data.menu_items;
        searchCtl.items = [];

        for (var index in allItemList) {
          if (allItemList[index].description.includes(searchCtl.searchStr)) {
            var item = {};
            item = {
              'name': allItemList[index].name,
              'short_name' : allItemList[index].short_name,
              'description' : allItemList[index].description,
            };

            searchCtl.items.push(item);
      //      SearchMenuItemService.addItem(item);
      //      foundList.addItem(item);
          }
        }
        if (searchCtl.items.length == 0) {
          searchCtl.items = [];
          searchCtl.message = "Nothing found";
        }

        //  searchCtl.items = foundList.getItems;
    })
    .catch(function (error) {
      console.log("Request to web server failed. " + error);
    });
  };


  searchCtl.removeItem = function (itemIndex) {
//    foundList.removeItem(itemIndex);
      searchCtl.items.splice(itemIndex, 1);
  };
}


// If not specified, maxItems assumed unlimited
function SearchMenuItemService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (item) {
      items.push(item);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function SearchMenuItemFactory() {
  var factory = function (maxItems) {
    return new SearchMenuItemService(maxItems);
  };

  return factory;
}

})();
