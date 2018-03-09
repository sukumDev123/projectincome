'use stict';

(function () {
    'use strict';

    angular
        .module('dash')
        .controller('DashBoardController', ControllerCtrl)

    /** @ngInject */
    ControllerCtrl.$inject = ['Auth', '$scope', 'MouthY', 'IncomeService', 'DashGet', 'mySocket', '$filter']

    function ControllerCtrl(Auth, $scope, MouthY, IncomeService, DashGet, mySocket, $filter) {
        var DateSet = (date, type) => {
            return $filter('date')(date, type);
        }
        $scope.data = [];
        $scope.show = {};
        $scope.total = DashGet
        $scope.avenDay = 0; //รายจ่ายเฉลีย ต่อวัน
        var aven = () => {
            let ho = 0;
            let num = 0;
            let comein = 0;
            let numcomein = 0;
            let savemoney = 0;
            let numsaveM = 0;
            $scope.total.forEach((ele, k) => {
                //console.log(DateSet(ele.timeCreate,'MM yy') == DateSet(Date.now(),'MM yy'))
                if (ele.typeMoney == 'รายจ่าย') {
                    if (DateSet(ele.timeCreate, 'MM yyyy') == DateSet(Date.now(), 'MM yyyy')) {
                        ho += ele.moneyInput; //เงินทั่งหมด     
                        num++; //จำนวนในการใช้จ่าย
                    }
                } else if (ele.typeMoney == 'รายรับ') {
                    if (DateSet(ele.timeCreate, 'MM yyyy') == DateSet(Date.now(), 'MM yyyy')) {
                        comein += ele.moneyInput; //เงินทั่งหมด        
                        numcomein++; //จำนวนในการใช้จ่าย
                    }
                } else if (ele.typeMoney == 'เงินออม') {

                    if (DateSet(ele.timeCreate, 'MM yyyy') == DateSet(Date.now(), 'MM yyyy')) {
                        savemoney += ele.moneyInput; //เงินทั่งหมด        
                        numsaveM++; //จำนวนในการใช้จ่าย
                    }
                }

            })

            $scope.show = {
                avenDay: ho / num,
                numI: num,
                totalComein: comein,
                numCome: numcomein,
                pay: ho,
                savemoney: savemoney,
                numsaveM: numsaveM
            }
            $scope.show.beyond = $scope.show.totalComein - ho,
                $scope.show.numB = numcomein + num

        }
        aven()

        $scope.totalShow = false;
        $scope.typeShow = type => {
            if (type == 'aven') {
                $scope.dash_Big = $scope.show.avenDay;
                $scope.showTitle = 'เงินเฉลียต่อวัน';


            } else if (type == 'beyond') {
                $scope.dash_Big = $scope.show.beyond;
                $scope.showTitle = 'เงินคงเหลือ';


            } else if (type == 'pay') {
                $scope.dash_Big = $scope.show.pay;

                $scope.showTitle = 'รายจ่าย';
                
            } else if (type == 'totalComein') {
                $scope.dash_Big = $scope.show.totalComein;
                $scope.showTitle = 'รายรับ';


            }
        }

        $scope.colors = ['', '#fc4b4b'];

        $scope.labels = ["รายรับ", "รายจ่าย", "การออม"];
        console.log($scope.show.numsaveM)
        $scope.data = [$scope.show.numI, $scope.show.numB, $scope.show.numsaveM];




        $scope.datasetOverride = [{
                label: "Bar chart",
                borderWidth: 1,
                type: 'bar'
            },
            {
                label: "Line chart",
                borderWidth: 3,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                type: 'line'
            }
        ];
        console.log($scope.chartData)
        $scope.showInfor = $scope.total.slice(0, 5);
        $scope.dash_Big = $scope.show.avenDay;
        $scope.showTitle = 'เงินเฉลียต่อวัน';
    }

}());