/**
 * Created by shirley on 07/06/2017.
 */

/* Controllers */
(function (utils) {
    var app = angular.module('AA-Account', []).factory('locals', ['$window', function ($window) {
        /* 出处：https://my.oschina.net/furw/blog/663566
         * Edited By Shirley Xie
         */
        return {      //存储单个属性
            set: function (key, value) {
                $window.localStorage[key] = value;
            },        //读取单个属性
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },        //存储对象，以JSON格式存储
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },        //读取对象
            getObject: function (key) {
                var value;
                try {
                    value = JSON.parse($window.localStorage[key]);
                } catch (e) {
                }
                return utils.isObject(value) ? value : {};
            },        //存储数组，以JSON格式存储
            setArray: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },        //读取数组
            getArray: function (key) {
                var value;
                try {
                    value = JSON.parse($window.localStorage[key]);
                } catch (e) {
                }
                return Array.isArray(value) ? value : [];
            },        //压栈，存储数组，以JSON格式存储
            pushArray: function (key, value) {
                var _value = this.getArray(key);
                _value.push(value);
                $window.localStorage[key] = JSON.stringify(_value);
            }
        }
    }]);

    app.controller('activityListCtrl', function ($scope, locals) {
        // prepare data
        var _input = '', _key = 'Accounts',
            getLen = function () {
                return $scope.activities.length;
            },
            isExist = function () {
                return $scope.activities.some(function (item) {
                    return $scope.input == item.name;
                });
            };
        $scope.isActived = 0;
        $scope.input = _input;
        $scope.activities = locals.getArray(_key).reverse();
        $scope.selectItem = function (item, index) {
            item.isActived = index;
        };

        // events
        $scope.add = function () {
            if (!$scope.input || $scope.input == _input || isExist()) {
                return;
            }
            _input = $scope.input;
            var value = {name: _input, index: getLen()};
            locals.pushArray(_key, value);
            $scope.activities.unshift(value);
        };
    });
})(window.Utils);