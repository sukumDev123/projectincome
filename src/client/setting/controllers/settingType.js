'use stict';
(function () {
    'use strict';

    angular
        .module('setting')
        .controller('SettingType', SettingType)

    SettingType.$inject = ['$scope', 'TypeAndSubType']
    /** @ngInject */
    function SettingType($scope, TypeAndSubType) {
        TypeAndSubType.getInformation().then(suc => console.log(suc))
        $scope.type = {};
        $scope.saveType = function () {
            TypeAndSubType.typeUpdate($scope.type).then(suc => {
               $scope.type = {};
            }).catch(err => {
               $scope.err = err.data;
            })
        }
    }

}());