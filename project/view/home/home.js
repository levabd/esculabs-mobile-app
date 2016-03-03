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
                    if (param.indexOf(' ') > 0) {
                        angular.forEach(input, function(v) {
                            var fullName = v.first_name + ' ' + v.last_name;
                            if (fullName == param || v.hospital.title == param) {
                                output.push(v);
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

    //////////////////////////////////////////////////////

    homeController.$inject = ['$scope', '$rootScope', 'localStorageService', '$http', '$timeout'];

    function homeController($scope, $rootScope, localStorageService, $http, $timeout) {

        console.info('HOME CONTROLLER');

        var vm = this;

        vm.accept = function (id) {
            $rootScope.item.all_checks++;
            $rootScope.item.correct++;
            for (var i = 0; i < $rootScope.patients.length; i++) {
                if ($rootScope.patients[i].id == id) {
                    $rootScope.patients[i].checked_at = new Date;
                    alert($rootScope.patients[i].checked_at);
                }
            }
        };

        //pull to refresh код
        $scope.load = function($done) {

            $timeout(function() {
                if($rootScope.patients){
                    console.info('RELOAD!!!!!!!!!!!!!!!!!!!!!!!1');
                    for (var i = 0; i < $rootScope.patients.length; i++) {
                        for (var j = 0; j < $rootScope.item.hospitals_to_check.length; j++) {
                            if ($rootScope.patients[i].hospital.title == $rootScope.item.hospitals_to_check[j].title) {
                                $rootScope.patients[i].hospital.check = $rootScope.item.hospitals_to_check[j].check;
                            }
                        }
                    }
                    $done();
                }
            }, 1000);

        }

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
                console.info('Second http.get')
            });

        }
        else {
            navigate.pushPage('view/user/login/login.html',{animation:'none'});
            $rootScope.item = null;

            $http.get('db/users.json').success(function(data) {
                $rootScope.usersData = data;
                console.info('First http.get');
                $http.get('db/patients.json').success(function(data) {
                    $rootScope.patientsData = data;
                    $rootScope.patients = angular.copy($rootScope.patientsData);
                });
            });
        }

    }
})();