'use strict';

(function () {
    'use strict';

    angular
        .module('core')
        .factory('IncomeService', Factory)

    Factory.$inject = ['$resource'];
    /** @ngInject */
    function Factory($resource) {

        var Income = $resource('/api/income', {}, {
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
                url: '/api/income/deleteinformation',
                params: {
                    information: '@_id'
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
            deleteInfor: function(information) {
                return this.deleteInformation({
                    information:information
                })
            },
            viewsInfor : function() {
                return this.viewsInformation({}).$promise;
            }

        })


        return Income



    }

}());