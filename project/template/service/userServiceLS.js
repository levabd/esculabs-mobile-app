(function(){
    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$timeout', '$filter', '$q', '$http', '$rootScope'];

    function userService($timeout, $filter, $q, $http, $rootScope) {

        var service = {};

        service.getAll = getAll;
        //service.getById = getById;

        return service;

        /*$rootScope.usersData = [];
        $rootScope.patientsData = [];*/

        /*function homePageService() {
            return {
                foo: function() {
                    var user = _.chain($rootScope.usersData)
                        .find(function (userData) {
                            return userData.username == $rootScope.globals.currentUser.username;
                        })
                        .value();
                    vm.item = angular.copy(user);
                    console.info('HOME JS');
                    console.info(vm.item);
                }
            }
        }*/

        function getAll() {
            return $http.get('db/users.json').then(handleSuccess);
            /*$http.get('db/patients.json').success(function(data) {
                $rootScope.patientsData = data;
            });*/
        }

        //private functions

        function handleSuccess(res) {
            return res.data;
        }

        function getUsers() {

        }

        function setUsers(users) {

        }
    }
})();