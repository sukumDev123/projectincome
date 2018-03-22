'use stict';

(function () {
    'use strict';

    angular
        .module('dash')
        .controller('DashBoardController', ControllerCtrl)

    /** @ngInject */
    ControllerCtrl.$inject = ['Auth', '$scope', 'MouthY', 'IncomeService', 'viewsTest', 'mySocket', '$filter', '$window']

    function ControllerCtrl(Auth, $scope, MouthY, IncomeService, viewsTest, mySocket, $filter, $window) {
        var DateSet = (date, type) => {
            return $filter('date')(date, type);
        }
        if(!mySocket.connect()){
            mySocket.connect();
        }
        $scope.showInfor = [{
            name : 'บ้าน',
            price : '500000'
        },{
            name : 'คอมใหม่',
            price : '20000'
        }]
        $scope.eyeDo = {
            month : MouthY.setMonthT(DateSet(Date.now(),'MM')),
            year : MouthY.setYearT(DateSet(Date.now(),'yyyy'))
        }
        $scope.data = [];
        $scope.show = {};
        $scope.total = viewsTest;
        var aven = () => {
            $scope.show = {};
            let ho = 0;
            let num = 0;
            let numdate = [];
            let comein = 0;
            let numcomein = 0;
            let savemoney = 0;
            let numsaveM = 0;
            $scope.total.forEach((ele, k) => {
                if (ele.typeMoney == 'รายจ่าย') {
                    if (DateSet(ele.timeCreate, 'MM yyyy') == DateSet(Date.now(), 'MM yyyy')) {
                        ho += ele.moneyInput; //เงินทั่งหมด     
                        num++; //จำนวนในการใช้จ่าย
                        numdate.push(DateSet(ele.timeCreate, 'dd MM yyyy'))
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
            let arr = [];
            let v = 0;
            for (let a = 0; v = numdate.length, a < v; a++) {
                if (numdate[a - 1] != numdate[a]) {
                    arr.push(numdate[a])
                }
            }
            let numdatearr = arr.length;
            $scope.show = {
                avenDay: ho / numdatearr || 0,
                numI: numdatearr,
                totalComein: comein,
                numCome: numcomein,
                pay: ho,
                savemoney: savemoney,
                numsaveM: numsaveM
            }
            $scope.show.beyond = $scope.show.totalComein - ho;
            $scope.show.numB = numcomein + num
            $scope.dash_Big = $scope.show.avenDay;
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
       // $scope.showInfor = $scope.total.slice(0, 5)

        $scope.showTitle = 'เงินเฉลียต่อวัน';

        mySocket.on('showNew', data => {
            if($scope.total[$scope.total.length-1] != data){
                $scope.total.push(data);
                aven()
                $scope.dash_Big = $scope.show.avenDay;
                $scope.showTitle = 'เงินเฉลียต่อวัน';
            }
            //
        })
        
        /**Canvas */
    }

}());