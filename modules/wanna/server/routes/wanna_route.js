'use strict';
module.exports = app => {
    const controller = require('../controllers/wanna_controller');
    app.route('/wanna/views').get(controller.views).post(controller.save_add);
    app.route('/wanna/views/:id').put(controller.wanna_put).delete(controller.wanna_delete);
    
    
}