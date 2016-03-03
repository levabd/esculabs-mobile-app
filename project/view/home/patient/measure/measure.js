(function() {
    angular
        .module('app')
        .controller('measureController', measureController);

    measureController.$inject = ['$scope', '$rootScope'];

    function measureController ($scope, $rootScope) {

        var vm = this;

        var time = new Date($rootScope.patient.date.match(/\d+/)[0] * 1);
        var hh = time.getHours();
        var mm = time.getMinutes();
        vm.hours = hh + ':' + mm;

        vm.show_detail = function(selected_measure) {
            for (var i = 0; i < $rootScope.patient.examines.measurements.length; i++) {
                if ($rootScope.patient.examines.measurements[i].proceed == selected_measure) {
                    $rootScope.measeure_proceed = $rootScope.patient.examines.measurements[i].proceed;
                    $rootScope.measeure_source = $rootScope.patient.examines.measurements[i].source;
                    navigate.pushPage('view/home/patient/measure/measure_detail.html');
                }
            }
        };

    }
})();