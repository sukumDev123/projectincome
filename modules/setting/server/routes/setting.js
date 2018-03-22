'use stict';
module.exports = function (app) {
    const controllers = require('../controllers/typesetting')
    app.route('/api/setting/type/:typeId')
        .delete(controllers.deleteType);

    app.route('/api/setting/type')
        .post(controllers.saveType)
        .get(controllers.getType)


    app.param('typeId', controllers.typeId)
}