(function () {
    'use strict';

    angular
        .module('setting')
        .controller('ConcludeController', ConcludeController)

    /** @ngInject */
    ConcludeController.$inject = ['$scope', 'viewsTest', '$filter', 'DataShowFile', 'CalService']

    function ConcludeController($scope, viewsTest, $filter, DataShowFile, CalService) {
        DataShowFile.viewsTest = viewsTest;
        let month = CalService.dataMount_diff(DataShowFile.viewsTest);



        const filter = (date, type) => {
            return $filter('date')(date, type);
        }

        function month_all(data) {
            let temp = []
            data.forEach(ele => {
                // if (filter(ele, 'MM yyyy') == filter(, 'MM yyyy')) {
                temp.push(filter(ele, 'MM yyyy'))
                //}
            })
            return temp;
        }

        function type_money(data, month_s) {
            let temp = [],
                a_money = [];
            let num = month_s.length;
            let arratt = CalService.diff_day(data);
            let num_day = [];

            arratt.tmep_array.forEach((ele, j) => {
                for (let i = 0; i < num; i++) {

                    if (filter(ele, 'MM yyyy') == month_s[i]) {
                        if (a_money[i] == null) {
                            a_money[i] = 0;
                            num_day[i] = 0;
                        }
                        a_money[i] += arratt.money[j];
                        num_day[i]++;
                    }

                    // console.log(a_money[i])
                }

            })

            return temp = {
                a_money,
                num_day
            };
        }

        function main() {
            let temp = [],
                array = [],
                month_ = [];
            month_ = month_all(month);
            let temp_array = {
                i: type_money(DataShowFile.showDataAll().temp_in, month_),
                o: type_money(DataShowFile.showDataAll().temp_out, month_),
                s: type_money(DataShowFile.showDataAll().temp_save, month_)
            }
            let diff_d_m = [];
            temp_array.o.a_money.forEach((ele, j) => {

                if (diff_d_m[j] == null) diff_d_m[j] = 0;
                
                diff_d_m[j] =ele / temp_array.o.num_day[j]
            })


            console.log(diff_d_m)
        }


        main();
    }

}());