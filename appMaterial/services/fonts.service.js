(function() {
    'use strict';

    angular
        .module('app')
        .factory('fonts', fonts);

    fonts.$inject = ['$http', 'googleApiKey'];

    function fonts($http, googleApiKey) {
        var service = {
                getFonts : getFonts,
                loadFont : loadFont,
                loadFonts : loadFonts
            };

        return service;

        function loadFont(font) {
            var apiUrl = [];
            apiUrl.push('//fonts.googleapis.com/css?family=');
            apiUrl.push(font.family.replace(/ /g, '+'));

            var url = apiUrl.join('');

            var link = document.getElementById('font-link');
            if (link) {
                link.href = url;
            } else {
                link = document.createElement('link');
                link.id = 'font-link';
                link.rel = 'stylesheet';
                link.href = url;
                document.body.appendChild(link);
            }

            return true;
        }

        function loadFonts(fonts) {
            var apiUrl = [],
                fontsParam = [];
            apiUrl.push('//fonts.googleapis.com/css?family=');

            for (var i in fonts) {
                if (fonts.hasOwnProperty(i)) {
                    fontsParam.push(fonts[i].family.replace(/ /g, '+'));
                }
            }

            apiUrl.push(fontsParam.join('|'));

            var url = apiUrl.join('');

            var link = document.getElementById('fonts-link');
            if (link) {
                link.href = url;
            } else {
                link = document.createElement('link');
                link.id = 'fonts-link';
                link.rel = 'stylesheet';
                link.href = url;
                document.body.appendChild(link);
            }

            return true;
        }

        function getFonts() {
            return $http.get('https://www.googleapis.com/webfonts/v1/webfonts?key=' + googleApiKey)
                .then(getFontsComplete)
                .catch(getFontsFailed);

            function getFontsComplete(response) {
                return response.data.items;
            }

            function getFontsFailed(error) {
                console.error('XHR Failed for getAvengers.' + error.data);
            }
        }
    }

}());