(function () {
    'use strict'
    angular.module('wanna').controller('WannaController', WannaController);
    WannaController.$inject = ['$scope','WannaService','Notification'];

    function WannaController($scope,WannaService,Notification) {
        /** ------------------------------- save */
        WannaService.ViewAll().then(suc => console.log(suc)).catch(err => console.log(err))
       











        /** For wnann html */
        $scope.saveWanna = ()=> {
            if(($scope.wanna.product_name && $scope.wanna.price_product)  || ($scope.wanna.product_name != null && $scope.wanna.price_product != null ) ) {
                WannaService.SaveWanna($scope.wanna).then(suc => {
                    console.log(suc)
                    Notification.success({message : suc.message})
                    $scope.wanna = [];
                }).catch(err => {
                    Notification.error({message : err})
                    $scope.wanna = [];
                    
                })
            }else{
                Notification({message : "กรุณาใส่ให้ครบทุกช่อง"})
                $scope.wanna = [];                
            }
        }



    }
})();