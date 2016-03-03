(function(){

    angular
        .module('app')
        .controller('statisticsController', statisticsController);


    /////////////////////////////////////////////

    statisticsController.$inject = ['$scope', '$rootScope'];

    function statisticsController($scope, $rootScope) {

        vm = this;
        vm.tab = 1;

        //date function
        Date.prototype.addDays = function(days) {
            var dat = new Date(this.valueOf())
            dat.setDate(dat.getDate() + days);
            return dat;
        };
        Date.prototype.deductDays = function(days) {
            var dat = new Date(this.valueOf())
            dat.setDate(dat.getDate() - days);
            return dat;
        };
        function getPatientsCount(startDate, endDate) {
            var patients_count = 0;
            for (var i = 0; i < $rootScope.patients.length; i++) {
                if ($rootScope.patients[i].checked_at >= startDate && $rootScope.patients[i].checked_at <= endDate) {
                    patients_count++;
                }
            }
            return patients_count;
        }

        vm.year_correct = getPatientsCount((new Date()).deductDays(365), new Date());
        vm.year_incorrect = 10;
        vm.month_correct = getPatientsCount((new Date()).deductDays(30), new Date());
        vm.month_incorrect = 5;
        vm.week_correct = getPatientsCount((new Date()).deductDays(7), new Date());
        vm.week_incorrect = 0;

        //Highcharts
        angular.element(document).ready(function () {
            Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    backgroundColor: 'transparent',
                    type: 'pie'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.1f}%</b>'
                },
                title: {
                    text: null
                },
                series: [{
                    colorByPoint: true,
                    data: [{
                        name: 'Корректно',
                        y: getPatientsCount((new Date()).deductDays(365), new Date())
                    }, {
                        name: 'Некорректно',
                        y: 10
                    }]
                }]
            });
        });

        var myPie2, myPie3;
        vm.select_tab = function () {
            if (vm.tab == 2) {
                if (!myPie2){
                    myPie2 = Highcharts.chart('container2', {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            backgroundColor: 'transparent',
                            type: 'pie'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        tooltip: {
                            pointFormat: '<b>{point.percentage:.1f}%</b>'
                        },
                        title: {
                            text: null
                        },
                        series: [{
                            colorByPoint: true,
                            data: [{
                                name: 'Корректно',
                                y: getPatientsCount((new Date()).deductDays(30), new Date())
                            }, {
                                name: 'Некорректно',
                                y: 5
                            }]
                        }]
                    });
                }
            }
            if (vm.tab == 3) {
                if (!myPie3) {
                    myPie3 = Highcharts.chart('container3', {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            backgroundColor: 'transparent',
                            type: 'pie'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        tooltip: {
                            pointFormat: '<b>{point.percentage:.1f}%</b>'
                        },
                        title: {
                            text: null
                        },
                        series: [{
                            colorByPoint: true,
                            data: [{
                                name: 'Корректно',
                                y: getPatientsCount((new Date()).deductDays(7), new Date())
                            }, {
                                name: 'Некорректно',
                                y: 0
                            }]
                        }]
                    });
                }
            }
        };
    }
})();