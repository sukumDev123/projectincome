const config = require( "../default/backend_path");

'use strict';
module.exports = function(app){

    const controllers = require('../controllers/core/corecontroller');

    app.get('/',controllers.rander)
    app.get('/api/income/views', controllers.viewsinformation);
    app.get('/api/income/views/:information',controllers.getinfor);
    app.post('/api/income/addinformation',controllers.addinformation);
    app.put('/api/income/editinformation/:information',controllers.editinformation);
    app.delete('/api/income/deleteinformation/:information',controllers.deleteinformation);

    app.param('information',controllers.incomeid)
}