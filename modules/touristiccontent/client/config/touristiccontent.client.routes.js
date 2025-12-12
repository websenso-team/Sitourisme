'use strict'

// Setting up route
angular.module('touristiccontent').config([
  '$stateProvider',
  function ($stateProvider) {
    // Products state routing
    $stateProvider
      .state('touristiccontent', {
        abstract: true,
        url: '/touristiccontent',
        template: '<ui-view/>'
      })
      .state('touristiccontent.list', {
        url: '',
        templateUrl: 'modules/touristiccontent/views/list-touristiccontent.client.view.html'
      })
      .state('touristiccontent.import', {
        url: '/import/:importType/:importInstance/',
        templateUrl: 'modules/touristiccontent/views/import-touristiccontent.client.view.html'
      })
  }
])
