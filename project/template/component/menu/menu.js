(function(){

    angular
        .module('app')
        .controller('menuController', menuController);


    /////////////////////////////////////////////

    menuController.$inject = ['$scope', '$rootScope', '$server'];

    function menuController($scope, $rootScope, $server) {

        var menuController = this;

        /**
         * @desc  Метод для открытия view из меню
         * @param route string - Путь до view
         * @param options obj - список настроек
         * @return null
         */

        menuController.navigate = function (route, options) {
            if (options) {
                if (options.preload)
                    loadModal.show();
            }
            $rootScope.helpers.killAllPagesIn(navigate);
            navigate.pushPage(route);
            menu.close();
        }
    }
})();