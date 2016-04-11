(function() {
    'use strict';

    angular
    .module('app')
    .controller('TopicController', ['$scope', '$routeParams',
    function($scope, $routeParams) {

        //controller logic goes here

        alert("Tulid lehele id-ga " +$routeParams.id);

    }]);
}());
