'use strict'
                               
var widtControllers = angular.module('widtControllers', [])

widtControllers.controller('mainCtrl', ['$scope', 'Entry', 'Category',
    function ($scope, Entry, Category) { 

        //////////* Entries *//////////
        
        // load the page with all entries
        $scope.entries = Entry.query(); 
  
        // method for creating an entry 
        $scope.addEntry = function() {  
            // assign any categories that have been attached to this entry
            $scope.newEntry.categories = $scope.entryCategories;
            Entry.save($scope.newEntry, function(entry) {
                // Add the entry to the front of the entries array
                $scope.entries.unshift(entry)
                // clear the textarea 
                $scope.newEntry = ''; 
                // reset entry categories
                $scope.entryCategories = [] 
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


        //////////* Global Categories *//////////
        // These are categories that exist outside of entries
        
        $scope.categories = Category.query();

        $scope.deleteCategory = function(id) {
            Category.delete({categoryId:id});
            for (var i = 0; i < $scope.categories.length; i++) {
                if (id === $scope.categories[i]._id) {
                    $scope.categories.splice(i, 1);
                }
            }
        };


        //////////* Entry Categories *//////////
        // These are categories that exist as part of an entry

        $scope.entryCategories = [] 

        $scope.addEntryCategory = function(category) {
            if (category) {
                // If the category hasn't already been added as an entry
                // category, add it
                if ($scope.entryCategories.indexOf(category.text) < 0) {
                    $scope.entryCategories.push(category.text);
                }

                if ($scope.categories.length) {
                    // Has the entry category been registered as a 'global'
                    // category yet? Let's find out
                    var count = 0;
                    angular.forEach($scope.categories, function(value) {
                        if (category.text === value.text)
                            count++;
                    });
                    if (!count) {
                        // if there's no count, this category hasn't been
                        // added to the 'global' categories, so add it
                        Category.save(category, function(c) {
                            $scope.categories.push(c);
                            category.text = '';
                        });
                    }
                } else {
                    // If we're here, then there must not be any categories yet
                    Category.save(category, function(c) {
                        $scope.categories.push(c);
                        category.text = '';
                    });
                }
            }
        }

        $scope.deleteEntryCategory = function(category) {
            for (var i = 0; i < $scope.entryCategories.length; i++) {
                if (category === $scope.entryCategories[i]) {
                    $scope.entryCategories.splice(i, 1);
                }
            }
        }
}]);
