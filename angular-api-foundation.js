/**
 * angular-api-foundation v0.1
 * (c) 2015 Tim Rücker
 * License: MIT License
 */
(function(angular) {
    'use strict';
    angular.module('angular-api-foundation', [])
            /**
             * 
             * @description This is a simple foundation for ajax apis
             */
            .factory('apiFoundation', [
                '$http',
                '$q',
                function($http, $q) {
                    /**
                     * 
                     * @description The api Object with the neccesarry api method
                     * @memberOf apiFoundation
                     * @class ApiFoundation
                     * @param {Object} options The initialisation object
                     * @returns {_L7._L14.ApiFoundation}
                     */
                    function ApiFoundation(options) {
                        /**
                         * 
                         * @memberOf apiFoundation.ApiFoundation#
                         * @name options
                         * @default {url: ''}
                         * @type Object
                         */
                        this.options = {
                            url: options.url || ''
                        };
                        /**
                         * 
                         * @description The user ajax method. It just makes an ajax call to the defined api
                         * @requires {@link https://docs.angularjs.org/api/ng/service/$http|$http}
                         * @requires {@link https://docs.angularjs.org/api/ng/service/$q|$q}
                         * @memberOf apiFoundation.ApiFoundation#
                         * @function api
                         * @param {String} route The route that some apis use
                         * @param {Object} get The get paramters
                         * @returns {@link https://docs.angularjs.org/api/ng/service/$q|$q.defer().promise}
                         */
                        this.api = function(route, get) {//instance
                            var def = $q.defer();
                            $http({
                                url: this.options.url + route,
                                type: 'GET',
                                params: get
                            }).success(def.resolve).error(def.reject);
                            return def.promise;
                        };
                    }

                    /**
                     * 
                     * @description Builds the route string for the api call
                     * @memberOf apiFoundation
                     * @function buildRoute
                     * @private
                     * @param {Array} routes The defined routenames as array,
                     * if an entry with the content "id" is in here, 
                     * then the param "id" will be converted to a route part
                     * @param {Object} params The Params the user wrote
                     * @todo: insteeat of append implode by "/"
                     * @returns {String}
                     */
                    function buildRoute(routes, params) {
                        var ret = '';
                        for (var i = 0, j = routes.length; i < j; i++) {
                            if (typeof params[routes[i]] !== 'undefined') {
                                ret += params[routes[i]] + '/';
                            }
                        }
                        return ret.replace(/\/$/, '');
                    }

                    /**
                     * 
                     * @description Builds an object with just the elements being get params
                     * @memberOf apiFoundation
                     * @function buildGetObject
                     * @private
                     * @param {Array} data The elements that shoud be convertet to get params of the params object
                     * @param {Object} params All Params set by the user
                     * @returns {Object}
                     */
                    function buildGetObject(data, params) {
                        var ob = {};
                        for (var i = 0, j = data.length; i < j; i++) {
                            if (typeof params[data[i]] !== 'undefined') {
                                ob[params[data[i]]] = data[i];
                            }
                        }
                        return ob;
                    }


                    /**
                     * 
                     * @description Returns the correct method for the ApiFoundation Object
                     * @memberOf apiFoundation
                     * @function buildApiMethod
                     * @private
                     * @param {Function|Object} opions The Element set by the user,
                     * @returns {Function}
                     */
                    function buildApiMethod(opions) {
                        if (typeof opions === 'function') {
                            return opions;
                        }
                        if (typeof opions === 'object' && !(opions instanceof Array)) {
                            return function(options) {
                                var r = buildRoute(opions.route || {}, options);
                                var get = buildGetObject(opions.get || {}, options);
                                return this.api(r, get);
                            };
                        }
                    }

                    return function(object) {
                        var api = new ApiFoundation(object);
                        for (var name in object) {
                            if (name !== 'url') {
                                api[name] = buildApiMethod(object[name]);
                            }
                        }
                        return api;
                    };
                }
            ]);
})(angular);