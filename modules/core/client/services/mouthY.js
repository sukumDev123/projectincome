(function(){
    'use strict';

    angular
        .module('core')
        .factory('MouthY', Factory)

    /** @ngInject */
    function Factory(){

       
        function setYearT(year){
            return parseInt(year) + 543;
        }
         function setMonthT(mouth){
            var mountT = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
            return mountT[mouth-1];
        }
        return {
            setYearT: setYearT,
            setMonthT: setMonthT
        }

    }

}());