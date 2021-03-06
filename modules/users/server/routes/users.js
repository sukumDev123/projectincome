module.exports = function(app){
    
    const users = require('../controllers/users_controllers')
    app.post('/api/users/signin',users.signin)
    app.post('/api/users/signup',users.create)
    app.get('/api/users/logout',users.logout)

    app.route('/api/users/:userId').put(users.updateData);
  
   // app.param('userId',users.getId);
}