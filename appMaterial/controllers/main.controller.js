(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController() {
        var vm = this;

        vm.title = 'For relayto';
    }
}());