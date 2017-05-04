(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


  function UserService() {
    var service = this;
    service.user = {};

    service.signedup = function() {

      if(service.user.firstname) {
        return true;
      } else {
        return false;
      }

    };

    service.signUp = function(user) {
      service.user = user;
    };

    service.getUserInfo = function() {
      return service.user;
    }

  }

})();
