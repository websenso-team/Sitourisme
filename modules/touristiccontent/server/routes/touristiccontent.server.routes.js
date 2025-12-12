'use strict'

var touristiccontentPolicy = require('../policies/touristiccontent.server.policy'),
  touristiccontent = require('../controllers/touristiccontent.server.controller')

module.exports = function (app) {
  touristiccontent.init();
  app.route('/api/touristiccontent').all(touristiccontentPolicy.isAllowed).get(touristiccontent.list)

  app
    .route('/api/touristiccontent/import')
    .all(touristiccontentPolicy.isAllowed)
    .get(touristiccontent.import)
}
