'use strict';
(function () {
    'use strict';
    angular
        .module('core')
        .controller('HomeController', HomeController)
    HomeController.$inject = ['$scope', '$state','$filter','IncomeService','MouthY','mySocket']; 
    function HomeController($scope, $state,$filter,IncomeService,MouthY,mySocket) {
        var DateSet = function (date,detail){
            return $filter('date')(date, detail);
        }
        $scope.data = [];
        var dataSocket = {};
        $scope.type = ["รายรับ", "รายจ่าย", "ออมเงิน"];
        $scope.nameuser = 'Sukum';
        $scope.information = {};
        $scope.detail = false;
        $scope.showtype = function () {
            if ($scope.information.typeof == 0)
                $scope.subtype = ['เงินเดือน', 'พ่อให้'];
            else if ($scope.information.typeof == 1)
                $scope.subtype = ['อาหาร', 'เดินทาง'];
            else
                $scope.subtype = ['ออมเงิน'];

        }
        $scope.skip = function(){
            if($scope.information.money != (null && "") && $scope.information.typeof != null && ( $scope.information.subtype != null) ){
                $scope.skipp = true;
            }
        } 
        $scope.save = function(){
            
         
            $scope.savea = true;
            $scope.information.date = {
                day: DateSet(Date.now(),"dd"),
                mouth:MouthY.setMountT(DateSet(Date.now(),"M")),
                year:MouthY.setYearT(DateSet(Date.now(),'yyyy'))
            }
            $scope.information.typeof = $scope.type[$scope.information.typeof];
            $scope.information.subtype = $scope.subtype[$scope.information.subtype];  
            
            
            IncomeService.saveInfor($scope.information).then(onSucess).catch(onError);      
        };
       
        function onSucess(res){     
            $scope.data.push($scope.information)
            $scope.information = {};
            $scope.skipp = false;
            $scope.subtype = false;
        }
        function onError(err){
                console.log(err);
        }
       
    };

}());