(function(window){
    'use strict';

   var core = "core";
   angular.module(core,['ui.router'])

   angular.element(document).ready(function(){
    angular.bootstrap(document.querySelector('#core'),[core],{
           strictDi: true
       });
   });

}(window));