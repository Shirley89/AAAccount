/**
 * Created by shirley on 07/06/2017.
 */

/* Controllers */
(function (utils) {
    var app = new App().module;

    app.controller('accountListCtrl', function ($scope, newIndex) {
        // prepare data
        var _input = '', _key = 'Accounts',
            isExist = function () {
                return $scope.accounts.some(function (item) {
                    return $scope.input == item.value;
                });
            };
        _defaultData(_key);
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
            var value;
            _input = $scope.input;
            value = {value: _input, index: newIndex($scope.accounts, true)};
            utils.locals.pushArray(_key, value);
            $scope.accounts.unshift(value);
            $scope.input = '';
        };
    });
    function _defaultData(_key) {
        if (utils.locals.getArray(_key).length == 0)
            utils.locals.setArray(_key, [{"value": "青岛", "index": 0}, {"value": "秦皇岛", "index": 1}]);
    }
})(window.Utils);