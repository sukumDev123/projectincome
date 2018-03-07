'use stict';
(function () {
    'use strict';

    angular
        .module('setting')
        .controller('SettingType', SettingType)

    SettingType.$inject = ['$scope', 'TypeAndSubType']
    /** @ngInject */
    function SettingType($scope, TypeAndSubType) {
        TypeAndSubType.getInformation().then(suc => {
            $scope.types = suc;
        });
        $scope.type = {};
        $scope.saveType = function () {
            TypeAndSubType.typeUpdate($scope.type).then(suc => {
                $scope.types.push(suc);
                $scope.type = {};
            }).catch(err => {
                $scope.err = err.data;
            })
        };
        $scope.deleteType1 = function(id){
            TypeAndSubType.deleteType(id).then(suc =>{
                $scope.types.splice(id,1);
                $scope.sucess = suc.mess;
            }).catch(err => {
                $scope.err = err.data;
            })
        }
    }

}());