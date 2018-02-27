'use strict';

(function () {
    'use strict';

    angular
        .module('core')
        .factory('IncomeService', Factory)

    Factory.$inject = ['$resource'];
    /** @ngInject */
    function Factory($resource) {

        var Income = $resource('/api/income/deleteinformation/:information', {}, {
            update: {
                method: "PUT",
                url: "/api/income/editinformation"
            },
            saveInformation: {
                method: "POST",
                url: "/api/income/addinformation",
            },
            deleteInformation: {
                method: "DELETE",
                url: '/api/income/deleteinformation/:information',
                params:{
                    information :"@id"
                }
                
            },
            viewsInformation: {
                method: "GET",
                isArray:true,
                url: '/api/income/views'
            }
        });
        angular.extend(Income, {
            saveInfor: function(information){
                return this.saveInformation(information).$promise

            },
            viewsInfor : function() {
                return this.viewsInformation({}).$promise;
            },
            delete : function(infor){
                return this.deleteInformation({information: infor}).$promise;
            }

        })


        return Income



    }

}());