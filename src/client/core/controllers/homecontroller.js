'use strict';
(function () {
    'use strict';
    angular
        .module('core')
        .controller('HomeController', HomeController)
    HomeController.$inject = ['$scope', '$state', '$filter', 'IncomeService', 'MouthY', 'mySocket', 'TypeAndSubType','Auth'];

    function HomeController($scope, $state, $filter, IncomeService, MouthY, mySocket, TypeAndSubType,Auth) {
        var DateSet = function (date, detail) {
            return $filter('date')(date, detail);
        }
        $scope.suc = [];
        TypeAndSubType.getInformation().then(suc => {
            $scope.suc = suc
        });
        $scope.data = [];
        $scope.type = ['รายรับ', 'รายจ่าย', 'เงินออม'];
        $scope.nameuser = Auth;
        console.log($scope.nameuser)
        $scope.information = {};
        $scope.detail = false;
        $scope.showtype = function () {      
            $scope.subtype = [];
            var t0 = performance.now();
            for(var t = 0 ; t < $scope.suc.length ; t++){
                if( $scope.suc[t].typeMoney == null) break;
                if($scope.type[num] == $scope.suc[t].typeMoney ){
                    $scope.subtype.push($scope.suc[t].subtype)
                }
            }
        }
        $scope.skip = function () {
            console.log($scope.information)
            if ($scope.information.money != (null && "") && $scope.information.typeof != null && ($scope.information.subtype != null)) {
                $scope.skipp = true;
            }
        }
        $scope.save = function () {
            $scope.savea = true;
            $scope.information.date = {
                day: DateSet(Date.now(), "dd"),
                mouth: MouthY.setMountT(DateSet(Date.now(), "M")),
                year: MouthY.setYearT(DateSet(Date.now(), 'yyyy'))
            }
            $scope.information.typeof = $scope.type[$scope.information.typeof];
            $scope.information.subtype = $scope.subtype[$scope.information.subtype];
            IncomeService.saveInfor($scope.information).then(onSucess).catch(onError);
        };

        function onSucess(res) {
            $scope.data.push($scope.information)
            $scope.information = {};
            $scope.skipp = false;
            $scope.subtype = false;
        }

        function onError(err) {
            console.log(err);
        }

    };

}());