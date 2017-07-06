/**
 * Created by shirley on 17/7/6.
 */
(function () {
    var _counter = {},
        _funcDefault = new Function;

    // to count cost for each member
    _counter.mapForMember = _funcDefault;
    _counter.counters = {
        average: function (members) {
            var total = 0, avr = 0;
            members.forEach(function (mem) {
                total += Number(mem.pay);
            });
            // TODO: 精确至2位小数
            avr = total / members.length;
            members.map(function (mem) {
                var r = mem.pay - avr;
                mem.retrieve = r;
                _counter.mapForMember(mem.name, r);
            });
        },
        specify: function (members) {
            members.map(function (mem) {
                var r = Number(mem.pay) - mem.cost;
                mem.retrieve = r;
                _counter.mapForMember(mem.name, r);
            });
        }
    };
    _counter.getCounter = function (type) {
        var func = this.counters[type];
        return func ? func : _funcDefault;
    };


    function Member(name) {
        var _retrieve = 0;

        this.name = name;

        this.addRetrieve = function (r) {
            _retrieve += r;
        };
        this.getRetrieve = function () {
            return _retrieve;
        };
    }


    function Activity(name, type) {
        this.name = name;
        this.type = type;
        this.members = [];
    }

    Activity.prototype.addMember = function (newItem) {
        this.members.push(newItem);
    };

    Activity.prototype.count = function () {
        var count = _counter.getCounter(this.type);
        count(this.members);
    };


    // Calculator private params
    var activities = {},
        members = {};

    function Calculator(list) {
        _clear();

        (Array.isArray(list) ? list : []).forEach(_formatData);

        _setPublicMapFunc(_counter);

        this.clear();
    }

    function _clear() {
        activities = {};
        members = {};
    }

    function _formatData(item) {
        var type = item.type ?
                item['type'] : 'average',
            act = item['activity'],
            mem = {
                name: item['name'],
                pay: item['pay']
            };
        type == 'specify' && (mem.cost = item['cost']);

        if (!activities[act]) {
            activities[act] = new Activity(act, type);
        }
        activities[act].addMember(mem);
    }

    function _setPublicMapFunc(obj) {
        obj['mapForMember'] = function (name, cost) {
            var self = members[name];
            if (!self) {
                self = members[name] = new Member(name);
            }
            self.addRetrieve(cost);
        };
    }

    function _sort(mem1, mem2) {
        return mem2.retrieve - mem1.retrieve;
    }

    function _order() {
        var positive = [], negative = [], zero = [];

        Object.keys(members).forEach(function (name) {
            var r = members[name].getRetrieve(),
                obj = {name: name};

            if (r == 0) {
                return zero.push(obj);
            }

            obj.retrieve = r;
            r > 0 ? positive.push(obj) :
                negative.push(obj);
        });

        return {
            positive: positive.sort(_sort),
            negative: negative.sort(_sort),
            zero: zero
        }
    }

    function _getVal(arr) {
        var iterator = arr.iterator,
            obj = iterator.next();
        if (obj.done) return null;
        return arr[obj.value];
    }

    Calculator.prototype.getResult = function () {
        var gather,
            positive, negative,
            currentPos, currentNeg,
            result = [];

        // count in activity and sort
        Object.keys(activities).forEach(function (name) {
            activities[name].count();
        });
        gather = _order();

        positive = gather.positive;
        negative = gather.negative;

        // get pay for who
        if (positive.length == 0 || negative.length == 0) {
            return gather.zero.map(function (mem) {
                mem.payTo = null;
            });
        }

        var _resultObj = {name: '', receiveFrom: []};
        positive.iterator = negative.keys();
        negative.iterator = positive.keys();
        currentPos = _getVal(positive);
        currentNeg = _getVal(negative);
        (function () {
            var r, o;

            //TODO:还有bug
            if (currentPos == null || currentNeg == null) {
                return;
            }

            if (!_resultObj.name) {
                _resultObj.name = currentPos.name;
                _resultObj.receiveFrom = [];
            }

            r = currentPos.retrieve + currentNeg.retrieve;
            o = {
                name: currentNeg.name
            };

            if (r >= 0) {
                o.amount = currentNeg.retrieve;
                _resultObj.receiveFrom.push(Object.assign(o, {}));
                currentNeg.retrieve = 0;
                currentNeg = _getVal(negative);
            }

            if (r > 0) {
                currentPos.retrieve = r;
            }

            if (r < 0) {
                o.amount = currentPos.retrieve;
                _resultObj.receiveFrom.push(Object.assign(o, {}));
                currentNeg.retrieve = r;
            }

            if (r <= 0) {
                result.push({name: currentPos.name, receiveFrom: _resultObj.receiveFrom.slice()});
                currentPos.retrieve = 0;
                currentPos = _getVal(positive);
                _resultObj.name = '';
            }

            arguments.callee.call();
        })();

        return result;
    };

    Calculator.prototype.getDetail = function () {

    };

    Calculator.prototype.clear = function () {
        _funcDefault = null;
    };


    window.Calculator = Calculator;
})();