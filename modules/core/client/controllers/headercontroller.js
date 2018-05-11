(function () {
    'use strict';

    angular
        .module('core')
        .controller('HeaderControl', HeaderControl)

    /** @ngInject */
    HeaderControl.$inject = ['$rootScope', '$scope', '$state', 'Auth', 'mySocket', 'Notification', '$filter', '$interval']

    function HeaderControl($rootScope, $scope, $state, Auth, mySocket, Notification, $filter, $interval) {
        $scope.authentication = Auth;
        if($scope.authentication.users){
            $scope.show_insertDate = true;
        }else{
            $scope.show_insertDate = false
        }
        $interval(() => {
            $scope.show_time_real_now = $filter('date')(Date.now(), 'hh:mm:ss a')
        }, 1000)
        $scope.show_d = false;
        $scope.showD = (a) => {
   
            if(a == true){
                $scope.show_d = false
                    
            }else{
                $scope.show_d = true
                
            }
        }
        mySocket.on('infor', infor => {
            Notification.success({
                message: 'New Income ' + infor.typeMoney
            });
          
        })

    }

}());