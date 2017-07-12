/**
 * Created by shirley on 23/06/2017.
 */

/* VM */
(function (utils) {
    var key = 'List', list = [],
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
        props: ['valDefault', 'data', 'val'],
        template: '\
        <div class="col-xs-3 col-md-3 col-lg-3">\
        <select class="form-control" \
        @change="change"\
        v-model:value="value">\
            <option v-for="(name, index) in all" v-text="name" :disabled="index==0"></option>\
        </select>\
        </div>\
        '
        ,
        data: function () {
            return {
                value: this.val || this.valDefault
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
        props: ['val'],
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
            return {
                value: typeof this.val != 'undefined' ? this.val : ''
            }
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

    Vue.component('item', {
        props: ['activities', 'members', 'item'],
        data: function () {
            return {
                actDefault: 'Activities',
                memberDefault: 'Members'
            };
        },
        computed: {
            index: function () {
                return this.item.index;
            }
        },
        template: '\
        <div class="row">\
            <item-select ref="name" :data="members" :val-default="memberDefault" :val="item.name"></item-select>\
            <item-select ref="act" :data="activities" :val-default="actDefault" :val="item.activity"></item-select>\
            <item-input ref="input" :val="item.pay"></item-input>\
        </div>',
        components: {
            itemCheckbox: itemCheckbox,
            itemSelect: itemSelect,
            itemInput: itemInput
        },
        methods: {
            valid: function () {
                var refs = this.$refs;
                return refs.name.valid() && refs.act.valid() || refs.input.valid();
            },
            getData: function () {
                var refs = this.$refs,
                    values = {
                        index: this.index,
                        name: refs.name.value,
                        activity: refs.act.value,
                        pay: refs.input.value
                    };
                return values;
            }
        }
    });

    new Vue({
        el: '.wrapper',
        data: {
            activities: activities,
            members: members,
            modalTitle: 'Calculate result',
            items: utils.locals.getArray(key, [[{index: 0}]])[0]
        },
        methods: {
            addItems: function () {
                this.items.push({index: utils.newIndex(this.items)});
            },
            count: function () {
                list = [];
                this.$refs.item.forEach(function (item) {
                    if (item.valid()) {
                        list.push(item.getData());
                    }
                });
                utils.locals.setArray(key, [list]);
                if (!list.length)
                    alert('data is empty');
                var cal = new Calculator(list);
                console.log(cal.getResult());
            }
        }
    });
})(window.Utils);