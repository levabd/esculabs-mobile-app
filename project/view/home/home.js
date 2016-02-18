(function(){
    angular
        .module('app')
        .controller('homeController', homeController)
        .filter('onlyBooleanValueFilter', [function(){
            return function(input, param){
                var ret = [];
                if(!angular.isDefined(param)) param = true;
                angular.forEach(input, function(v){
                    if(angular.isDefined(v.hospital.check) && v.hospital.check === param){
                        ret.push(v);
                    }
                });
                return ret;
            };
        }])
        .filter('fullNameFilter', [function() {

            return function(input, param) {
                var output = [];
                if (param != "" && param != undefined){
                    console.info(param.indexOf(' '));
                    if (param.indexOf(' ') > 0) {
                        angular.forEach(input, function(v) {
                            var fullName = v.first_name + ' ' + v.last_name;
                            if (fullName == param || v.hospital.title == param) {
                                output.push(v);
                                console.info(fullName);
                            }
                        });
                    }
                    else {
                        angular.forEach(input, function(v) {
                            if (v.first_name == param || v.last_name == param || v.hospital.title == param) {
                                output.push(v);
                                console.info(param);
                            }
                        });
                    }

                }
                else {
                    output = input;
                }
                return output;
            }

        }]);

    homeController.$inject = ['$scope', '$rootScope', 'localStorageService', '$http', '$timeout'];

    function homeController($scope, $rootScope, localStorageService, $http, $timeout) {

        console.info('HOME CONTROLLER');

        var vm = this;

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



        /*if($rootScope.patients) {
            for (var i = 0; i < $rootScope.patients.length; i++) {
                if ($rootScope.patients[i].hospital.title == $rootScope.item.hospitals_to_check[i].title) {
                    $rootScope.patients[i].hospital.check = $rootScope.item.hospitals_to_check[i].check;
                }
            }
        }*/


       /* $http.get('db/users.json').success(function(data) {
            $rootScope.usersData = data;
            localStorageService.set('users', data);

            var user = _.chain($rootScope.usersData)
                .find(function(userData){ return userData.username == $rootScope.globals.currentUser.username; })
                .value();
            vm.item = angular.copy(user);

        });

        $http.get('db/patients.json').success(function(data) {
            $rootScope.patientsData = data;
            vm.patients = angular.copy($rootScope.patientsData);
            for (var i = 0; i < vm.patients.length; i++) {
                if (vm.patients[i].hospital.title == vm.item.hospitals_to_check[i].title) {
                    vm.patients[i].hospital.check = vm.item.hospitals_to_check[i].check;
                }
            }
        });*/

        //pull to refresh код
        $scope.load = function($done) {

            $timeout(function() {
                if($rootScope.patients){
                    console.info('RELOAD!!!!!!!!!!!!!!!!!!!!!!!1');
                    /*var user = _.chain($rootScope.usersData)
                        .find(function(userData){ return userData.username == $rootScope.globals.currentUser.username; })
                        .value();
                    vm.item = angular.copy(user);*/
                    for (var i = 0; i < $rootScope.patients.length; i++) {
                        for (var j = 0; j < $rootScope.item.hospitals_to_check.length; j++) {
                            if ($rootScope.patients[i].hospital.title == $rootScope.item.hospitals_to_check[j].title) {
                                $rootScope.patients[i].hospital.check = $rootScope.item.hospitals_to_check[j].check;
                            }
                        }
                    }
                    $rootScope.helpers.clearDetail();
                    $done();
                }
            }, 1000);

        }

        if(!$rootScope.usersData && !$rootScope.patientsData && !$rootScope.globals){
            $http.get('db/users.json').success(function(data) {
                $rootScope.usersData = data;
                localStorageService.set('users', data);
                console.info('First http.get')
            });

            $http.get('db/patients.json').success(function(data) {
                $rootScope.patientsData = data;
                $rootScope.patients = angular.copy($rootScope.patientsData);
            });
        }

        /*vm.list = $rootScope.patientsData(function(response) {
            angular.forEach(response, function(value, key) {
                var fullName = value.first_name + ' ' + value.last_name;
                vm.list[key].fullName = fullName;
            });
        });*/


        //Проверка на авторизацию пользователя
        $rootScope.globals = localStorageService.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
            $http.get('db/users.json').success(function(data) {
                $rootScope.usersData = data;
                var user = _.chain($rootScope.usersData)
                    .find(function(userData){ return userData.username == $rootScope.globals.currentUser.username; })
                    .value();
                $rootScope.item = angular.copy(user);
                localStorageService.set('users', data);
                console.info('Second http.get')
            });

            $http.get('db/patients.json').success(function(data) {
                $rootScope.patientsData = data;
                $rootScope.patients = angular.copy($rootScope.patientsData);
                for (var i = 0; i < $rootScope.patients.length; i++) {
                    for (var j = 0; j < $rootScope.item.hospitals_to_check.length; j++) {
                        if ($rootScope.patients[i].hospital.title == $rootScope.item.hospitals_to_check[j].title) {
                            $rootScope.patients[i].hospital.check = $rootScope.item.hospitals_to_check[j].check;
                        }
                    }
                }
            });
        }
        else {
            navigate.pushPage('view/user/login/login.html',{animation:'none'});
            $rootScope.item = null;
        }

    }
})();