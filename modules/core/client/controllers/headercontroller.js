(function(){
    'use strict';

    angular
        .module('core')
        .controller('HeaderControl', HeaderControl)

    /** @ngInject */
    HeaderControl.$inject = ['$rootScope','$scope','$state','Auth']
    function HeaderControl($rootScope,$scope,$state,Auth){
        $scope.authentication = Auth;
        
       
    }

}());