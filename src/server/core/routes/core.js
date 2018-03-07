

'use strict';
module.exports = function(app){

    const controllers = require('../controllers/corecontroller');
    const policies = require('../policies/core_polict')
    app.get('/',controllers.rander)
    app.get('/api/income/views',policies.isAllowed, controllers.viewsinformation);
    app.get('/api/income/views/:information',controllers.getinfor);
    app.post('/api/income/addinformation',controllers.addinformation);
    app.put('/api/income/editinformation/:information',controllers.editinformation);
    app.delete('/api/income/deleteinformation/:information',controllers.deleteinformation);

    app.param('information',controllers.incomeid)
}