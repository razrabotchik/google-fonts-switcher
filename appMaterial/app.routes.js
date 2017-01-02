(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'appMaterial/views/fonts.html',
                controller: 'FontsController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo : '/'
            });
    }
}());