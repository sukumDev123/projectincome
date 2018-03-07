'use strict';
module.exports = app => {
    const adminPolicies = require('../policies/user_policies')
    const adminController = require('../controllers/admin_controller')
    app.get('/api/admin/views',adminPolicies.isAllowed ,adminController.viewUsers)





    app.param('userId',adminController.userId);
}