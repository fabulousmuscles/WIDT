'use strict'
                               
// even though there's currently only 1 controller, still calling
// it by plural, 'controllers'
var widtControllers = angular.module('widtControllers', [])

widtControllers.controller('MainCtrl', ['$scope', 'Entry', 'Category',
    function ($scope, Entry, Category) { 

        //////////* Entries *//////////
        
        // load the page with all entries
        $scope.entries = Entry.query(); 
  
        // method for creating an entry 
        $scope.addEntry = function(newEntry) {  
            if (newEntry) {
                // assign any categories that have been attached to this entry
                newEntry.categories = $scope.entryCategories;
                // assign empty string if no categories,
                // so we can filter in index.html.
                // If we didn't have the empty string, the category would not
                // be redisplayed when choosing a category to filter by, then
                // choose no categories (in index.html filter)
                if (!newEntry.categories.length) {
                    newEntry.categories = "";
                }

                Entry.save(newEntry, function(entry) {
                    // Add the entry to the front of the entries array
                    $scope.entries.unshift(entry)
                    // clear the textarea 
                    $scope.newEntry = ''; 
                    // reset entry categories
                    $scope.entryCategories = [] 
                    // reset select box
                    $scope.selectCategory = null;
                });                
            }
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

        // method for updating an entry
        $scope.updateEntry = function(e) {
            Entry.update(e, function(entry) {
                e.modified = entry.modified;
            });
        }
        //////////* Categories *//////////

        // create an empty array to temporarily hold our entry categories
        $scope.entryCategories = [] 

        // load the page with all 'global' categories
        $scope.categories = Category.query();

        // method for adding an entry category and possibly a 'global' category
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

        // method for deleting an entry category
        $scope.deleteEntryCategory = function(category) {
            for (var i = 0; i < $scope.entryCategories.length; i++) {
                if (category === $scope.entryCategories[i]) {
                    $scope.entryCategories.splice(i, 1);
                }
            }
        }

        // method for deleting a 'global' category
        $scope.deleteCategory = function(id) {
            id && Category.delete({categoryId:id});
            for (var i = 0; i < $scope.categories.length; i++) {
                if (id === $scope.categories[i]._id) {
                    $scope.categories.splice(i, 1);
                }
            }
        };
}]);
