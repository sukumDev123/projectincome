'use stict';
(function () {
    'use strict';

    angular
        .module('setting')
        .controller('SettingType', SettingType)

    SettingType.$inject = ['$scope', 'TypeAndSubType','$timeout']
    /** @ngInject */
    function SettingType($scope, TypeAndSubType,$timeout) {

        $scope.types = [];
        TypeAndSubType.getInformation().then(suc => {
            $scope.types = suc;
            set_page(2)
        });
        var set_page = (end) => {
            var start = 0;
            $scope.num_page = $scope.types.slice(start, end);

        }
       
        
        $scope.show_more = () => {

            let g = $scope.num_page.length;
            console.log("+" + g++)
            set_page(g++);
        }
        $scope.type = {};
        $scope.saveType = function () {       
            var g = /[a-zA-zก-ฮ]+/g;
            
            if(g.test($scope.type.subtype)){
            TypeAndSubType.typeUpdate($scope.type).then(suc => {
                $scope.num_page.push(suc);
                $scope.type = {};
            }).catch(err => {
                $scope.err = err.data;
            })
           }else{
               $scope.err ='กรุณาใส่เป็นตัวอักษร';
               $timeout(function(){
                   $scope.err = false;
               },3000)
           }
        };

        set_page(2);

        $scope.deleteType1 = function (id) {

            $scope.num_page.splice(id, 1);

            TypeAndSubType.deleteType(id).then(suc => {
                $scope.sucess = suc.mess;
            }).catch(err => {
                $scope.err = err.data;
            }) 
        }
    }

}());