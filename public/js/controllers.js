'use strict'
                               
var widtControllers = angular.module('widtControllers', [])

widtControllers.controller('mainCtrl', ['$scope', 'Entry', 'Category',
    function ($scope, Entry, Category) { 

        ///////////////////////////////
        //////////* Entries *//////////
        ///////////////////////////////
        
        $scope.newEntry = { text: "", categories: [] }

        // load the page with all entries
        $scope.entries = Entry.query(); 
  
        // method for creating an entry 
        $scope.addEntry = function() {  
            $scope.newEntry.categories = $scope.entryCategories.slice(0);
            console.log($scope.newEntry);
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


        /////////////////////////////////////////
        //////////* Global Categories *//////////
        /////////////////////////////////////////
        // These are categories that exist outside of entries
        
        $scope.newCategory = {
            text: ""
        };

        $scope.categories = Category.query();

        $scope.addCategory = function() {
            Category.save($scope.newCategory, function(category) {
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


        ////////////////////////////////////////
        //////////* Entry Categories *//////////
        ////////////////////////////////////////
        // These are categories that exist as part of an entry

        $scope.entryCategories = [] 
        $scope.newEntryCategory = { text: "" };

        $scope.addEntryCategory = function() {
            // If the category hasn't already been added, add it
            if ($scope.entryCategories.indexOf($scope.newEntryCategory.text) < 0) {
                $scope.entryCategories.push($scope.newEntryCategory.text);
                $scope.newEntryCategory.text = '';
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
