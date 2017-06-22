/**
 * Created by shirley on 12/06/2017.
 */
/* Controllers */
(function (utils) {
    var app = new App().module;

    app.controller('activityListCtrl', function ($scope, newIndex) {
        // prepare data
        var _key = 'Activities',
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
        $scope.items = [{index: 0}];

        // events
        $scope.addItems = function () {
            var value = {index: newIndex($scope.items)};
            // utils.locals.pushArray(_key, value);
            $scope.items.push(value);
        };

        $scope.select = function (name) {
            console.log(name);
        };

        $('.items select').live('change', function (e) {
            console.log(e.target.dataset.index);
        });
    });
})(window.Utils);