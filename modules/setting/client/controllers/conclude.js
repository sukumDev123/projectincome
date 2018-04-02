(function () {
    'use strict';

    angular
        .module('setting')
        .controller('ConcludeController', ConcludeController)

    /** @ngInject */
    ConcludeController.$inject = ['$scope', 'viewsTest', '$filter']

    function ConcludeController($scope, viewsTest, $filter) {
        const view_all = viewsTest;
        var diff_date = [],
            type_date = [];


        const filter = (date, type) => {
            return $filter('date')(date, type);
        }

        const set_type_values = () => {
            let total_diff_type = {},
                keep_t_i = [],
                keep_t_o = [],
                keep_t_s = [],
                i = 0;
            view_all.forEach((ele, k) => {
                if (ele.typeMoney === 'รายรับ') {
                    keep_t_i.push(ele)
                } else if (ele.typeMoney === 'รายจ่าย') {
                    keep_t_o.push(ele)

                } else if (ele.typeMoney === 'เงินออม') {
                    keep_t_s.push(ele)
                }
            })
            return total_diff_type = {
                income: keep_t_i,
                out: keep_t_o,
                save: keep_t_s
            }

        }
        const set_diff_date = (ele) => {
            let temp_date = [], //Keep month
                temp_money = [], //Keep Money
                temp_total = {}, //Keep month + money to Json
                temp_day = [],
                temp_day_diff = [],
                i = 0,
                i2 = 0;;
            ele.forEach((eleM, k) => {


                if (filter(eleM.timeCreate, 'MM yyyy') != temp_date[i - 1]) {
                    temp_date[i] = filter(eleM.timeCreate, 'MM yyyy');

                    i++;
                }
                if (filter(eleM.timeCreate, 'dd MM yyyy') != filter(temp_day[i2 - 1], 'dd MM yyyy')) {
                    temp_day[i2] = eleM.timeCreate;
                    i2++;

                }

            });
            i = 0, i2 = 0;
            let t_n = [];
            temp_day.forEach((ele, k) => {
                if (filter(temp_day_diff[i - 1], 'MM yyyy') != filter(ele, 'MM yyyy')) {
                    temp_day_diff[i] = ele;
                    if (t_n[i2] == null) t_n[i2] = null;
                    t_n[i2]++;
                    i2++;
                    i++;
                } else {
                    t_n[i2 - 1]++;
                }
            })
            i = 0;
            let h = 0;
            let hh = [];
            let num = temp_date.length;
            ele.forEach((eleM, k) => {
                for (var j = 0; j < num; j++) {
                    if (temp_money[j] == null && hh[j] == null) {
                        temp_money[j] = 0;

                    }
                    if (temp_date[j] == filter(eleM.timeCreate, 'MM yyyy')) {
                        temp_money[j] += parseInt(eleM.moneyInput);

                    }
                }
            })
            let num_ = temp_money.length;
            let keep_dea = [];

            for (var j = 0; j < num; j++) {
                keep_dea[j] = temp_money[j] / t_n[j];
            }




            return temp_total = {
                date: temp_date,
                money: temp_money,
                num: hh,
                iAs: keep_dea,
            }
        }

        $scope.show_date = {
            income: set_diff_date(set_type_values().income),
            out: set_diff_date(set_type_values().out),
            save: set_diff_date(set_type_values().save),
            //incomeAndO : set_diff_date(set_type_values().out)


        }


        console.log($scope.show_date)

    }

}());