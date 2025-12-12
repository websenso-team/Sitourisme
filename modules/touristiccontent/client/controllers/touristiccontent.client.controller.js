'use strict'

angular.module('touristiccontent').controller('TouristiccontentController', [
  '$scope',
  '$stateParams',
  '$location',
  '$http',
  'Authentication',
  'Touristiccontent',
  function ($scope, $stateParams, $location, $http, Authentication, Touristiccontent) {
    $scope.authentication = Authentication

    $scope.create = function () {
      var touristiccontent = new Touristiccontent({
        title: this.title,
        content: this.content
      })
      touristiccontent.$save(
        function (response) {
          $location.path('touristiccontent/' + response._id)

          $scope.title = ''
          $scope.content = ''
        },
        function (errorResponse) {
          $scope.error = errorResponse.data.message
        }
      )
    }

    $scope.remove = function (touristiccontent) {
      if (touristiccontent) {
        touristiccontent.$remove()

        for (var i in $scope.touristiccontent) {
          if ($scope.touristiccontent[i] === touristiccontent) {
            $scope.touristiccontent.splice(i, 1)
          }
        }
      } else {
        $scope.touristiccontent.$remove(function () {
          $location.path('touristiccontent')
        })
      }
    }

    $scope.update = function () {
      var touristiccontent = $scope.touristiccontent

      touristiccontent.$update(
        function () {
          $location.path('touristiccontent/' + touristiccontent._id)
        },
        function (errorResponse) {
          $scope.error = errorResponse.data.message
        }
      )
    }

    $scope.find = function () {
      $scope.touristiccontent = Touristiccontent.query()
    }

    $scope.findOne = function () {
      $scope.touristiccontent = Touristiccontent.get({
        touristiccontentId: $stateParams.touristiccontentId
      })
    }

    $scope.initElasticsearch = function () {
      $http.get('/api/touristiccontent/initElasticsearch').then(
        function (response) {
          $scope.messages = response.data
        },
        function (response) {
          $scope.messages = response.data
        }
      )
    }

    $scope.reindexeElasticsearch = function () {
      $http.get('/api/reindexation').then(
        function (response) {
          $scope.messages = response.data
        },
        function (response) {
          $scope.messages = response.data
        }
      )
    }

    $scope.import = function () {
      var url = '/api/touristiccontent/import'
      if ($stateParams.importType && $stateParams.importInstance) {
        url += '?type=' + $stateParams.importType + '&instance=' + $stateParams.importInstance
      }
      $http.get(url).then(
        function (response) {
          $scope.messages = response.data
        },
        function (response) {
          $scope.messages = response.data
        }
      )
    }
  }
])
