'use strict';
(function () {
    'use strict';

    angular
        .module('core')
        .controller('ViewsIncomeTotal', ViewsIncomeTotal)

    ViewsIncomeTotal.$inject = ['$scope', 'viewsTest', '$filter', 'MouthY','IncomeService','$state','mySocket'];
    /** @ngInject */
    function ViewsIncomeTotal($scope, viewsTest, $filter, MouthY,IncomeService,$state,mySocket) {
       
        $scope.information = viewsTest;
        $scope.inmoney = 0;
        $scope.delmoney = 0;
        $scope.saveMoney = 0;
        var totalMoney = function () {
            const money = $scope.information;
            money.forEach(element => {
              
                if (element.typeMoney === "รายรับ") {
                    $scope.inmoney += parseInt(element.moneyInput);
                    console.log("moneyInput")
                } else if (element.typeMoney == "รายจ่าย") {
                    $scope.delmoney += parseInt(element.moneyInput)
                    console.log("moneyInput2")
                    
                } else if (element.typeMoney == 'ออมเงิน') {
                    $scope.saveMoney += parseInt(element.moneyInput)

                }
                

            });
        }
        totalMoney();

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
            console.log(infor)
            IncomeService.delete(infor).then(function(res){
                $state.go('home.views')
            }).catch(function(err){
                console.log(err)
            })
        
        }
        $scope.editInfor = function (infor) {
            console.log(infor)
        }




    }

}());