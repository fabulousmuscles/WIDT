'use strict';
                               
/* jasmine specs for controllers go here */
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
  });
});
