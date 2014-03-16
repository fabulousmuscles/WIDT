'use strict';
                               
/* jasmine specs for controllers */
describe('WIDT controllers', function() {

  beforeEach(function(){       
    this.addMatchers({         
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });
    
  beforeEach(module('widtApp'));
  beforeEach(module('widtServices'));

  describe('MainCtrl', function(){
    var scope, ctrl, $httpBackend;  

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;  

      $httpBackend.expectGET('api/entries').
          respond([{text: 'office fun'}, {text: 'stood by the watercooler'}]);

      $httpBackend.expectGET('api/categories').
          respond([{text: 'fun'}, {text: 'news'}]);
      
      scope = $rootScope.$new();      
      ctrl = $controller('MainCtrl', {$scope: scope});
    }));
  
  
    it('should display 2 entries fetched from xhr', function() {
      expect(scope.entries).toEqualData([]);
      $httpBackend.flush();

      expect(scope.entries).toEqualData(
          [{text: 'office fun'}, {text: 'stood by the watercooler'}]);
    });

    it('should display 2 categories fetched from xhr', function() {
      expect(scope.categories).toEqualData([]);
      $httpBackend.flush();

      expect(scope.categories).toEqualData(
          [{text: 'fun'}, {text: 'news'}]);
    });

    it('should save an entry', function() {
        $httpBackend.expectPOST('api/entries', 'watched anime').respond(200, {text: 'watched anime'});
        scope.addEntry('watched anime')
        $httpBackend.flush();
        expect(scope.entries[0].text).toBe('watched anime');
        expect(scope.entries[0].$resolved).toBe(true);
        expect(scope.entries.length).toBe(3);
        expect(scope.newEntry).toBe('');
        expect(scope.entryCategories).toEqualData([]);
        expect(scope.selectCategory).toEqualData(null);
    });
  });
});
