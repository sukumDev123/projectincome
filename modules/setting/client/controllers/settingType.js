'use stict';
(function () {
    'use strict';

    angular
        .module('setting')
        .controller('SettingType', SettingType)

    SettingType.$inject = ['$scope', 'TypeAndSubType', '$timeout', 'UserService', 'Notification']
    /** @ngInject */
    function SettingType($scope, TypeAndSubType, $timeout, UserService, Notification) {

        $scope.types = [];
        var get_type = () => {
            TypeAndSubType.getInformation().then(suc => {
                $scope.types = suc;
                set_page(5);

            });
        }
        get_type();

        var set_page = (end) => {
            var start = 0;
            $scope.num_page = $scope.types.slice(0, 5);

        }
        $scope.type = {};
        $scope.show_more = () => {

            let g = $scope.num_page.length;
            console.log(g++)
            set_page(g++);
            if ($scope.types.length < g) {
                Notification({
                    message: 'ข้อมูลหมดแล้ว',
                    title: 'Not Found'
                })
            }
        }

        $scope.saveType = function () {
            var g = /[a-zA-zก-ฮ]+/;

            if (g.test($scope.type.subtype)) {
                let loop = 0;
                let a = false;

                if ($scope.types.length == 0) {
                    a = true;
                }else{
                    a = false
                }
                for (let j = 0; loop = $scope.types.length, j < loop; j++) {

                    if ($scope.type.subtype == $scope.types[j].subtype) {
                        a = false;
                        break;
                    } else {
                        a = true;


                    }
                }


                if (a) {
                    TypeAndSubType.typeUpdate($scope.type).then(suc => {
                        $scope.types.push(suc)
                        $scope.num_page.push(suc);
                        Notification.success({
                            message: 'บันทึกประเภท ' + $scope.type.typeMoney + ' และ ประเภทย่อย ' + $scope.type.subtype + ' เรียบร้อย ',
                            title: 'Save Success'
                        })
                        $scope.type = {};

                    }).catch(err => {
                        $scope.err = err.data;
                    })
                } else {
                    Notification({
                        message: 'รายการมีอยูแล้ว',
                        title: 'แจ้งรายารซ่ำ'
                    })
                }
            } else {
                Notification.warning({
                    message: 'กรุณาใส่ตัวอักษร !',
                    title: 'Warning'
                })

            }
        };



        $scope.deleteType1 = function (id, i) {
            $scope.num_page.splice(i, 1);

            TypeAndSubType.deleteType(id).then(suc => {
                get_type();

                Notification.success({
                    message: suc.mess,
                    title: 'Success Event'
                });
                // set_page()    
            }).catch(err => {
                $scope.err = err.data;
            })
        }

    }

}());