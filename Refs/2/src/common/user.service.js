(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


function UserService() {
  var service = this;
  service.user = {};

  service.signUp = function (userData) {
    service.user = userData;
  };

  service.getUserInfo = function () {
    return service.user;
  };

  service.registered = function () {
    if (service.user.firstName) {
      return true;
    }
    else {
      return false;
    }
  };

}

})();
