(function() {
    'use strict';

    angular
    .module('app')
    .controller('HomeController', ['$scope', 'Topic',
    function($scope, Topic) {

        Topic.query()
            .$promise.then(
                function(data){
                    console.log(data);
                },
                function(error){
                    console.log(error);
                }
            );


    }]);
}());
