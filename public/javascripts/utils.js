/**
 * Created by shirley on 09/06/2017.
 */
(function (win) {
    var Utils = win.Utils || {};

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


    var local = win.localStorage;
    /* 出处：https://my.oschina.net/furw/blog/663566
     * Edited By Shirley Xie
     */
    Utils.locals = {      //存储单个属性
        set: function (key, value) {
            local[key] = value;
        },        //读取单个属性
        get: function (key, defaultValue) {
            return local[key] || defaultValue;
        },        //存储对象，以JSON格式存储
        setObject: function (key, value) {
            local[key] = JSON.stringify(value);
        },        //读取对象
        getObject: function (key) {
            var value;
            try {
                value = JSON.parse(local[key]);
            } catch (e) {
            }
            return utils.isObject(value) ? value : {};
        },        //存储数组，以JSON格式存储
        setArray: function (key, value) {
            local[key] = JSON.stringify(value);
        },        //读取数组
        getArray: function (key) {
            var value;
            try {
                value = JSON.parse(local[key]);
            } catch (e) {
            }
            return Array.isArray(value) ? value : [];
        },        //压栈，存储数组，以JSON格式存储
        pushArray: function (key, value) {
            var _value = this.getArray(key);
            _value.push(value);
            local[key] = JSON.stringify(_value);
        }
    };

    win.Utils = Utils;
})(window);