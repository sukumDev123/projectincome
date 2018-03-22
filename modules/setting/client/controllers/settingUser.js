(function(){
    'use strict';

    angular
        .module('setting-users')
        .controller('SettingUser', ControllerCtrl)

        ControllerCtrl.$inject = ['$scope','UserService','Notification','Auth']
    function ControllerCtrl($scope,UserService,Notification,Auth){
        $scope.update = Auth.users;
        $scope.save_Update = (id) =>{
            UserService.userUpdate($scope.update,id).then(suc => {
                $scope.update = suc;
                Notification.success({message
                 : "Update User Success"  ,title : 'Sucess Message'})
            }).catch(er => {
                Notification.error({message
                    :  er.data.message  ,title : 'Error Message'})
              
            })
          
        }
    }
    
}());