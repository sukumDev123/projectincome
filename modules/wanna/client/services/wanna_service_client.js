(function () {
    'use strict';

    angular
        .module('wanna')
        .factory('WannaService', Factory)

    /** @ngInject */
    Factory.$inject = ['$resource']

    function Factory($resource) {


        var wanna = $resource('/wanna/views/:wannaid', {
            wannaid: '@_Id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: true
            },
            add_wanna : {
                method : 'POST'
            }
        })

        angular.extend(wanna, {
            SaveWanna : function(obj){
                return this.add_wanna(obj).$promise;
            },
            ViewAll : function(){
                return this.query({}).$promise;
            }
        });

        return wanna;

    }

}());