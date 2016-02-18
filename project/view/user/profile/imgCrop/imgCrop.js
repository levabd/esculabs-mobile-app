(function(){

    angular
        .module('app')
        .controller('imgCropController', imgCropController);

    /////////////////////////////////////////////////////////



    imgCropController.$inject = ['$scope', '$console'];

    function imgCropController($scope, $console) {
        var vm = this;

        $scope.avatar = '';
        //$scope.profileScope = angular.element(document.getElementById('profileController')).scope();

        vm.init = function(){
            $console.instance('imgCropController');
        };

        vm.init();
    }

})();