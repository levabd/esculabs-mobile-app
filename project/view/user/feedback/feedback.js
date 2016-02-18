(function(){
    angular
        .module('app')
        .controller('dropdownController', dropdownController);

    dropdownController.$inject = ['$scope', '$console'];

    function dropdownController($scope, $console) {

        var dropdownController = this;

        ons.createPopover('template/component/popover/popover.html').then(function(popover){
            $scope.popover = popover;

        })
        /*dropdownController.popoverShow = function (route) {

        }*/
    }

    /*function dropdownController($scope) {
        var dropdownController = this;
        dropdownController.createPopover('template/component/popover/popover.html').then(function(popover) {
            dropdownController.popover = popover;
        });
    }*/
})();