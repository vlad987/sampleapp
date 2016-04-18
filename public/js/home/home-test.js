describe('app', function() {

    var HomeController, scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        HomeController = $controller("HomeController", {
            $scope: scope,

        });
    }));

    describe('HomeController', function(){

        //HomeController tests go here
        it('should have HomeController to exist', function() {
            //spec body
            expect(HomeController).toBeDefined();
            expect(scope.loading).toEqual(true);
        });

    });
});
