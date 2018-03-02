module.exports = {
    title: "Project Income2 ",
    files: {
        routes: [
            'src/server/core/routes/core',
            'src/server/setting/routes/setting',
            'src/server/users/routes/users'
            
        ],
        models: ['./src/server/core/models/coremodel', './src/server/setting/models/type','./src/server/users/models/users_model']
    },

}