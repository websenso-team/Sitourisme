'use strict'

const path = require('path'),
    EntityServer = require(path.resolve('./library/modules/server/models/entity.server.model.js')),
    TouristiccontentSchema = require(path.resolve('./modules/touristiccontent/server/models/touristiccontent.schema.js')),
    genericServerController = require(path.resolve('./library/modules/server/controllers/generic.server.controller.js')),
    touristiccontentApi = 'touristiccontent',
    moduleName = 'touristiccontent';
    
let entityServer = null,
    entityModel = null,
    cgt = 'CGT touristiccontent';

exports.init = function() {
    entityServer = new EntityServer('Touristiccontent', TouristiccontentSchema);
    entityModel = entityServer.getModel();
}
     
exports.list = async function (req, res) {
    genericServerController.init(entityModel, touristiccontentApi, moduleName);
    return genericServerController.list(req, res);
}

exports.import = function (req, res) {
    console.log('controller touristiccontent import > entity model = ', entityServer.entity);
    genericServerController.init(entityModel, touristiccontentApi, moduleName, entityServer, cgt);
    return genericServerController.import(req, res);
}