(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


  function UserService() {
    var service = this;
    service.user = {};

    service.signedup = function() {

      if(service.user.firstname) {
        console.log('true');
        return true;
      } else {
        console.log('false');
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
