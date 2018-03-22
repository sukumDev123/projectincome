(function (app) {
    'use strict';

    app.registerModule('setting', ['core']);
    app.registerModule('setting-routes', ['core-routes'])
    app.registerModule('setting-users', ['core', 'users'])
}(ApplicationConfig));