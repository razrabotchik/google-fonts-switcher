(function() {
    'use strict';

    angular
        .module('app')
        .factory('fonts', fonts);

    fonts.$inject = ['$http', 'googleApiKey'];

    function fonts($http, googleApiKey) {
        var factory = {
            getFonts : getFonts,
            loadFont : loadFont
        };

        return factory;

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