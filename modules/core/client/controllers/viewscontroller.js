'use strict';
(function () {
    'use strict';

    angular
        .module('core')
        .controller('ViewsIncomeTotal', ViewsIncomeTotal)

    ViewsIncomeTotal.$inject = ['$scope', '$filter', 'MouthY', 'IncomeService', '$state', 'mySocket', 'Auth', 'typeView', '$stateParams', '$location', 'Notification', 'Numpage', 'CalService', 'DataShowFile', 'viewsTest'];
    /** @ngInject */
    function ViewsIncomeTotal($scope, $filter, MouthY, IncomeService, $state, mySocket, Auth, typeView, $stateParams, $location, Notification, Numpage, CalService, DataShowFile, viewsTest) {
        if (!mySocket.connect()) {
            mySocket.connect();
        }
        var filter = (date, detail) => {
            return $filter('date')(date, detail);
        }
        DataShowFile.viewsTest = viewsTest; //insert data -> factory DataShowFile


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
                $scope.show_data_for_html = DataShowFile.showDataAll(); /** ข้อมูลทั่งหมด */
            } else if (type == 'day') {
                $scope.show_data_for_html = DataShowFile.showDataNeed((($scope.date_input) ? $scope.date_input : Date.now()), 'dd MM yyyy');

            } else if (type == 'month') {
                $scope.show_data_for_html = DataShowFile.showDataNeed((($scope.date_input) ? $scope.date_input : Date.now()), 'MM yyyy');

            } else if (type == 'year') {
                $scope.show_data_for_html = DataShowFile.showDataNeed((($scope.date_input) ? $scope.date_input : Date.now()), 'yyyy');
            }
            $scope.showType = true;
            array_for_show_Html(); /** เอาข้อมูลทั้งหมดไปจัดไว้อยูใน array ตัวเดียวกัน */
            $scope.pageNum(); /** เซ็ต หมายเลข เภท */
            if ($scope.array_show_on_browser.length == 0) {
                $scope.showType = false
            }
            $scope.page_end = Numpage.page_size(); /** หมายเลข สุดท้าย */
            $scope.Data_show_i_o_s = {
                income: CalService.income_O_S($scope.show_data_for_html.temp_in),
                out: CalService.income_O_S($scope.show_data_for_html.temp_out),
                save: CalService.income_O_S($scope.show_data_for_html.temp_save),

            }


        }

        $scope.type_showF = (type) => {

            $scope.array_show_on_browser = [];
            //$scope.show_data_for_html = []; /** main value data temp */
            if (type === '0') {
                $scope.show_data_for_html.temp_in.forEach(ele => $scope.array_show_on_browser.push(ele));

            } else if (type === '1') {
                $scope.show_data_for_html.temp_out.forEach(ele => $scope.array_show_on_browser.push(ele));

            } else if (type === '2') {
                $scope.show_data_for_html.temp_save.forEach(ele => $scope.array_show_on_browser.push(ele))
            }
            $scope.pageNum();

            page_show()
        }
        $scope.deleteInFor = (id, i) => {
            $scope.array_show_on_browser = $scope.array_show_on_browser.splice(id, 1)
            /*IncomeService.delete(id).then(suc => Notification.success({
                message: "Delete..."
            })).catch(err => Notification.error({
                message: "err"
            }))*/
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