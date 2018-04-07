(function () {
    'use strict';

    angular
        .module('core')
        .factory('DataShowFile', Factory)
    Factory.$inject = ['$filter']
    function Factory($filter) {
        const filter = (date,ty) => {return $filter('date')(date,ty) }
        return {
            viewsTest: null,
            showDataNeed : showData_data_fix,
            showDataAll : showData_date_all
        }




        function showData_date_all() {
            let temp_in = [],
                temp_out = [],
                temp_save = [],
                err_i = [];
            let temp = {};
            this.viewsTest.forEach((ele, index) => {
                if (ele.typeMoney === 'รายรับ') {
                    temp_in.push(ele)
                } else if (ele.typeMoney === 'รายจ่าย') {
                    temp_out.push(ele);
                } else if (ele.typeMoney === 'เงินออม') {
                    temp_save.push(ele);
                } else {
                    err_i.push(ele)
                }
            })

            return temp = {
                temp_in,
                temp_out,
                temp_save,
                err_i
            };

        }

        function showData_data_fix(date_type, type) {
            /** Show Data form date type ex. day , month or year */
            /**
             * date_type = Date input;
             * type = Change ex. dd MM yyyy == day 
             * MM yyyy == month
             * yyyy == year
             */
            let temp_in = [],
                temp_out = [],
                temp_save = [],
                err_i = [];
            let temp = {};
            this.viewsTest.forEach((ele, i) => {
                if (filter(ele.timeCreate, type) === filter(date_type, type)) {
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
            })
            return temp = {
                temp_in,
                temp_out,
                temp_save,
                err_i
            };
        }



    }

}());