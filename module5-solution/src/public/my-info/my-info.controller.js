(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);


MyInfoController.$inject = ['signedup', 'myinfo', 'UserService', 'MenuService'];
function MyInfoController(signedup, myinfo, UserService, MenuService) {
  var myInfoCtrl = this;
  console.log(myinfo);
  myInfoCtrl.myInfo = myinfo;
  myInfoCtrl.isSignedup = function(){
    if (myInfoCtrl.myInfo.firstName) {
      return true;
    }
    return false;
  };
  var error = {};
}

})();
