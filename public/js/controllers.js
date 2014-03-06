'use strict'
                               
var widtControllers = angular.module('widtControllers', [])

widtControllers.controller('entryCtrl', ['$scope', 'Entry',
    function ($scope, Entry) { 
        // load the page with all entries
        $scope.entries = Entry.query(); 
  
        // method for creating an entry 
        $scope.addEntry = function() {  
            Entry.save($scope.newEntry, function(entry) {
                // Add the entry to the front of the entries array
                $scope.entries.unshift(entry);  
                // clear the textarea           
                $scope.newEntry = '';           
            });                
        }
  
        // method for deleting an entry 
        $scope.deleteEntry = function(id) {
            Entry.delete({entryId:id});     
            // delete the entry from $scope.entries so that the page updates
            for (var i = 0; i < $scope.entries.length; i++) { 
                if (id === $scope.entries[i]._id) {
                    $scope.entries.splice(i, 1);    
                }
            }
        };

}]);

// This controller is almost the same as the one above, except this one
// is for categories.
widtControllers.controller('categoryCtrl', ['$scope', 'Category',
    function ($scope, Category) {   

        $scope.categories = Category.query();

        $scope.addCategory = function(newCat) {
                Category.save(newCat, function(category) {
                $scope.categories.push(category);
                $scope.newCategory = '';
            });
        }

        $scope.deleteCategory = function(id) {
            Category.delete({categoryId:id});
            for (var i = 0; i < $scope.categories.length; i++) {
                if (id === $scope.categories[i]._id) {
                    $scope.categories.splice(i, 1);
                }
            }
        };
}]);
