(function () {
    'use strict';

    angular
        .module('core')
        .factory('CalService', Factory)

    /** @ngInject */
    Factory.$inject = ['$filter']

    function Factory($filter) {

        const filter = (date, type) => {
            return $filter('date')(date, type);
        }
        /** */
        return {
            income_O_S: incomeCal,
            out_: outFunction, // สำหรับคิดค่าฌเฉล่ย รายจ่าย,
            diff_day: dat_diff,
            dataMount_diff: show_diff_month
      
        }
        /** */
        function incomeCal(data) {
            let temp = 0;
            data.forEach(ele => {
                temp += ele.moneyInput
            })
            return temp;
        }


        /**- */
        function show_diff_month(data) {
            let temp_ = [],temp_arr = [];

            data.forEach((ele, i) => {
                temp_arr.push(ele.timeCreate)
            })
            temp_arr = temp_arr.sort();
            temp_ = day_merge(temp_arr,'MM yyyy')

            return temp_;

        }




        /**  --------------------------------------------  */
        function day_money(day, money) {
            let money_t = [];
            let j = 0;
            let num_d = day.length;
            money.forEach((ele, i) => {
                for (j = 0; j < num_d; j++) {
                    if (filter(day[j], 'dd MM yyyy') == filter(ele.timeCreate, 'dd MM yyyy')) {
                        if (money_t[j] == null) {
                            money_t[j] = 0;
                        }
                        money_t[j] += ele.moneyInput;
                    }
                }
            })
            return money_t;
        }

        function day_merge(day,type) {
            let temp_day = [],
                temp_a = {},
                money_day = [];
            let j = 0;
            day.forEach((ele, i) => {
                if (filter(temp_day[j - 1], type) != filter(ele, type)) {
                    temp_day[j] = ele;
                    j++;
                }
            })
            return temp_day
        }

        function dat_diff(date_input) {
            let tmep_array = [],
                temp_array_re = [],
                temp_day = [],
                money = [];
            date_input.forEach((ele, i) => {
                temp_day.push(ele.timeCreate);
            })
            temp_day = temp_day.sort();
            tmep_array = day_merge(temp_day,'dd MM yyyy');
            money = day_money(tmep_array, date_input);
            return temp_array_re = {
                tmep_array,
                money
            };
        }

        function outFunction(data) {
            let temp_ = 0,
                m = 0;
            let data_total = dat_diff(data);
            data_total.money.forEach(ele => {
                m += ele;
            })
            temp_ = m / data_total.tmep_array.length;
            return temp_;
        }

    }

}());