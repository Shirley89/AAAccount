/**
 * Created by shirley on 14/06/2017.
 */
var App = window.App ||
    function () {
        var app = angular.module('account', []).factory('newIndex', function () {
            return function (arr, isReverse) {
                if (!arr || !Array.isArray(arr)) return;
                var lastIndex = arr.length, index;
                if (lastIndex > 0) {
                    index = isReverse ? 0 : lastIndex - 1;
                    lastIndex = arr[index].index + 1;
                } else if (lastIndex != 0) {
                    lastIndex = 0;
                }
                return lastIndex;
            }
        });

        this.module = app;
    };