'use stict';
(function () {
    'use strict';

    angular
        .module('setting')
        .factory('TypeAndSubType', TypeAndSubType)

    TypeAndSubType.$inject = ['$resource']
    /** @ngInject */
    function TypeAndSubType($resource) {

        var Type = $resource('/api/setting/type/:typeId', {
            typeId: "@id"
            
        }, {
            query:{
                method:'GET',
                isArray:true
            },
            update: {
                method: 'PUT'
            },
            saveType :{
                method:"POST"
            },
            deleteTypeL:{
                method:"DELETE"
            }
        });

        angular.extend(Type, {
            typeUpdate : function(obj){
                return this.saveType(obj).$promise;
            },
            getInformation: function(){
                return this.query({}).$promise;
            },
            deleteType:function(id){
                return this.deleteTypeL({typeId:id}).$promise;
            },
            updateInfor:function(id){
                return this.update({typeId:id},{typeId:id}).$promise;
            }


        });
        return Type;
    }

}());