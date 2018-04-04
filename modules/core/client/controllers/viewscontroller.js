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
        var filter = (date, detail) => {
            return $filter('date')(date, detail);
        }
        var data_input = viewsTest; // include data for db.;
        let temp_in = [],
            temp_out = [],
            temp_save = [],
            err_i = [];
        var check_type = ele => {
            /** Check type of list from a come in input. .
             * For Keep value 
             * 
             */
            if (ele.typeMoney === 'รายรับ') {
                temp_in.push(ele)
            } else if (ele.typeMoney === 'รายจ่าย') {
                temp_out.push(ele);
            } else if (ele.typeMoney === 'เงินออม') {
                temp_save.push(ele);
            } else {
                err_i.push(ele)
            }
        }
        var showData_date_all = () => {
            temp_in = [];
            temp_out = [];
            temp_save = [];
            err_i = [];
            let temp = {};
            data_input.forEach((ele, index) => {
                check_type(ele)
            })
            return temp = {
                temp_in,
                temp_out,
                temp_save,
                err_i
            };

        }
        var showData_data_fix = (date_type, type) => {
            /** Show Data form date type ex. day , month or year */
            /**
             * date_type = Date input;
             * type = Change ex. dd MM yyyy == day 
             * MM yyyy == month
             * yyyy == year
             */

            temp_in = [];
            temp_out = [];
            temp_save = [];
            err_i = [];
            let temp = {};
            data_input.forEach((ele, i) => {
                if (filter(ele.timeCreate, type) === filter(date_type, type)) {
                    check_type(ele)
                }
            })
            return temp = {
                temp_in,
                temp_out,
                temp_save,
                err_i
            };
        }
        var array_for_show_Html = () => { //** Show All Data. */
            $scope.array_show_on_browser = [];
            $scope.show_data_for_html.temp_in.forEach(ele => $scope.array_show_on_browser.push(ele));
            $scope.show_data_for_html.temp_out.forEach(ele => $scope.array_show_on_browser.push(ele));
            $scope.show_data_for_html.temp_save.forEach(ele => $scope.array_show_on_browser.push(ele))
        }

        $scope.show_date = (type) => {
            /**
             * type == day or month or year
             * for keep value in array for show on browser
             */
            $scope.array_show_on_browser = [];
            $scope.show_data_for_html = {};
            if (type == 'all') {
                $scope.show_data_for_html = showData_date_all();
            } else if (type == 'day') {
                $scope.show_data_for_html = showData_data_fix((($scope.date_input) ? $scope.date_input : Date.now()), 'dd MM yyyy');
            } else if (type == 'month') {
                $scope.show_data_for_html = showData_data_fix((($scope.date_input) ? $scope.date_input : Date.now()), 'MM yyyy');
            } else if (type == 'year') {
                $scope.show_data_for_html = showData_data_fix((($scope.date_input) ? $scope.date_input : Date.now()), 'yyyy');
            }
            $scope.showType = true;
            array_for_show_Html();
            $scope.pageNum();
            if ($scope.array_show_on_browser.length == 0) {
                $scope.showType = false
                console.log('null')
            }
        }

        $scope.type_showF = (type) => {
            $scope.array_show_on_browser = [];
            if (type === 'รายรับ') {
                $scope.show_data_for_html.temp_in.forEach(ele => $scope.array_show_on_browser.push(ele));

            } else if (type === 'รายจ่าย') {
                $scope.show_data_for_html.temp_out.forEach(ele => $scope.array_show_on_browser.push(ele));

            } else if (type === 'เงินออม') {
                $scope.show_data_for_html.temp_save.forEach(ele => $scope.array_show_on_browser.push(ele))
            }
            page_show()
        }
        $scope.deleteInFor = index => {
            /*$scope.array_show_on_browser = $scope.array_show_on_browser.splice($scope.array_show_on_browser.indexOf(index),1);
            console.log(index)*/
        }


        /*************************************************** End show Data 1 */
        $scope.pageNum = () => {
            $scope.currentPage = 1;
            $scope.pageSize = 10;
            page_show();
        }
        $scope.changePage = (n) => {
            let num_input = page_num();

            let num = $scope.t.length;
            if (n > 0 && n <= num) {
                $scope.currentPage = n;
                $scope.pageSize = 10;
                page_show();
                if (num_input > num) {
                    number_show(n + 1);

                }else{
                    number_show($scope.currentPage);
                }
            }

        }
        var page_num = () => {
            return Math.ceil($scope.array_show_on_browser.length / $scope.pageSize)
        }
        var number_show = (n) => {
            let num_input = page_num();
            $scope.t = []
            let num = 0;
            num = (n ? n : 3);
            for (var i = 0; i < num; i++) {
                $scope.t.push(i + 1);
            }



        }
        var page_show = () => {
            number_show(0);
            let begin = ($scope.currentPage - 1) * $scope.pageSize;
            let end = begin + $scope.pageSize;
            $scope.array_show_on_browser_html = $scope.array_show_on_browser.slice(begin, end);
        }



        /**Start  */
        $scope.show_date('all');

        $scope.page_end = page_num();










        mySocket.on('showNew', data => {
            /*$scope.incomeTotal[$scope.incomeTotal.length] = data // status first infor total
            $scope.view_date($scope.chDate)
            page_show()*/
        })
    }

}());