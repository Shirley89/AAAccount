/**
 * Created by shirley on 23/06/2017.
 */

/* VM */
(function (utils) {
    var _key = 'Accounts',
        activities = ['外卖早午饭', '路费', '海鲜居', '相机租赁'],
        members = ['果果', '阿莫', '小哈'];

    new Vue({
        el: '.wrapper',
        data: {
            selectedMem: 'Members',
            selectedAct: 'Activities',
            activities: activities,
            members: members,
            items: [{index: 0}]
        },
        computed: {
            activitiesAll: function () {
                // return utils.locals.getArray(_key);
                return [this.selectedAct].concat(this.activities);
            },
            membersAll: function () {
                return [this.selectedMem].concat(this.members);
            }
        },
        methods: {
            addItems: function () {
                var value = {index: utils.newIndex(this.items)};
                // utils.locals.pushArray(_key, value);
                this.items.push(value);
            },
            select: function (e) {
                console.info('select', getChange(e));
            },
            input: function (e) {
                console.info('input', getChange(e));
            }
        }
    });

    function getChange(e) {
        var el = e.target;
        return {
            index: el.dataset.index,
            value: el.value
        };
    }
})(window.Utils);