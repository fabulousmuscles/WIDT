'use strict'
                               
var widtServices = angular.module('widtServices', ['ngResource']);

widtServices.factory('Entry', ['$resource',
  function($resource){         
    return $resource('api/entries/:entryId', {entryId: '@id'}, {
    });
  }
]);
      
      
widtServices.factory('Category', ['$resource',
  function($resource){
    return $resource('api/categories/:categoryId', {categoryId: '@id'}, {
    });
  }
]);
