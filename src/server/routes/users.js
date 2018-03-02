module.exports = function(app){

    var users = require('../controllers/users_controllers')
    app.post('/api/users/signin',users.signin)
    app.post('/api/users/signup',users.create)
    
}