(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);


MyInfoController.$inject = ['signedup', 'myinfo', 'UserService', 'MenuService'];
function MyInfoController(signedup, myinfo, UserService, MenuService) {
  var myInfoCtrl = this;
  console.log(myinfo);
  myInfoCtrl.myInfo = myinfo;
  myInfoCtrl.signedup = signedup;
  var error = {};


}

})();
