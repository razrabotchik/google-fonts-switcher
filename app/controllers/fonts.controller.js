(function() {
    'use strict';

    angular
        .module('app')
        .controller('FontsController', FontsController);

    FontsController.$inject = ['fonts'];

    function FontsController(fonts) {
        var vm = this;

        vm.searchFont = '';
        vm.fonts = [];
        vm.currentFont = false;

        vm.setCurrentFont = setCurrentFont;

        activate();

        function activate() {
            return getFonts().then(function() {
                console.log('Activated Fonts View');
            });
        }

        function getFonts() {
            return fonts.getFonts()
                .then(function(data) {
                    vm.fonts = data;
                    return vm.fonts;
                });
        }

        function setCurrentFont(font) {
            fonts.loadFont(font);
            vm.currentFont = font;
        }
    }
}());