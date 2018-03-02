'use stict';
module.exports = function(app){
    const controllers = require('../controllers/typesetting')
    app.route('/api/setting/type/:typeId')
        .get(controllers.listType)
        .delete(controllers.deleteType)
        .put(controllers.updateType);
    app.route('/api/setting/type')
        .post(controllers.saveType)
        .get(controllers.getType)
        

    app.param('typeId',controllers.typeId)
}