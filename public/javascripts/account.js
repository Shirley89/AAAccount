/**
 * Created by shirley on 12/06/2017.
 */
/* Controllers */
(function (utils) {
    var app = angular.module('account', []);

    app.controller('activityListCtrl', function ($scope) {
        // prepare data
        var _key = 'Activities',
            getLen = function () {
                // return $scope.activities.length;
            },
            getActs = function () {
                // return utils.locals.getArray(_key);
                var arr = ['外卖早午饭', '路费', '海鲜居', '相机租赁'];
                arr.unshift($scope.selectedAct);
                return arr;
            },
            getMems = function () {
                var arr = ['果果', '阿莫', '小哈'];
                arr.unshift($scope.selectedMem);
                return arr;
            };
        $scope.selectedMem = 'Members';
        $scope.selectedAct = 'Activities';
        $scope.activities = getActs();
        $scope.members = getMems();
        $scope.items = [{}];

        // events
        $scope.addItems = function () {
            var value = {};
            // utils.locals.pushArray(_key, value);
            $scope.items.push(value);
        };

        $scope.select = function (name) {
            console.log(name);
        };

        $('.items select').live('change', function (e) {
            console.info(e.target.dataset.index);
        });
    });
})(window.Utils);