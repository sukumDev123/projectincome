'use strict';
(function () {
    'use strict';

    angular
        .module('core')
        .controller('ViewsIncomeTotal', ViewsIncomeTotal)

    ViewsIncomeTotal.$inject = ['$scope', 'viewsTest', '$filter', 'MouthY', 'IncomeService', '$state', 'mySocket', 'Auth', 'typeView', '$stateParams', '$location', 'Notification', 'Numpage', 'CalService'];
    /** @ngInject */
    function ViewsIncomeTotal($scope, viewsTest, $filter, MouthY, IncomeService, $state, mySocket, Auth, typeView, $stateParams, $location, Notification, Numpage, CalService) {
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
            $scope.page_end = Numpage.page_size();
            console.log(CalService.out_($scope.show_data_for_html.temp_out))

        }

        $scope.type_showF = (type) => {
            $scope.array_show_on_browser = []; /** main value data temp */
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
            $scope.array_show_on_browser_html = [];
            Numpage.size = 8;
            Numpage.total = $scope.array_show_on_browser.length;
            $scope.currentPage = 1;
            $scope.tl = Numpage.number_show(0);
            $scope.array_show_on_browser_html = Numpage.now_show_data(1, $scope.array_show_on_browser)

        }
        $scope.changePage = (n) => {

            console.log(n)
            $scope.tl = [];
            let num = Numpage.page_size();
            if (n > 0 && n <= num) {
                $scope.array_show_on_browser_html = [];
                $scope.array_show_on_browser_html = Numpage.now_show_data(n, $scope.array_show_on_browser)
                $scope.tl = Numpage.number_show(n);
                $scope.currentPage = n;
            } else {
                $scope.tl = Numpage.number_show($scope.currentPage);

            }
        }

        /**Start  */
        $scope.show_date('all');
        // console.log(Numpage.fn())

        mySocket.on('showNew', data => {
            /*$scope.incomeTotal[$scope.incomeTotal.length] = data // status first infor total
            $scope.view_date($scope.chDate)
            page_show()*/
        })
    }

}());