'use strict'

// Configuring the Products module
angular.module('touristiccontent').run([
  'Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Contenus touristiques',
      state: 'touristiccontent',
      type: 'dropdown'
    })

    Menus.addSubMenuItem('topbar', 'touristiccontent', {
      title: 'Liste des contenus touristiques',
      state: 'touristiccontent.list'
    })

    Menus.addSubMenuItem('topbar', 'touristiccontent', {
      title: 'Import Geotrek API',
      state: 'touristiccontent.import',
      stateParams: { importType: 'geotrek-api', importInstance: '10' }
    })
  }
])
