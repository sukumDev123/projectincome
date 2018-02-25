'use strict';
(function () {
    'use strict';

    angular
        .module('core')
        .controller('HomeController', HomeController)

    HomeController.$inject = ['$scope', '$state','$filter'];

   
    function HomeController($scope, $state,$filter) {
        var setYearT = function(year){
            return parseInt(year) + 543;
        }
        var setMountT = function(mouth){
            var mountT = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
            return mountT[mouth-1];
        }
        var DateSet = function (date,detail){
            return $filter('date')(date, detail);
        }
        $scope.data = [];
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
            console.log($scope.information)
            $scope.savea = true;
            $scope.information.date = {
                day: DateSet(Date.now(),"dd"),
                mouth:setMountT(DateSet(Date.now(),"M")),
                year:setYearT(DateSet(Date.now(),'yyyy'))
            }
          
        
            $scope.data.push($scope.information);
            console.log($scope.data)
            $scope.information = {};
            $scope.skipp = false;
            
        };
    };

}());