(function () {
    'use strict';

    angular
        .module('core')
        .factory('Numpage', Factory)

    /** @ngInject */
    function Factory() {

        return {
            total: 0,
            size: 0,
            page_size: function () {
                return Math.ceil(this.total / this.size); /** num page total */
            },
            number_show: number_show,
            now_show_data: nowShowDate
        }

        function nowShowDate(n , infor) {
            let data = infor
            let begin = (n - 1) * this.size;
            let end = begin + this.size;
            data = infor.slice(begin,end)
            return data
        }

        function number_show(n) { /** page number */
            let num_input = this.page_size();
            let t = []
            let num = 0;
            for (var i = 0; i < num_input; i++) {
                t.push(i + 1);
            }
            let tl = t.slice(0, 3)
            if (n >= tl.length) {
                tl = t.slice(n - 2, n + 1);
            }
            return tl;

        }
    }

}());