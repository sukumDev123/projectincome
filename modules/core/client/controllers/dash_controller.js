'use stict';

(function () {
    'use strict';

    angular
        .module('dash')
        .controller('DashBoardController', ControllerCtrl)

    /** @ngInject */
    ControllerCtrl.$inject = ['Auth', '$scope', 'MouthY', 'IncomeService', 'viewsTest', 'mySocket', '$filter', '$window', 'Notification', 'Wanna', 'DataShowFile', 'CalService']

    function ControllerCtrl(Auth, $scope, MouthY, IncomeService, viewsTest, mySocket, $filter, $window, Notification, Wanna, DataShowFile, CalService) {
        var DateSet = (date, type) => {
            return $filter('date')(date, type);
        }
        if (!mySocket.connect()) {
            mySocket.connect();
        }
        const color = ["#FA6E6E #FA9494", "#F1C795 #feebd2", "#FDAA97 #FC9B87", "#28C2D1", "#D2D6DE"]
        const cal = CalService;
        const date_set = DataShowFile;
        DataShowFile.viewsTest = viewsTest; /* <-- set data in service  */
        function diff_type(type) {
            let temp_ = [];
            let j = 0;
            type.forEach((ele, i) => {
                if (temp_[j - 1] != ele) {
                    temp_[j] = ele;
                    j++;
                }
            })
            return temp_
        }

        function merge_d_m(type, data) {
            let temp_ = [];
            let num = type.length;
            data.forEach(ele => {
                for (let i = 0; i < num; i++) {

                    if (ele.subtypeMoney == type[i]) {
                        if (temp_[i] == null) {
                            temp_[i] = 0;
                        }
                        temp_[i] += ele.moneyInput
                    }
                }
            })
            return temp_;
        }

        function function_merge(data) {
            let temp_ = [],
                temp_a = [],
                temp_b = [],
                temp_c = [];
            data.forEach(ele => {
                temp_a.push(ele.subtypeMoney);
            })
            temp_a = temp_a.sort();
            temp_b = diff_type(temp_a); /** แยก ประเภทข้อมูล */
            temp_c = merge_d_m(temp_b, data); /** หาความถี่ข้อมูล */

            return temp_ = {
                money: temp_c,
                subtype: temp_b
            };
        }

        function setMyjson(array) {
            let data = [];
            array.subtype.forEach((ele, k) => {
                data.push({
                    text: ele,
                    values: [array.money[k]],
                    backgroundColor: color[k]
                })
            })
            return data
        }

        function pietypeChange(type) {
            if (type == 0) {
                return function_merge(date_set.showDataNeed(Date.now(), 'MM yyyy').temp_in)
            } else if (type == 1) {
                return function_merge(date_set.showDataNeed(Date.now(), 'MM yyyy').temp_out)

            } else if (type == 2) {
                return function_merge(date_set.showDataNeed(Date.now(), 'MM yyyy').temp_save)

            }
        }
        $scope.data_flow = type => {
            console.log(type)
            let data = [];
            data = setMyjson(pietypeChange(type));
            console.log(data)
            chartPie(data)


            /*
            '
                       */
        }

        function main() {
            let data = [];
            $scope.show = {
                avenDay: cal.out_(date_set.showDataNeed(Date.now(), 'MM yyyy').temp_out),
                totalComein: cal.income_O_S(date_set.showDataNeed(Date.now(), 'MM yyyy').temp_in),
                pay: cal.income_O_S(date_set.showDataNeed(Date.now(), 'MM yyyy').temp_out),
                savemoney: cal.income_O_S(date_set.showDataNeed(Date.now(), 'MM yyyy').temp_save),
            }
            $scope.show.beyond = $scope.show.totalComein - $scope.show.pay;
            let array_out = function_merge(date_set.showDataNeed(Date.now(), 'MM yyyy').temp_out);
            data = setMyjson(array_out);
            chartPie(data)/** myjson 2  */
            myJson(day_myjson(),day_7) /** myjson */
        }


        function chartPie(data) {
            $scope.myJson2 = {
                globals: {
                    shadow: false,
                    fontFamily: "Verdana",
                    fontWeight: "100"
                },
                type: "pie",
                backgroundColor: "#fff",

                legend: {
                    layout: "x5",
                    position: "50%",
                    borderColor: "transparent",
                    marker: {
                        borderRadius: 10,
                        borderColor: "transparent"
                    }
                },
                tooltip: {
                    text: "%t %v บาท"
                },
                plot: {
                    refAngle: "-90",
                    borderWidth: "0px",
                    valueBox: {
                        placement: "in",
                        text: "%npv %",
                        fontSize: "15px",
                        textAlpha: 1,
                    }
                },
                series: data
            }
        }

        const day_7 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        function day_differ(type) {
            let data = [],
                max = 0;
            let day = CalService.diff_day(date_set.showDataNeed(Date.now(), 'MM yyyy').temp_out);
            day.tmep_array.forEach((ele, k) => {
                max = chack_min_7(DateSet(ele, 'MM dd yyyy'))
                if (max < 7) {
                    data.push({
                        money: day.money[k],
                        day: DateSet(ele, type)
                    })        
                }
            })
            return data;
        }

        function chack_min_7(date) {

            let date_start = new Date(date);;
            let date_end = new Date();
            var startA = Date.parse(date_start);
            var endA = Date.parse(date_end)
            var gg = endA - startA;
            var num_days = ((gg % 31536000000) % 2628000000) / 86400000; // day
            let res = 0;
            res = Math.round(num_days); // day
            return res;

        }

        function day_myjson() {
            let n_day = day_7.length;
            let data = day_differ('EEE'); 
            let temp_ = [0, 0, 0, 0, 0, 0, 0];    
            data.forEach((ele,k) => {
                for(let i = 0 ; i < n_day; i++){
                    if(ele.day == day_7[i]){
                        temp_[i] = ele.money;          
                        break;
                    }        
                }
            })
            return temp_;
        }


        function myJson(money,type_date) {
            $scope.myJson = {
                "type": "hbar",
                "background-color": "#fff",
                "border-color": "#dae5ec",
                "border-width": "1px",
                "height": "100%",
                "width": "96%",
                "x": "2%",
                "y": "3%",
                "title": {
                    "margin-top": "7px",
                    "margin-left": "9px",
                    "font-family": "Arial",
                    "text": "DEPARTMENT PERFORMANCE",
                    "background-color": "none",
                    "shadow": 0,
                    "text-align": "left",
                    "font-size": "11px",
                    "font-weight": "bold",
                    "font-color": "#707d94"
                },
                "scale-y": {

                    "tick": {
                        "visible": false
                    },
                    "item": {
                        "font-color": "#8391a5",
                        "font-family": "Arial",
                        "font-size": "10px",
                        "padding-right": "5px"
                    },
                    "guide": {
                        "rules": [{
                                "rule": "%i == 0",
                                "line-width": 0
                            },
                            {
                                "rule": "%i > 0",
                                "line-style": "solid",
                                "line-width": "1px",
                                "line-color": "#d2dae2",
                                "alpha": 0.4
                            }

                        ]
                    }
                },
                "scale-x": {
                    "items-overlap": true,
                    "max-items": 9999,
                    "values":  type_date ,
                    "offset-y": "1px",
                    "line-color": "#d2dae2",
                    "item": {
                        "font-color": "#8391a5",
                        "font-family": "Arial",
                        "font-size": "11px",
                        "padding-top": "2px"
                    },
                    "tick": {
                        "visible": false,
                        "line-color": "#d2dae2"
                    },
                    "guide": {
                        "visible": false
                    }
                },
                "plotarea": {
                    "margin": "45px 20px 38px 45px"
                },
                "plot": {
                    "bar-width": "33px",
                    "hover-state": {
                        "visible": false
                    },
                    "animation": {
                        "delay": 500,
                        "effect": "ANIMATION_SLIDE_BOTTOM"
                    },
                    "tooltip": {
                        "font-color": "#fff",
                        "font-family": "Arial",
                        "font-size": "11px",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px",
                        "background-color": "#707e94"
                    }
                },
                "series": [{
                    "values": money,
                    "styles": [{
                            "background-color": "#f23737"
                        },
                        {
                            "background-color": "#f0d536"
                        },
                        {
                            "background-color": "#f9a59f"
                        },
                        {
                            "background-color": "#a7e83e"
                        },
                        {
                            "background-color": "#f17837"
                        },
                        {
                            "background-color": "#35b1ef"
                        },
                        {
                            "background-color": "#ad34ef"
                        },

                    ]
                }]
            }
        }

        main();

        mySocket.on('showNew', data => {
            /* if ($scope.total[$scope.total.length - 1] != data) {
                 $scope.total.push(data);
                 aven()
                 $scope.dash_Big = $scope.show.avenDay;
                 $scope.showTitle = 'เงินเฉลียต่อวัน';
             }*/
            //
        })



    }


    /** */

}());