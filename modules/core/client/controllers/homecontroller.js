'use strict';
(function () {
    'use strict';
    angular
        .module('core')
        .controller('HomeController', HomeController)
    HomeController.$inject = ['$scope', '$state', '$filter', 'IncomeService', 'MouthY', 'mySocket','Auth','Notification','typeView'];

    function HomeController($scope, $state, $filter, IncomeService, MouthY, mySocket,Auth,Notification,typeView) {
        if(!mySocket.connect()){
            mySocket.connect();
        }
        
        let match = false;
        let first = "234"
        let chenck = /[0-9]+/ //[ก-๙a-zA-z]+\D/;
        $scope.authentication = Auth
        $scope.subtype = false
        var DateSet = function (date, detail) {
            return $filter('date')(date, detail);
        }
        $scope.suc = [];  
        $scope.suc = typeView;
        $scope.data = [];
        $scope.type = ['รายรับ', 'รายจ่าย', 'เงินออม'];
        $scope.nameuser = Auth;
        $scope.skipp = false;
        $scope.information = {};
        $scope.detail = false;
        $scope.type_ready = true;
    
        if($scope.suc.length > 0){
            $scope.type_ready = false;
        }


        $scope.jj = true
        $scope.showtype = function () {      
            $scope.subtype = [];
            var num = $scope.information.typeof;
            for(var t = 0 ; t < $scope.suc.length ; t++){
                if( $scope.suc[t].typeMoney == null) break;
                if($scope.type[num] == $scope.suc[t].typeMoney ){
                    $scope.subtype.push($scope.suc[t].subtype)
                }
            }
        }
        $scope.skip = function () {
            
            if ($scope.information.money != (null && "") && $scope.information.typeof != null && ($scope.information.subtype != null)) {
                $scope.skipp = true;
            }
        }
        $scope.keypass = () => {
            mySocket.emit('types',$scope.information.money)
        }
        $scope.save = function () {
            
           if(chenck.test($scope.information.money)){
            $scope.savea = true;
            $scope.information.date = {
                day: DateSet(Date.now(), "dd"),
                mouth: MouthY.setMonthT(DateSet(Date.now(), "M")),
                year: MouthY.setYearT(DateSet(Date.now(), 'yyyy'))
            }
            $scope.information.typeof = $scope.type[$scope.information.typeof];
            $scope.information.subtype = $scope.subtype[$scope.information.subtype];
            $scope.information.iduser = $scope.authentication.users._id;

            IncomeService.saveInfor($scope.information).then(onSucess).catch(onError);
           }else{
               alert('จำนวนเงินไม่สามารถเป็นตัวอักษรได้');
               $scope.information = {};
               $scope.skipp = false;
               $scope.subtype = false;
           }
        };

        function onSucess(res) {
            mySocket.emit('InputNew',res);        
            Notification.success({ message: 'Save ' + res.typeMoney + ' เรียบร้อย' });
            $scope.information = {};
            $scope.skipp = false;
            $scope.subtype = false;
        }
    
        function onError(err) {
            Notification.error({ message:  err.data , title : 'Error ' });
        }

    };

}());