

'use strict';
module.exports = function(app){

    const controllers = require('../controllers/corecontroller');
    const policies = require('../policies/core_polict')
    app.get('/',controllers.rander)
    app.route('/api/income/views')
    .get(policies.isAllowed, controllers.viewsinformation)
    .post(policies.isAllowed, controllers.addinformation)
    app.route('/api/income/views/:information')
        .get(policies.isAllowed,controllers.getinfor)
        .put(policies.isAllowed,controllers.editinformation)
        .delete(policies.isAllowed,controllers.deleteinformation)
  

    app.param('information',controllers.incomeid)
}