( function() {

    angular
        .module('app')
        .controller('optionsController', optionsController);

    optionsController.$inject = ['$scope', '$rootScope', '$console'];

    function optionsController ($scope, $rootScope, $console) {

        var vm = this;

        console.log($rootScope.item);

        vm.saveHospitalsData = function() {
            for (var i = 0; i < $rootScope.usersData.length; i++) {
                if ($rootScope.usersData[i].username == $rootScope.globals.currentUser.username) {
                    $rootScope.usersData[i] = $rootScope.item;
                }
            }

            if($rootScope.patients) {
                for (var i = 0; i < $rootScope.patients.length; i++) {
                    for (var j = 0; j < $rootScope.item.hospitals_to_check.length; j++) {
                        if ($rootScope.patients[i].hospital.title == $rootScope.item.hospitals_to_check[j].title) {
                            $rootScope.patients[i].hospital.check = $rootScope.item.hospitals_to_check[j].check;
                        }
                    }
                }
            }

            console.info($rootScope.item);
            alert('Options saved');
        }
    }
})();