(function() {
    angular
        .module('app')
        .controller('detailController', detailController);

    detailController.$inject = ['$scope', '$rootScope', '$http', '$timeout'];

    function detailController ($scope, $rootScope, $http, $timeout) {

        var vm = this

        //var time = new Date;
        //console.info(time.toJSON());

        /*var ms = Date.parse('2016-02-22T10:19:13.489+06:00');
        console.info(ms);*/

        loadModal.show();
        $timeout(function() {

            $http.get('db/patient_detail.json').success(function (data) {

                $rootScope.patient = data;
                console.info($rootScope.patient);
                console.info($rootScope.patient.date);

                var time = new Date($rootScope.patient.date.match(/\d+/)[0] * 1);
                var dd = time.getDate();
                if (dd < 10) dd = '0' + dd;
                var mm = time.getMonth();
                if (mm < 10) mm = '0' + mm;
                var yy = time.getFullYear();
                vm.fullDate = dd + '.' + mm + '.' + yy;

            });
            loadModal.hide();
        }, 2000);


    }
})();