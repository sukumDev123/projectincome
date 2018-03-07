'use strict';
(function () {
    'use strict';

    angular
        .module('core')
        .controller('ViewsIncomeTotal', ViewsIncomeTotal)

    ViewsIncomeTotal.$inject = ['$scope', 'viewsTest', '$filter', 'MouthY', 'IncomeService', '$state', 'mySocket', '$http', 'Auth', 'TypeAndSubType', '$stateParams','$location'];
    /** @ngInject */
    function ViewsIncomeTotal($scope, viewsTest, $filter, MouthY, IncomeService, $state, mySocket, $http, Auth, TypeAndSubType, $stateParams,$location) {
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
            /*ตรวจสอบรายรับรายจ่าย เพื่อทำการคำนวน หา รายรับรายจ่าย*/
        }
        $scope.currentPage = 1;
        $scope.numPerPage = 7;
      
        var numberPage = () => {
            $scope.$watch("currentPage + numPerPage", function() {
                var begin = ($scope.currentPage - 1) * $scope.numPerPage
                , end = begin + $scope.numPerPage;
            
                $scope.filteredTodos = $scope.information.slice(begin, end);
              });
              
        }
        var check_type = (time) => {
            $scope.notShow = false;
            
            $scope.filteredTodos = [];
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
            }else if($stateParams.type == 'all'){
                $scope.informationReal.forEach((element ,k ) => {
                    if (DateSet(element.timeCreate, 'yyyy') == DateSet(time, 'yyyy')) {
                      incomeFunc(element);
                     
                    }
                });            
                $scope.information = $scope.informationReal;
                $scope.notShow = true;
            }else{
                $location.path('/home/views/table/all')
            }
            numberPage();

            /*ตรวจสอบการค้นหาว่าหาโดยวันที่ เดือน หรือ ปี*/

        }
    
    

        $scope.showPage = 1;
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
        
       
        $scope.timeChnge = () => {
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
            return  DateSet(date,'hh:mma');
        }
        $scope.dateSetNew = (date)=>{
            return 'วันที่ทำรายการ : ' + DateSet(date,'dd')+ ' ' + MouthY.setMountT(DateSet(date,'MM')) + ' ' + MouthY.setYearT(DateSet(date,'yyyy'))
        }
        $scope.deleteInFor = function (infor) {
            IncomeService.delete(infor).then(function (res) {

                $scope.information.splice(infor, 1);
                // check_type(Date.now() || $scope.timeS );
            }).catch(function (err) {
                console.log(err)
            })

        }
        $scope.removeEdit = () => {
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

 /** สำหรับคิดเลขเภท */
   
        numberPage();

        $scope.t = [];
        const v = Math.ceil($scope.information.length / $scope.numPerPage);
        for(var i = 0 ; i < v;i++){
            $scope.t[i]=i+1;
        }
        $scope.changePage = (n)=>{
            $scope.currentPage = n;
            numberPage();
            $scope.showPage = n;
        }
    }

}());