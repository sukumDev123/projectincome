(function(app){
    'use strict';
    app.registerModule('core',['chart.js'])
   
    app.registerModule('core-routes',['ui.router']);
    app.registerModule('dash')
    app.registerModule('dash-routes',['core-routes','ui.router'])
    

}(ApplicationConfig));