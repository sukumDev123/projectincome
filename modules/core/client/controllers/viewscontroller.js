'use strict';
(function () {
    'use strict';

    angular
        .module('core')
        .controller('ViewsIncomeTotal', ViewsIncomeTotal)

    ViewsIncomeTotal.$inject = ['$scope', 'viewsTest', '$filter', 'MouthY', 'IncomeService', '$state', 'mySocket', '$http', 'Auth', 'TypeAndSubType', '$stateParams', '$location'];
    /** @ngInject */
    function ViewsIncomeTotal($scope, viewsTest, $filter, MouthY, IncomeService, $state, mySocket, $http, Auth, TypeAndSubType, $stateParams, $location) {

        var debug = infor => {
            console.log(infor)
        }
        var DateSet = (date, detail) => {
            return $filter('date')(date, detail);
        }
        $scope.filteredTodos = []; // for show
        $scope.incomeTotal = viewsTest // status first infor total
        $scope.currentPage = 1;
        $scope.numPerPage = 7;
        $scope.information = [];
        $scope.notShow = false;
        $scope.type = ['รายรับ', 'รายจ่าย', 'เงินออม'];
        $scope.inmoney = 0;
        $scope.delmoney = 0;
        $scope.saveMoney = 0;
        $scope.timeS = new Date();
        var check_num_page = (num) => {
            $scope.t = [];

            var v = Math.ceil(num / $scope.numPerPage);
            for (var i = 0; i < v; i++) {
                $scope.t[i] = i + 1;
            }
        }
        var incomeFunc = (element) => {
            if (element.typeMoney == "รายรับ") {
                $scope.inmoney += parseInt(element.moneyInput);

            } else if (element.typeMoney == "รายจ่าย") {


                $scope.delmoney += parseInt(element.moneyInput)
            } else if (element.typeMoney == 'เงินออม') {
                $scope.saveMoney += parseInt(element.moneyInput)

            }
            /*ตรวจสอบรายรับรายจ่าย เพื่อทำการคำนวน หา รายรับรายจ่าย*/
        }
        var check_type = (time) => {
            if ($stateParams.type == 'day') {
                $scope.incomeTotal.forEach((element, k) => {
                    if (DateSet(element.timeCreate, 'dd MM yyyy') == DateSet(time, 'dd MM yyyy')) {
                        incomeFunc(element);
                        $scope.information.push(element);
                    }
                });
            } else if ($stateParams.type == 'month') {
                $scope.incomeTotal.forEach((element, k) => {
                    if (DateSet(element.timeCreate, 'MM yyyy') == DateSet(time, 'MM yyyy')) {
                        incomeFunc(element);
                        $scope.information.push(element);

                    }
                });
            } else if ($stateParams.type == 'year') {
                $scope.incomeTotal.forEach((element, k) => {
                    if (DateSet(element.timeCreate, 'yyyy') == DateSet(time, 'yyyy')) {
                        incomeFunc(element);
                        $scope.information.push(element);

                    }
                });
            } else if ($stateParams.type == 'all') {
                $scope.incomeTotal.forEach((element, k) => {
                    if (DateSet(element.timeCreate, 'yyyy') == DateSet(time, 'yyyy')) {
                        incomeFunc(element);

                    }
                });
                $scope.information = $scope.incomeTotal
                $scope.notShow = true;
            } else {
                $location.path('/home/views/table/all')
            }
            check_num_page($scope.information.length);

            page_show();

        }
        var page_show = () => {
            var begin = ($scope.currentPage - 1) * $scope.numPerPage,
                end = begin + $scope.numPerPage;
            $scope.filteredTodos = $scope.information.slice(begin, end);
        }
        $scope.timeChnge = () => {
            $scope.inmoney = 0;
            $scope.delmoney = 0;
            $scope.saveMoney = 0;

            check_type($scope.timeS);

        }

        $scope.changePage = n => {
            $scope.currentPage = n;
            page_show();
            $scope.showPage = n;
        }
        check_type(Date.now());

        mySocket.on('showNew' ,data=>{    
            $scope.filteredTodos.push(data)
                        
        })
    }

}());