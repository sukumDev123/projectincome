'use strict';
(function () {
    'use strict';

    angular
        .module('core')
        .controller('ViewsIncomeTotal', ViewsIncomeTotal)

    ViewsIncomeTotal.$inject = ['$scope', 'viewsTest', '$filter', 'MouthY', 'IncomeService', '$state', 'mySocket', '$http', 'Auth', 'TypeAndSubType'];
    /** @ngInject */
    function ViewsIncomeTotal($scope, viewsTest, $filter, MouthY, IncomeService, $state, mySocket, $http, Auth, TypeAndSubType) {
        $scope.information = [];
        $scope.indexof = 0;
        $scope.authentication = Auth;
        $scope.informationReal = viewsTest;
        $scope.type = ['รายรับ', 'รายจ่าย', 'เงินออม'];
        $scope.inmoney = 0;
        $scope.delmoney = 0;
        $scope.saveMoney = 0;

        var pageNumber = () => {
           $scope.information = $scope.informationReal.splice(0,3)
            /*for (var i = 0; i < max; i++) {
                $scope.information.push( $scope.informationReal[i])

            }*/
        }
        pageNumber();
        var totalMoney = function () {
            const money = $scope.information;
            money.forEach(element => {

                if (element.typeMoney == "รายรับ") {
                    $scope.inmoney += parseInt(element.moneyInput);

                } else if (element.typeMoney == "รายจ่าย") {
                    $scope.delmoney += parseInt(element.moneyInput)
                } else if (element.typeMoney == 'เงินออม') {
                    $scope.saveMoney += parseInt(element.moneyInput)

                }
            });
        }
        TypeAndSubType.getInformation().then(suc => {
            $scope.suc = suc

        });
        const subType = () => {
            $scope.subtype = [];
            var num = $scope.dateForUpdate.typeMoney;

            for (var t = 0; t < $scope.suc.length; t++) {
                if ($scope.suc[t].typeMoney == null) break;
                if (num == $scope.suc[t].typeMoney) {
                    $scope.subtype.push($scope.suc[t].subtype)
                }
            }
        }
        $scope.onChange = () => {
            subType();
        }
        totalMoney();
        $scope.dateFormat = function (date) {
            return DateSet(date, "dd") + ' ' + MouthY.setMountT(DateSet(date, "MM")) + ' ' + MouthY.setYearT(DateSet(date, "yyyy"))
        }
        var DateSet = function (date, detail) {
            return $filter('date')(date, detail);
        }
        $scope.year = function (date) {
            return MouthY.setYearT(DateSet(date, "yyyy"));
        }
        $scope.mouth = function (date) {
            return MouthY.setMountT(DateSet(date, "MM"));

        }
        $scope.day = function (date) {
            return DateSet(date, "dd");
        }

        $scope.deleteInFor = function (infor) {
            IncomeService.delete(infor).then(function (res) {
                $scope.information.splice(infor, 1);
            }).catch(function (err) {
                console.log(err)
            })

        }
        //updateInfor
        $scope.updateInfor = function () {
            console.log(this.indexof)
            $scope.dateForUpdate.iduser = $scope.authentication.users._id;
            IncomeService.updateInfor($scope.dateForUpdate).then(suc => {
                $scope.information[$scope.indexof] = suc;
                $scope.showUpadte = false;
                $scope.indexof = 0;

            }).catch(err => console.log(err))
        }
        $scope.getInfor = function (id, arry) {
            $scope.indexof = arry;
            $scope.showUpadte = true;
            IncomeService.getinfor(id).then(suc => {
                $scope.dateForUpdate = suc;
            });
        }



    }

}());