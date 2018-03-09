(function(){
    'use strict';

    angular
        .module('core')
        .controller('HeaderControl', HeaderControl)

    /** @ngInject */
    HeaderControl.$inject = ['$rootScope','$scope','$state','Auth','mySocket']
    function HeaderControl($rootScope,$scope,$state,Auth,mySocket){
        $scope.authentication = Auth;
        
        mySocket.on('infor',infor => {
            console.log(infor)
            
        })
       
    }

}());