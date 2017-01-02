(function() {
    'use strict';

    angular
        .module('app')
        .controller('FontsController', FontsController);

    FontsController.$inject = ['$scope', '$mdDialog', 'fonts'];

    function FontsController($scope, $mdDialog, fonts) {
        var vm = this;

        vm.searchFont = '';
        vm.fonts = [];
        vm.currentFont = false;

        vm.setCurrentFont = setCurrentFont;

        $scope.$watch('vm.currentFont', function(current, original) {
            if (current) {
                fonts.loadFont(current);
            }
        });

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

        // <!--- ---!>
        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                controllerAs : 'vm',
                templateUrl: 'appMaterial/views/dialog/font.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($scope, $mdDialog) {
            var dialogVm = this,
                currentIndex = vm.fonts.indexOf(vm.currentFont);

            dialogVm.limit = 12;
            dialogVm.fonts_to_show = [];
            dialogVm.current_font = false;
            dialogVm.fonts = vm.fonts;

            if (currentIndex > -1) {
                dialogVm.page = Math.round(currentIndex / dialogVm.limit) + 1;
            } else {
                dialogVm.page = 1;
            }

            dialogVm.showFonts = showFonts;
            dialogVm.hide = hide;
            dialogVm.cancel = cancel;
            dialogVm.select = select;
            dialogVm.save = save;

            $scope.$watch('vm.page', dialogVm.showFonts);

            (function(font) {
                dialogVm.current_font = font;
            }(vm.currentFont));

            function showFonts() {
                dialogVm.fonts_to_show = vm.fonts.slice(dialogVm.page * dialogVm.limit - dialogVm.limit, dialogVm.page * dialogVm.limit);
                fonts.loadFonts(dialogVm.fonts_to_show);
            }

            function hide() {
                dialogVm.current_font = false;
                $mdDialog.hide();
            }

            function cancel() {
                dialogVm.current_font = false;
                $mdDialog.cancel();
            }

            function select(font) {
                dialogVm.current_font = font;
            }

            function save() {
                setCurrentFont(dialogVm.current_font);
                dialogVm.hide();
            }
        }

    }
}());