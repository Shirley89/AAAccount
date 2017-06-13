/**
 * Created by shirley on 07/06/2017.
 */

/* Controllers */
(function (utils) {
    var app = angular.module('account', []);

    app.controller('accountListCtrl', function ($scope) {
        // prepare data
        var _input = '', _key = 'Accounts',
            getLen = function () {
                return $scope.accounts.length;
            },
            isExist = function () {
                return $scope.accounts.some(function (item) {
                    return $scope.input == item.value;
                });
            };
        $scope.isActived = 0;
        $scope.input = _input;
        $scope.accounts = utils.locals.getArray(_key).reverse();
        $scope.selectItem = function (item, index) {
            item.isActived = index;
        };

        // events
        $scope.add = function () {
            if (!$scope.input || $scope.input == _input || isExist()) {
                return;
            }
            _input = $scope.input;
            var value = {value: _input, index: getLen()};
            utils.locals.pushArray(_key, value);
            $scope.accounts.unshift(value);
        };
    });
})(window.Utils);