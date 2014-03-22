'use strict'

angular.module('widtComponents', [])

  .directive('searchText', function() {
      return {
          restrict: 'E',
          transclude: true,
          scope: { search: '=myModel' },
          template:
              '<div class="form-group col-md-3 col-md-offset-7">' +
                  '<div class="input-group input-group-sm">' +
                      '<input class="form-control" ng-model="search">' +
                      '<span class="input-group-addon">' +
                          '<span class="glyphicon glyphicon-search"></span>' +
                      '</span>' +
                  '</div>' +
              '</div>',
          replace: true
      };
  });
