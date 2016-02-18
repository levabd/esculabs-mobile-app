( function() {

    angular
        .module('app')
        .controller('optionsController', optionsController);

    optionsController.$inject = ['$scope', '$rootScope', '$console'];

    function optionsController ($scope, $rootScope, $console) {

        var vm = this;

       /* var user = _.chain($rootScope.usersData)
            .find(function(userData){ return userData.username == $rootScope.globals.currentUser.username; })
            .value();

        vm.item = {
            first_name: '',
            last_name: '',
            post: '',
            hospital: {
                id: '',
                title: ''
            },
            hospitals_to_check: [
                {
                    id: '',
                    title: '',
                    check: false
                },
                {
                    id: '',
                    title: '',
                    check: false
                }
            ],
            preAvatar: null,
            avatar: null
        };

        vm.item = angular.copy(user);*/

        console.log($rootScope.item);
       // console.log(vm.item.hospitals_to_check[0].check);
        //console.info($rootScope.patients);

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

            /*for (var i = 0; i < $rootScope.usersData.length; i++) {
                if ($rootScope.usersData[i].username == $rootScope.globals.currentUser.username) {
                    $rootScope.usersData[i] = vm.item;
                }
            }*/
            console.info($rootScope.item);
            alert('Options saved');
        };

       /* vm.popToHomePage = function() {
            $rootScope.helpers.homePageService();
            navigate.popPage();
        }*/
        /*vm.popAndReplace = function() {
            navigate.popPage({onTransitionEnd : function() {
                navigate.replacePage('view/home/home.html', {animation: 'none'});
            }})
        };*/

    }
})();