/**
 * Created by shirley on 23/06/2017.
 */

/* VM */
(function (utils) {
    var _key = 'Accounts', list = [],
        activities = ['外卖早午饭', '路费', '海鲜居', '相机租赁'],
        members = ['果果', '阿莫', '小哈'];

    var itemCheckbox = Vue.extend({
        template: '\
        <div class="col-xs-1 col-md-1 col-lg-1">\
        <div class="checkbox">\
        <label>\
            <input\
            type="checkbox"\
            @change="change"\
            v-model:value="value"\
            />\
        </label>\
        </div>\
        </div>\
        '
        ,
        data: function () {
            return {value: false}
        },
        methods: {
            change: function () {
                //console.log('item-checkbox', this.value);
            }
        }
    });

    var itemSelect = Vue.extend({
        props: ['valDefault', 'data'],
        template: '\
        <div class="col-xs-3 col-md-3 col-lg-3">\
        <select class="form-control" \
        @change="change"\
        v-model:value="value">\
            <option v-for="name in all" v-text="name"\
        ></option>\
        </select>\
        </div>\
        '
        ,
        data: function () {
            return {
                value: this.valDefault
            }
        },
        methods: {
            change: function () {
                //console.log('item-select', this.value);
            },
            valid: function () {
                return this.value != this.valDefault;
            }
        },
        computed: {
            all: function () {
                return [this.valDefault].concat(this.data);
            }
        }
    });

    var itemInput = Vue.extend({
        template: '\
        <div class="col-xs-3 col-md-3 col-lg-3">\
        <div class="input-group">\
            <span class="input-group-addon">￥</span>\
            <input\
            class="form-control"\
            type="text"\
            @change="change"\
            v-model:value="value"\
            aria-label="RMB"\
            />\
        </div>\
        </div>\
        '
        ,
        data: function () {
            return {value: ''}
        },
        methods: {
            change: function () {
                //console.log('item-input', this.value);
            },
            valid: function () {
                return this.value.trim() != '';
            }
        }
    });

    var comItem = Vue.component('item', {
        props: ['item'],
        data: function () {
            return {
                actDefault: 'Activities',
                memberDefault: 'Members',
                activities: activities,
                members: members
            };
        },
        computed: {
            index: function () {
                return this.item.index;
            }
        },
        template: '\
        <div class="row">\
            <item-checkbox ref="checkbox" :index="index"></item-checkbox>\
            <item-select ref="selMem" :index="index" :data="members" :val-default="memberDefault"></item-select>\
            <item-select ref="selAct" :index="index" :data="activities" :val-default="actDefault"></item-select>\
            <item-input ref="input" :index="index"></item-input>\
        </div>',
        components: {
            itemCheckbox: itemCheckbox,
            itemSelect: itemSelect,
            itemInput: itemInput
        },
        methods: {
            valid: function () {
                var refs = this.$refs;
                return refs.selMem.valid() && refs.selAct.valid() || refs.input.valid();
            },
            getData: function () {
                var refs = this.$refs;
                return {
                    name: refs.selMem.value,
                    activity: refs.selAct.value,
                    pay: refs.input.value
                };
            }
        }
    });

    new Vue({
        el: '.wrapper',
        data: {
            activities: activities,
            members: members,
            items: [{index: 0}]
        },
        methods: {
            addItems: function () {
                var value = {index: utils.newIndex(this.items)};
                // utils.locals.pushArray(_key, value);
                this.items.push(value);
            },
            count: function () {
                list = [];
                this.$refs.item.forEach(function (item) {
                    if (item.valid()) {
                        list.push(item.getData());
                    }
                });
                if (!list.length)
                    alert('data is empty');
                console.dir(new Calculator(list).getResult());
            }
        }
    });
})(window.Utils);