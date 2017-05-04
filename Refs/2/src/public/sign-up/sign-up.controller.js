(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);


SignUpController.$inject = ['registered', 'MenuService', 'UserService'];
function SignUpController(registered, MenuService ,UserService) {
  var $ctrl = this;

  $ctrl.user = {};
  $ctrl.registered = registered;
  $ctrl.error = {};

  $ctrl.submit = function () {
    MenuService.getItem($ctrl.user.favorite.short_name)
      .then(
        function (response) {
        $ctrl.user.favorite = response;
        UserService.signUp($ctrl.user);
        $ctrl.registered = true;
        $ctrl.error = {};
      },
      function (error) {
        $ctrl.error.msg = 'No such menu number exists.';
      });
  };
}

})();
