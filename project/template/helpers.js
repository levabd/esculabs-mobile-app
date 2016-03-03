(function() {

    angular
        .module('app')
        .run(helpers);

    helpers.$inject = ['$rootScope', '$console', '$window'];

    function helpers($rootScope, $console, $window) {
        var helpers = {
            killAllPagesIn: function (_navigator) {
                if (_navigator) {
                    var count = _navigator.getPages().length;
                    for (var i = 1; i < count; i++) {
                        _navigator.popPage({animation: 'none'});
                    }
                }
            },
            returnToMainPage: function (_navigator) {
                if (_navigator) {
                    var count = _navigator.getPages().length;
                    for (var i = 1; i < count; i++) {
                        _navigator.popPage({animation: 'slide'});
                    }
                    menu.close();
                }
            },
            clearDetail: function() {
                for(var i = 0; i < $rootScope.patients.length; i++) {
                    $rootScope.patients[i].detail = false;
                }
            },
            popPage: function(_navigator) {
                if (_navigator.getPages().length > 1){
                    _navigator.popPage({animation: 'none'});
                }
            },
            postPopNavigator: function() {
                $console.backInstance();
            }
        };
        $rootScope.helpers = helpers;
    }
})();
