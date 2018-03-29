'use strict';
(function () {
    'use strict';

    angular
        .module('core')
        .controller('ViewsIncomeTotal', ViewsIncomeTotal)

    ViewsIncomeTotal.$inject = ['$scope', 'viewsTest', '$filter', 'MouthY', 'IncomeService', '$state', 'mySocket', '$http', 'Auth', 'typeView', '$stateParams', '$location', 'Notification'];
    /** @ngInject */
    function ViewsIncomeTotal($scope, viewsTest, $filter, MouthY, IncomeService, $state, mySocket, $http, Auth, typeView, $stateParams, $location, Notification) {
        if (!mySocket.connect()) {
            mySocket.connect();
        }
        var DateSet = (date, detail) => {
            return $filter('date')(date, detail);
        }
        var select_type = () => {
            $scope.type_save = [];
            $scope.sub_type_save = [];
            let type = typeView;
            let type_count = 0;
            type.forEach((ele, i) => {
                if ($scope.type_save[i - 1] != ele.typeMoney && $scope.sub_type_save[i - 1] != ele.subtype) {
                    $scope.type_save.push({
                        type: ele.typeMoney
                    })
                    $scope.sub_type_save.push(ele.subtype)
                }
            })
        }

        
        select_type();
        $scope.type_push_show = false
        $scope.incomeTotal = viewsTest // status first infor total
        $scope.currentPage = 1;
        $scope.numPerPage = 7;
        $scope.inmoney = 0;
        $scope.delmoney = 0;
        $scope.saveMoney = 0;
        $scope.filteredTodos = []; // for show
        var show_type_boolen = false;
        $scope.showType = () => {

            show_type_boolen = true;
            $scope.view_date($scope.chDate);

        }
        var showType_r = (type, ele) => {
            if (ele.typeMoney == type) {
                $scope.information.push(ele);
                incomeFunc(ele)
                page_show()
            }

        }

        var check_num_page = (num) => {

            $scope.t = [];
            var v = Math.ceil(num / $scope.numPerPage);
            for (var i = 0; i < v; i++) {
                $scope.t[i] = i + 1;
            }
        }
        $scope.changePage = n => {
            $scope.currentPage = n;
            $scope.showPage = n;
            page_show()
        }

        $scope.loads = () => {
            $window.a = true;
            alert($window.a);
        }
        var incomeFunc = (element) => {
            console.log($scope.inmoney)
            if (element.typeMoney == "รายรับ") {
                $scope.inmoney += parseInt(element.moneyInput);
            } else if (element.typeMoney == "รายจ่าย") {
                $scope.delmoney += parseInt(element.moneyInput);
            } else if (element.typeMoney == 'เงินออม') {
                $scope.saveMoney += parseInt(element.moneyInput);
            } else {
                $scope.inmoney = 0;
                $scope.delmoney = 0;
                $scope.saveMoney = 0;
            }
            /*ตรวจสอบรรายจ่าย	ายรับรายจ่าย เพื่อทำการคำนวน หา รายรับรายจ่าย*/
        }
        var page_show = () => {
            var begin = ($scope.currentPage - 1) * $scope.numPerPage,
                end = begin + $scope.numPerPage;
            $scope.filteredTodos = $scope.information.slice(begin, end);
            check_num_page($scope.information.length)
            
        }


        $scope.deleteInFor = (infor, i) => {

            $scope.information.splice(i, 1)
            $scope.incomeTotal.splice(i, 1)
            IncomeService.delete(infor).then(
                suc => {
                    Notification.success({
                        message: suc.mess,
                        delay: 2000
                    })
                    $scope.view_date($scope.chDate)
                    page_show();
                }
            ).catch(err => {

                $scope.error = err;
            })
        }
        $scope.notShow = false;
        $scope.timeS = new Date();
        $scope.view_date = (date) => {
            $scope.t = [];
            $scope.inmoney = 0;
            $scope.delmoney = 0;
            $scope.saveMoney = 0;
            $scope.information = [];
            $scope.chDate = date;
            $scope.incomeTotal.forEach((element, k) => {

                if (date == 'all') {
                    $scope.chDate = 'all';
                    if (show_type_boolen) {
                        showType_r($scope.type_push_show, element);
                    } else {
                        $scope.information.push(element);
                        incomeFunc(element)
                        page_show();
                        $scope.type_push_show = null;
                    }


                } else if (date == 'day') {
                    if (DateSet(element.timeCreate, 'dd MM yyyy') == DateSet($scope.timeS || Date.now(), 'dd MM yyyy')) {
                        $scope.chDate = 'day';

                        if (show_type_boolen) {
                            showType_r($scope.type_push_show, element);
                        } else {
                            $scope.information.push(element);
                            incomeFunc(element)
                            $scope.type_push_show = null;


                        }
                        page_show();

                    }
                } else if (date == 'month') {
                    if (DateSet(element.timeCreate, 'MM yyyy') == DateSet($scope.timeS || Date.now(), 'MM yyyy')) {

                        $scope.chDate = 'month';
                        if (show_type_boolen) {
                            showType_r($scope.type_push_show, element);
                        } else {
                            $scope.information.push(element);
                            incomeFunc(element)
                            page_show();
                            $scope.type_push_show = null;


                        }

                    }
                } else if (date == 'year') {
                    if (DateSet(element.timeCreate, 'yyyy') == DateSet($scope.timeS || Date.now(), 'yyyy')) {
                        $scope.chDate = 'year';
                        if (show_type_boolen) {
                            showType_r($scope.type_push_show, element);
                        } else {
                            $scope.information.push(element);
                            incomeFunc(element)
                            page_show();
                            $scope.type_push_show = null;

                        }

                    }
                }
            })

            if ($scope.information.length == 0) {
                $scope.filteredTodos = [];
            }
            show_type_boolen = false;
            if($scope.type_push_show == null) {
                $scope.sub_type_show = false
            }
        }
        $scope.timeChnge = () => {

            $scope.view_date($scope.chDate)
            page_show()
        }
        $scope.view_date('all')
        page_show();

        mySocket.on('showNew', data => {
            $scope.incomeTotal[$scope.incomeTotal.length] = data // status first infor total
            $scope.view_date($scope.chDate)
            page_show()
        })
    }

}());