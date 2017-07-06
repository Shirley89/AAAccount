/**
 * Created by shirley on 23/06/2017.
 */

/* VM */
(function (utils) {
    Vue.component('accounts', {
        data: function () {
            return {
                _key: 'Accounts',
                isActived: 0,
                accounts: utils.locals.getArray(this._key).reverse()
            };
        },
        created: function () {
            this._initDefaultData();
        },
        methods: {
            _initDefaultData: function () {
                var _key = this._key;
                if (utils.locals.getArray(_key).length == 0)
                    utils.locals.setArray(_key, [{"value": "青岛", "index": 0}, {"value": "秦皇岛", "index": 1}]);
            }
        },
        computed: {
            input: function (val) {
                return val.trim();
            }
        }
    });
    var _input = '', _key = 'Accounts';
    _defaultData(_key);

    new Vue({
        el: '.wrapper',
        data: {
            isActived: 0,
            input: _input,
            accounts: utils.locals.getArray(_key).reverse()
        },
        methods: {
            isExist: function () {
                return this.accounts.some(function (item) {
                    return this.input == item.value;
                }.bind(this));
            },
            selectItem: function (item, index) {
                item.isActived = index;
            },
            add: function () {
                if (!this.input || this.input == _input || this.isExist()) {
                    return;
                }
                var value;
                _input = this.input;
                value = {value: _input, index: utils.newIndex(this.accounts, true)};
                utils.locals.pushArray(_key, value);
                this.accounts.unshift(value);
                this.input = '';
            }
        }
    });


    function _defaultData(_key) {
        if (utils.locals.getArray(_key).length == 0)
            utils.locals.setArray(_key, [{"value": "青岛", "index": 0}, {"value": "秦皇岛", "index": 1}]);
    }
})(window.Utils);