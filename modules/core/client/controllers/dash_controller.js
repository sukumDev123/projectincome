'use stict';

(function () {
    'use strict';

    angular
        .module('dash')
        .controller('DashBoardController', ControllerCtrl)

    /** @ngInject */
    ControllerCtrl.$inject = ['Auth', '$scope', 'MouthY', 'IncomeService', 'viewsTest', 'mySocket', '$filter', '$window', 'Notification']

    function ControllerCtrl(Auth, $scope, MouthY, IncomeService, viewsTest, mySocket, $filter, $window, Notification) {
        var DateSet = (date, type) => {
            return $filter('date')(date, type);
        }
        if (!mySocket.connect()) {
            mySocket.connect();
        }

        $scope.eyeDo = {
            month: MouthY.setMonthT(DateSet(Date.now(), 'MM')),
            year: MouthY.setYearT(DateSet(Date.now(), 'yyyy'))
        }
        $scope.css = 'red;'
        $scope.data = [];
        $scope.show = {};
        var show_date_k = [];
        let show_sub_type_out = [],
            show_sub_type_income = [],
            show_sub_type_save = [];
        $scope.total = viewsTest;
        var aven = () => {
            $scope.show = {};
            let ho = 0;
            let num = 0;
            let numdate = [];
            let comein = 0;
            let numcomein = 0;
            let savemoney = 0;
            let numsaveM = 0;
            $scope.total.forEach((ele, k) => {

                if (ele.typeMoney == 'รายจ่าย') {
                    if (DateSet(ele.timeCreate, 'MM yyyy') == DateSet(Date.now(), 'MM yyyy')) {
                        ho += ele.moneyInput; //เงินทั่งหมด     
                        num++; //จำนวนในการใช้จ่าย
                        numdate.push(DateSet(ele.timeCreate, 'dd MM yyyy'));
                        show_date_k.push(ele)
                        show_sub_type_out.push(ele)

                    }
                } else if (ele.typeMoney == 'รายรับ') {
                    if (DateSet(ele.timeCreate, 'MM yyyy') == DateSet(Date.now(), 'MM yyyy')) {
                        comein += ele.moneyInput; //เงินทั่งหมด        
                        numcomein++; //จำนวนในการใช้จ่าย
                        show_sub_type_income.push(ele)

                    }
                } else if (ele.typeMoney == 'เงินออม') {
                    if (DateSet(ele.timeCreate, 'MM yyyy') == DateSet(Date.now(), 'MM yyyy')) {
                        savemoney += ele.moneyInput; //เงินทั่งหมด        
                        numsaveM++; //จำนวนในการใช้จ่าย
                        show_sub_type_save.push(ele)

                    }
                }
            })
            let arr = [];
            let v = 0;
            for (let a = 0; v = numdate.length, a < v; a++) {
                if (numdate[a - 1] != numdate[a]) {
                    arr.push(numdate[a])
                }
            }
            let numdatearr = arr.length;
            $scope.show = {
                avenDay: ho / numdatearr || 0,
                numI: numdatearr,
                totalComein: comein,
                numCome: numcomein,
                pay: ho,
                savemoney: savemoney,
                numsaveM: numsaveM
            }
            $scope.show.beyond = $scope.show.totalComein - ho;
            $scope.show.numB = numcomein + num
            $scope.dash_Big = $scope.show.avenDay;
        }
        aven()
        $scope.totalShow = false;
        $scope.typeShow = type => {
            if (type == 'aven') {
                $scope.dash_Big = $scope.show.avenDay;
                $scope.showTitle = 'เงินเฉลียต่อวัน';

            } else if (type == 'beyond') {
                $scope.dash_Big = $scope.show.beyond;
                $scope.showTitle = 'เงินคงเหลือ';



            } else if (type == 'pay') {
                $scope.dash_Big = $scope.show.pay;

                $scope.showTitle = 'รายจ่าย';


            } else if (type == 'totalComein') {
                $scope.dash_Big = $scope.show.totalComein;
                $scope.showTitle = 'รายรับ';



            }
        }
        $scope.showTitle = 'เงินเฉลียต่อวัน';
        mySocket.on('showNew', data => {
            if ($scope.total[$scope.total.length - 1] != data) {
                $scope.total.push(data);
                aven()
                $scope.dash_Big = $scope.show.avenDay;
                $scope.showTitle = 'เงินเฉลียต่อวัน';
            }
            //
        })





       




        
        /**Canvas MyJson */
        var day_y = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        var data_show_data = [];
        var selete_date_uni = {};
        var value_size = [];

        function date_y(date) {
            let date_start = new Date(date);;
            let date_end = new Date();
            let oneDay = 24 * 60 * 60 * 1000;
            var startA = Date.parse(date_start);
            var endA = Date.parse(date_end)
            var gg = endA - startA;
            var num_days = ((gg % 31536000000) % 2628000000) / 86400000; // day
            let res = {};
            res.date = Math.round(num_days); // day
            return res;

        }

        function date_show_Chart_day(ele) {
            let array = [];
            let temp = [];
            let i = 0;
            ele.forEach((ele, k) => {
                temp.push(DateSet(ele.timeCreate, 'EEE'))
            })
            temp = temp.sort();
            temp.forEach((ele, k) => {
                if (array[i - 1] != ele) {
                    array[i] = ele;
                    i++;
                }
            })

            return array;
        }

        function date_show_Chart_day_money(data, date_s) {
            let array = [],
                temp = [],
                infor = {};
            let loop = date_s.length
            data.forEach((ele, k) => {
                for (var i = 0; i < loop; i++) {
                    if (array[i] == null) {
                        array[i] = 0;
                    }
                    if (date_s[i] == DateSet(ele.timeCreate, 'EEE')) {
                        array[i] += ele.moneyInput;
                        temp[i] = date_s[i]
                    }
                }
            })

            return infor = {
                date : temp , money : array
            };
        }

        function date_show_chart_day_index(data){
            let array = [], numloop = day_y.length;
           
            data.date.forEach((ele,a) => {
                for(let i = 0 ; i < numloop;i++){
                    if (array[i] == null) {
                        array[i] = 0;
                    }
                    if (ele == day_y[i]) {
                        array[i] += data.money[a];
                      
                    }
                }
            })
            return array;
        }

        function chake_max() {
            let a = [],
                day_select = [],
                values_day = [];
            let i = 0;
            let diff = 0;
            show_date_k.forEach((ele, k) => {
                diff = date_y(ele.timeCreate).date
                if (diff < 7) {
                    a.push(ele)

                }
            });
            day_select = date_show_Chart_day(a);
            values_day = date_show_Chart_day_money(a, day_select);
            value_size =  date_show_chart_day_index(values_day)
            myJson();
        }
        chake_max();
        function myJson() {
            $scope.myJson = {
                type: "bar",
                title: {
                    backgroundColor: "transparent",
                    fontColor: "black",
                    text: "รายสัปดาร์"
                },
                "plotarea": {
                    "adjust-layout": true /* For automatic margin adjustment. */
                },
                "scale-x": {
                    "label": { /* Add a scale title with a label object. */
                        "text": "Above is an example of a category scale",
                    },
                    /* Add your scale labels with a labels array. */
                    "labels": day_y
                },
                "series": [{
                        "values": value_size
                    }

                ]
            };
        }





























        /* 
         */
        /**myJson2 */

        var data_loop = [];

        var title_donus = null; //$scope.data_flow
        var subType_show_input_value = [];
        $scope.data_flow = data => {
            average_for_show_vis(data);
        }

        let subtype_put_show_s = [];

        function selete_type_date(data) {
            subtype_put_show_s = [];
            subType_show_input_value = [];
            if (data == "รายรับ") {
                subType_show_input_value = show_sub_type_income;
            } else if (data == 'รายจ่าย') {
                subType_show_input_value = show_sub_type_out;
            } else if (data == 'เงินออม') {
                subType_show_input_value = show_sub_type_save;
            }

        }

        function average_for_show_vis(data) {
            data_loop = [];
            title_donus = data;
            let color = ['#CD5C5C','#F08080','#FFC300','#ADFF2F','#C70039','#FFA07A','#00BFFF']
            let money_selet = [];
            let i = 0;
            selete_type_date(data);


            subType_show_input_value.forEach((ele, k) => {
                if (subtype_put_show_s[0] == null) {
                    subtype_put_show_s.push(ele.subtypeMoney)
                } else {
                    subtype_put_show_s.push(ele.subtypeMoney)

                }
            })
            if (subtype_put_show_s.length == 0) {

                Notification({
                    message: 'รายการว่างเปล่า'
                })
                data_loop.push({
                    text: 'ไม่มีรายการแสดง',
                    values: [0.0],
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'

                })
            }

            var g_h_j = [];
            i = 0;

            
            subtype_put_show_s = subtype_put_show_s.sort();
            subtype_put_show_s.forEach((ele, k) => {
                if (g_h_j[i - 1] != ele) {
                    g_h_j.push(ele)
                    i++;
                }
            })


            i = 0;


            subType_show_input_value.forEach((ele, k) => {
                for (var j = 0; j < g_h_j.length; j++) {
                    if (money_selet[j] == null) {
                        money_selet[j] = 0;
                    }
                    if (g_h_j[j] == ele.subtypeMoney) {
                        money_selet[j] += ele.moneyInput
                    }
                }
            })
            i = 0;
            let asd = 0;
            let color_use;
            /**Show Data */
            g_h_j.forEach((ele, k) => {
                color_use = color[k] ? color[k] : '#6fe820'
                data_loop.push({
                    text: g_h_j[k],
                    values: [money_selet[k]],
                    backgroundColor: color_use,
                    marker: {
                        backgroundColor: color_use
                    }
                })
            })
            myjson2();
        }
        $scope.myJson2_S = 'รายจ่าย'
        average_for_show_vis('รายจ่าย'); // จะแสดงข้อมูลเป็นเปอร์เซน ของ รายรับรายจ่ายเงินออม โดยจะแสดงเงินรายจ่ายเฉลี่ย จากการใช่จ่าย ในประเภท ย่อยนั้นๆ
        function myjson2() {
            $scope.myJson2 = {
                type: "pie",
                backgroundColor: "#ffffff",
                plot: {
                    borderColor: "#2B313B",
                    borderWidth: 0,
                    // slice: 90,
                    valueBox: {
                        placement: 'out',
                        text: '%t\n%npv%',
                        fontFamily: "Kanit', sans-serif"
                    },

                    animation: {
                        effect: 4,
                        method: 5,
                        speed: 600,
                        sequence: 1
                    }
                },
                source: {
                    //  text: 'gs.statcounter.com',
                    fontColor: "#8e99a9",
                    fontFamily: "Open Sans"
                },
                title: {
                    fontColor: "red",
                    text: title_donus,
                    align: "center",
                    offsetX: 10,
                    fontFamily: " 'Kanit', sans-serif",
                    fontSize: 25
                },
                subtitle: {
                    offsetX: 10,
                    offsetY: 10,
                    fontColor: "#8e99a9",
                    fontFamily: " 'Kanit', sans-serif",
                    fontSize: "16",
                    text: DateSet(Date.now(), 'MMM yyyy'),
                    align: "left"
                },
                plotarea: {
                    margin: "20 0 0 0"
                },
                series: data_loop
            };
        }


    }


    /** */

}());