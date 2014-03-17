'use strict';
                               
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
          respond([
              {text: 'office fun', _id: '222'}, 
              {text: 'stood by the watercooler', _id: '333'}
          ]);

      $httpBackend.expectGET('api/categories').
          respond([{text: 'fun', _id: '123'}, {text: 'news', _id: '456'}]);
      
      scope = $rootScope.$new();      
      ctrl = $controller('MainCtrl', {$scope: scope});
    }));
  
  
    it('should display 2 entries fetched from xhr', function() {
      expect(scope.entries).toEqualData([]);
      $httpBackend.flush();

      expect(scope.entries).toEqualData([
          {text: 'office fun', _id: '222'},
          {text: 'stood by the watercooler', _id: '333'}
      ]);
    });

    it('should display 2 categories fetched from xhr', function() {
      expect(scope.categories).toEqualData([]);
      $httpBackend.flush();

      expect(scope.categories).toEqualData(
          [{text: 'fun', _id: '123'}, {text: 'news', _id: '456'}]);
    });

    it('should save an entry', function() {
        $httpBackend.expectPOST('api/entries', 'watched anime').respond(
            200, {text: 'watched anime'}
        );
        scope.addEntry('watched anime')
        $httpBackend.flush();
        expect(scope.entries[0].text).toBe('watched anime');
        expect(scope.entries[0].$resolved).toBe(true);
        expect(scope.entries.length).toBe(3);
        expect(scope.newEntry).toBe('');
        expect(scope.entryCategories).toEqualData([]);
        expect(scope.selectCategory).toEqualData(null);
    });

    it('should delete an entry', function() {
        $httpBackend.whenDELETE('api/entries/222').respond(200, '222');
        $httpBackend.flush();
        expect(scope.entries.length).toBe(2);
        scope.deleteEntry('222');
        expect(scope.entries.length).toBe(1);
        expect(scope.entries).toEqualData(
          [{text: 'stood by the watercooler', _id: '333'}]);
    });

    it('should update an entry', function() {
        // Angular sets the 'modified' property, the 'text' property
        // is updated on the backend only
        var entry = {text: 'office fun', _id: '222', modified: 'no'}; 
        var entry2 = {text: 'office fun', _id: '222', modified: 'yes'}; 
        $httpBackend.expectPUT('api/entries', entry).respond(200, entry2);
        scope.updateEntry(entry);
        $httpBackend.flush();
        expect(entry).toEqualData(entry2);
    });

    it('should save categories', function() {
        $httpBackend.expectPOST('api/categories', {text: 'cool'})
        .respond(200, {text: 'cool'});
        scope.addEntryCategory({text: 'cool'});
        $httpBackend.flush();
        expect(scope.categories[scope.categories.length - 1].text).toBe('cool');
        expect(scope.categories[scope.categories.length - 1].$resolved).toBe(true);
        expect(scope.categories.length).toBe(3);
        expect(scope.entryCategories).toEqualData(['cool']);

        $httpBackend.expectPOST('api/categories', {text: 'random'})
        .respond(200, {text: 'random'});
        scope.addEntryCategory({text: 'random'});
        $httpBackend.flush();
        expect(scope.categories[scope.categories.length - 1].text).toBe('random');
        expect(scope.categories[scope.categories.length - 1].$resolved).toBe(true);
        expect(scope.categories.length).toBe(4);
        expect(scope.entryCategories).toEqualData(['cool', 'random']);
    });
  });
});
