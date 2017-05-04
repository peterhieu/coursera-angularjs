(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userInfo', 'registered'];
function MyInfoController(userInfo, registered) {
  var $ctrl = this;

  $ctrl.userInfo = userInfo;
  $ctrl.registered = registered;
}

})();
