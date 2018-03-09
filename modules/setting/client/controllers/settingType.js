'use stict';
(function () {
    'use strict';

    angular
        .module('setting')
        .controller('SettingType', SettingType)

    SettingType.$inject = ['$scope', 'TypeAndSubType']
    /** @ngInject */
    function SettingType($scope, TypeAndSubType) {

        $scope.types = [];
        TypeAndSubType.getInformation().then(suc => {
            $scope.types = suc;
            set_page(2)
        });
        var set_page = (end) => {
            var start = 0;
             $scope.num_page = $scope.types.slice(start,end);
            
        }
        $scope.show_more = () =>{
           
            let g =  $scope.num_page.length;
            console.log("+" + g++)
            set_page(g++);
        }
        $scope.type = {};
        $scope.saveType = function () {
            TypeAndSubType.typeUpdate($scope.type).then(suc => {
                $scope.types.push(suc);
                $scope.type = {};
            }).catch(err => {
                $scope.err = err.data;
            })
        };
       
        set_page(2);
        
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