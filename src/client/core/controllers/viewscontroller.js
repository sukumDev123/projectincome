'use strict';
(function () {
    'use strict';

    angular
        .module('core')
        .controller('ViewsIncomeTotal', ViewsIncomeTotal)

    ViewsIncomeTotal.$inject = ['$scope', 'viewsTest', '$filter', 'MouthY', 'IncomeService', '$state', 'mySocket', '$http', 'Auth', 'TypeAndSubType', '$stateParams'];
    /** @ngInject */
    function ViewsIncomeTotal($scope, viewsTest, $filter, MouthY, IncomeService, $state, mySocket, $http, Auth, TypeAndSubType, $stateParams) {
        var DateSet = function (date, detail) {
            return $filter('date')(date, detail);
        }
        var incomeFunc = (element) => {
          
        
                if (element.typeMoney == "รายรับ") {
                    $scope.inmoney += parseInt(element.moneyInput);
                    
                } else if (element.typeMoney == "รายจ่าย") {
                 
                    
                    $scope.delmoney += parseInt(element.moneyInput)
                } else if (element.typeMoney == 'เงินออม') {
                    $scope.saveMoney += parseInt(element.moneyInput)
                  
                }
            /**/
        }
        var check_type = (time) => {
            $scope.information = [];
            if ($stateParams.type == 'day') {
                $scope.informationReal.forEach((element ,k ) => {
                    if (DateSet(element.timeCreate, 'dd MM yyyy') == DateSet(time, 'dd MM yyyy')) {
                      incomeFunc(element);
                      $scope.information.push(element);
                      
                    }
                });

            } 
            else if ($stateParams.type == 'month') {
                $scope.informationReal.forEach((element ,k ) => {
                    if (DateSet(element.timeCreate, 'MM yyyy') == DateSet(time, 'MM yyyy')) {
                      incomeFunc(element);
                      $scope.information.push(element);
                      
                    }
                });

            }
            else if ($stateParams.type == 'year') {
                $scope.informationReal.forEach((element ,k ) => {
                    if (DateSet(element.timeCreate, 'yyyy') == DateSet(time, 'yyyy')) {
                      incomeFunc(element);
                      $scope.information.push(element);
                      
                    }
                });

            }else{
                $scope.information = $scope.informationReal;
                
            }


        }
        $scope.information = [];
        $scope.indexof = 0;
        $scope.authentication = Auth;
        $scope.informationReal = viewsTest;
        $scope.type = ['รายรับ', 'รายจ่าย', 'เงินออม'];
        $scope.inmoney = 0;
            $scope.delmoney = 0;
            $scope.saveMoney = 0;
        $scope.timeS = new Date();
        check_type(Date.now())
        $scope.timeChnge = () =>{
            $scope.inmoney = 0;
            $scope.delmoney = 0;
            $scope.saveMoney = 0;
            check_type($scope.timeS);
        }
        TypeAndSubType.getInformation().then(suc => {
            $scope.suc = suc

        });
        const subType = () => {
            $scope.subtype = [];
            var num = $scope.dateForUpdate.typeMoney;

            for (var t = 0; t < $scope.suc.length; t++) {
                if ($scope.suc[t].typeMoney == null) break;
                if (num == $scope.suc[t].typeMoney) {
                    $scope.subtype.push($scope.suc[t].subtype)
                }
            }
        }
        $scope.onChange = () => {
            subType();
        }
        //totalMoney();
        $scope.dateFormat = function (date) {
            return DateSet(date, "dd") + ' ' + MouthY.setMountT(DateSet(date, "MM")) + ' ' + MouthY.setYearT(DateSet(date, "yyyy"))
        }

        $scope.year = function (date) {
            return MouthY.setYearT(DateSet(date, "yyyy"));
        }
        $scope.mouth = function (date) {
            return MouthY.setMountT(DateSet(date, "MM"));

        }
        $scope.day = function (date) {
            return DateSet(date, "dd");
        }

        $scope.deleteInFor = function (infor) {
            IncomeService.delete(infor).then(function (res) {
              
                $scope.information.splice(infor, 1);
               // check_type(Date.now() || $scope.timeS );
            }).catch(function (err) {
                console.log(err)
            })

        }
        $scope.removeEdit  = ()=>{
            $scope.showUpadte = false;
        }
        $scope.updateInfor = function () {
           
            $scope.dateForUpdate.iduser = $scope.authentication.users._id;
            IncomeService.updateInfor($scope.dateForUpdate).then(suc => {
                $scope.information[$scope.indexof] = suc;
                $scope.showUpadte = false;
                $scope.indexof = 0;

            }).catch(err => console.log(err))
        }
        $scope.getInfor = function (id, arry) {
            $scope.indexof = arry;
            $scope.showUpadte = true;
            IncomeService.getinfor(id).then(suc => {
                $scope.dateForUpdate = suc;
            });
        }



    }

}());