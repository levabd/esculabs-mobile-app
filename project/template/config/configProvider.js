(function(){

    angular
        .module('app')
        .config($mobileConfigProvider);

    /////////////////////////////////////////


    $mobileConfigProvider.$inject = ['$mobileConfigProvider'];
    function $mobileConfigProvider($mobileConfigProvider){


        $mobileConfigProvider.config = {

          /*  environment: 'production',

            connection_timeout: 20000,

            cleanStart: false,*/

           /* environments: {

                development: {
                    address: 'http://172.17.26.221',
                    port: '8181',
                    apiVersion: 'v2'
                },

                review:{
                    address: 'http://dev.wipon.net',
                    port: '8183',
                    apiVersion: 'v2'
                },

                hermes:{
                    address: 'http://172.17.26.6',
                    port: '8183',
                    apiVersion: 'v2'
                },

                production:{
                    address: 'https://wipon.net',
                    port: '8183',
                    apiVersion: 'v2'
                }

            },*/

            security: {
                secret: 'aMiSMUMvYmPGJz9r',
                uniqueKey: 'blya'
            }

        }

    }

})();
