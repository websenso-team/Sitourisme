'use strict'

//Events service used for communicating with the touristiccontent REST endpoints
angular.module('touristiccontent').factory('Touristiccontent', [
  '$resource',
  function ($resource) {
    return $resource(
      'api/touristiccontent/:touristiccontentId',
      {
        touristiccontentId: '@_id'
      },
      {
        update: {
          method: 'PUT'
        }
      }
    );
  }
]);
