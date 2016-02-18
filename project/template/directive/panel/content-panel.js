(function(){

    angular
        .module('app')
        .directive('contentPanel', contentPanel );

    ///////////////////////////

    function contentPanel() {
        var contentPanel = {
            restrict: 'E',
            transclude: true,
            templateUrl: 'template/directive/panel/content-panel.html'
        };
        return contentPanel
    }

})();