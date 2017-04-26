(function () {
'use strict';

angular.module('menuapp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menulookup/templates/home.template.html'
  })

  // categories list page
  .state('mainList', {
    url: '/category-list',
    templateUrl: 'src/menulookup/templates/categories.template.html',
    controller: 'MainShoppingListController as mainList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }

  })

  // items list page
  .state('itemsList', {
    url: '/category-list/{short_name}',
    templateUrl: 'src/menulookup/templates/category-items.template.html',
    controller: 'CategoryItemsController as $ctrl',
    resolve: {
      cateogryItems: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.short_name)
                .then(function (items) {
                  return items;
                });
            }]
    }
  });
}

})();
