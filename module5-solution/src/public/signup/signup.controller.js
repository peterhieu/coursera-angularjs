(function () {

angular.module('public')
.controller('SignUpController', SignUpController);


SignUpController.$inject = ['signedup', 'UserService', 'MenuService'];
function SignUpController(signedup, UserService, MenuService) {
  var signupCtrl = this;
  var user = {};

  signupCtrl.signedup = signedup;

  signupCtrl.submit = function() {
    console.log('sumbit');
    MenuService.getItem(signupCtrl.user.favorite.short_name)
    .then(
      function (response) {
      signupCtrl.user.favorite = response;
      UserService.signUp(signupCtrl.user);
      signupCtrl.signedup = true;
      signupCtrl.error = {};
    },
    function (error) {
      signupCtrl.error.msg = 'No such menu number exists.';
    });
  };
}

})();
