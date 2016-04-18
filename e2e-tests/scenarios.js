describe('app', function() {

  it('should automatically redirect to / when location hash/fragment is random', function() {
    //if is not within our pages
    browser.get('/#/random');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });

  describe('Home', function() {

    //load homepage after each test
    beforeEach(function() {
      browser.get('/#/');
    });

    //add other tests here
    it('should render Home page when user navigates to /home', function() {
      expect(element.all(by.css('h2')).first().getText()).toMatch("Topics");
    });

  });

  it('should be able to create new topic', function() {

    var list = element.all(by.css('md-list md-list-item'));

    var startCount = list.count().then(function(startCount){

      element(by.className('add-button')).click();

      var input = element(by.model('topic.name'));
      input.sendKeys('testname');
      expect(input.getAttribute('value')).toBe('testname');

      element(by.className('add')).click();

      browser.waitForAngular();

      list.count().then(function(endCount){
        expect(endCount).toEqual(startCount+1);
      });

    });

  });

});
