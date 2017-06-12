/**
 * Created by shirley on 09/06/2017.
 */
(function (window) {
    var Utils = window.Utils || {};

    /**
     *  type judgment functions
     *  return Boolean
     *
     *  isString /
     *  isArray /
     *  isNumber /
     *  isFunction /
     *  isObject /
     *  isNull /
     *  isUndefined
     *
     */
    "String Array Number Function Object Null Undefined".split(" ").forEach(function (type) {
        Utils["is" + type] = function (arg) {
            return Object.prototype.toString.call(arg) === "[object " + type + "]";
        }
    });

    window.Utils = Utils;
})(window);