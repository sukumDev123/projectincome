(function () {
    'use strict';

    angular
        .module('core')
        .run(rootScope)

    /** @ngInject */
    rootScope.$inject = ['$rootScope', 'Auth', '$state']

    function rootScope($rootScope, Auth, $state) {

        $rootScope.$on('$stateChangeStart', stateChangeStart);
        $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

        function stateChangeStart(event, toState, toStateParams, formState, formParams) {
              
            if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
                var allowed = false;
                for (var i = 0; i < toState.data.roles.length; i++) {
                    if (Auth.users && Auth.users.roles == toState.data.roles[i]) {
                        allowed = true;
                    }
                }
                if (!allowed) {
                    event.preventDefault();

                    $state.go('auth.signin').then(function () {
                        // Record previous state
                         storePreviousState(toState, toStateParams);
                    });

                }
            }
        }
        function stateChangeSuccess(event, toState, toStateParams, formState, formParams){
            storePreviousState(formState, formParams)
        }
        function storePreviousState(state, params) {

            // only store this state if it shouldn't be ignored
            if (!state.data || !state.data.ignoreState) {
                $state.previous = {
                    state: state,
                    params: params,
                    href: $state.href(state, params)
                };
                console.log($state.previous)
            }
        }
    }

}());