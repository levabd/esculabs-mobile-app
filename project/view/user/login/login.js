(function(){
    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope', '$rootScope', 'localStorageService', 'authenticationService', '$http'];

    function loginController($scope, $rootScope, localStorageService, authenticationService, $http) {

        var vm = this;

        var path = "";
        path = navigate.getCurrentPage().name;
        if (path == "view/user/login/login.html"){
            menu.setSwipeable(false);
            navigate.getDeviceBackButtonHandler().disable();
        }

        console.info('LOGIN CONTROLLER');

        (function initController() {
            authenticationService.clearCredentials();
        })();

        vm.login = function() {
            vm.username = vm.username.toLowerCase();
            console.info(vm.username);
            authenticationService.Login(vm.username, vm.password, function (response) {
                if(response.success) {
                    authenticationService.setCredentials(vm.username, vm.password);
                    navigate.popPage({animation: 'fade'});
                    menu.setSwipeable(true);
                    navigate.getDeviceBackButtonHandler().enable();

                    var user = _.chain($rootScope.usersData)
                        .find(function(userData){ return userData.username == $rootScope.globals.currentUser.username; })
                        .value();
                    $rootScope.item = angular.copy(user);

                    for (var i = 0; i < $rootScope.patients.length; i++) {
                        for (var j = 0; j < $rootScope.item.hospitals_to_check.length; j++) {
                            if ($rootScope.patients[i].hospital.title == $rootScope.item.hospitals_to_check[j].title) {
                                $rootScope.patients[i].hospital.check = $rootScope.item.hospitals_to_check[j].check;
                            }
                        }
                    }

                }
                else {
                    alert(response.message);
                }
            })
        }
    }
})();