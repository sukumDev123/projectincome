'use strict';
(function () {
    'use strict';
    angular
        .module('core')
        .controller('HomeController', HomeController)
    HomeController.$inject = ['$scope', '$state', '$filter', 'IncomeService', 'MouthY', 'mySocket', 'TypeAndSubType'];

    function HomeController($scope, $state, $filter, IncomeService, MouthY, mySocket, TypeAndSubType) {
        var DateSet = function (date, detail) {
            return $filter('date')(date, detail);
        }
        $scope.data = [];
        $scope.type = ['รายรับ', 'รายจ่าย', 'เงินออม'];
        $scope.nameuser = 'Sukum';
        $scope.information = {};
        $scope.detail = false;
        $scope.showtype = function () {
            let num = $scope.information.typeof;
            $scope.subtype = [];
            TypeAndSubType.getInformation().then(suc => {
                for(var t = num ; t < suc.length ; t++){
                    if( suc[t].typeMoney == null) break;
                    if($scope.type[num] == suc[t].typeMoney ){
                        $scope.subtype.push(suc[t].subtype)
                    }
                }
            })
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