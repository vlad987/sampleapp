(function() {
    'use strict';

    angular
    .module('app')
    .controller('HomeController', ['$scope','Topic','$mdDialog','$mdToast','$location',
    function($scope, Topic, $mdDialog, $mdToast, $location) {

        //controller logic goes here
        $scope.loading = true;

        Topic.query()
            .$promise.then(
                function(data){
                    console.log(data);
                    $scope.topics = data;
                    $scope.loading = false;
                },
                function(error){
                    console.log(error);
                }
            );

        $scope.openDialog = function($event, action, topic) {

            $scope.action = action;
            $scope.topic = topic;

            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                templateUrl:  '/js/templates/addEditDialog.html',
            });
        };

        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

        //keegi vajutas save nuppu
        $scope.save = function(topic){
            console.log(topic);

            var newTopic = new Topic(topic);
            newTopic.$save()
                .then(
                    function(data){
                        console.log(data);
                        $mdDialog.hide();
                        showToast('Successfully saved ' + data.name);
                        $scope.topics.push(data);

                    },
                    function(error){
                        console.log(error);
                        showToast(error.status + ' ' + error.statusText);
                    }
                );


        };

        $scope.update = function(topic){

            Topic.update(topic).
                $promise.then(
                    function(data){
                        console.log(data);
                        $mdDialog.hide();
                        showToast('Successfully updated ' + data.name);
                    },
                    function(error){
                        console.log(error);
                    }
                );

        };

        $scope.archive = function(topic){

            topic.$delete()
                .then(
                    function(data){
                        console.log(data);
                    },
                    function(error){
                        console.log(error);
                    }
                );

        };

        $scope.navigateTo = function(id){
            console.log(id);
            $location.path("/topic/"+id);
        };

        var showToast = function(message){
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
            );
        };

    }]);
}());
