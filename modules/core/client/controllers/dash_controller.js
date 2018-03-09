'use stict';

(function () {
    'use strict';

    angular
        .module('dash')
        .controller('DashBoardController', ControllerCtrl)

    /** @ngInject */
    ControllerCtrl.$inject = ['Auth', '$scope', 'MouthY', 'IncomeService', 'DashGet', 'mySocket','$filter']

    function ControllerCtrl(Auth, $scope, MouthY, IncomeService, DashGet, mySocket,$filter) {
        var DateSet = (date,type)=>{
            return $filter('date')(date,type);
        }
      
        $scope.total = DashGet
        $scope.avenDay = 0; //รายจ่ายเฉลีย ต่อวัน
        var aven = () => {
            let ho = 0;
            let num = 0;
            $scope.total.forEach((ele, k) => {
                //console.log(DateSet(ele.timeCreate,'MM yy') == DateSet(Date.now(),'MM yy'))
                if (ele.typeMoney == 'รายจ่าย') {
                    if (DateSet(ele.timeCreate,'MM yyyy') == DateSet(Date.now(),'MM yyyy')) {
                        ho += ele.moneyInput; //เงินทั่งหมด        
                        num++; //จำนวนในการใช้จ่าย
                    }
                }

            })
            $scope.avenDay = ho / num;
        }
       aven()


    }

}());