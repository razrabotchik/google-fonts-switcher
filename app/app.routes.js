(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/fonts.html',
                controller: 'FontsController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo : '/'
            });
    }
}());