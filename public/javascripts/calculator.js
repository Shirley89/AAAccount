/**
 * Created by shirley on 17/7/6.
 */
(function () {
    var _counter = {},
        _funcDefault = new Function;

    // to count cost for each member
    _counter.mapForMember = _funcDefault;
    _counter.getMapForMember = function (members) {
        return function (name, cost) {
            var self = members[name];
            if (!self) {
                self = members[name] = new Member(name);
            }
            self.addRetrieve(cost);
        };
    };
    _counter.counters = {
        average: function (members) {
            var total = 0, avr = 0;
            members.forEach(function (mem) {
                total += Number(mem.pay);
            });
            avr = _counter.roundNumber(total / members.length);
            members.map(function (mem) {
                var r = mem.pay - avr;
                mem.retrieve = _counter.roundNumber(r);
                _counter.mapForMember(mem.name, r);
            });
        },
        specify: function (members) {
            members.map(function (mem) {
                var r = Number(mem.pay) - Number(mem.cost);
                mem.retrieve = _counter.roundNumber(r);
                _counter.mapForMember(mem.name, r);
            });
        }
    };
    _counter.roundNumber = function (number, decimalPlaces) {
        var _decimalPlaces = (!decimalPlaces ? 2 : decimalPlaces),
            tmpNum = Math.pow(10, _decimalPlaces);
        return Math.round(number * tmpNum) / tmpNum;
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


    function Calculator(list) {
        this.initData();
        _setFunc(this.members);
        _clear();
        (Array.isArray(list) ? list : [])
            .forEach(_formatData.bind(this));
    }

    Calculator.prototype.initData = function () {
        this.activities = {};
        this.members = {};
    };

    function _setFunc(members) {
        _counter.mapForMember === _funcDefault &&
        (_counter.mapForMember = _counter.getMapForMember(members));
    }

    function _clear() {
        _funcDefault = null;
    }

    function _formatData(item) {
        var type = item.type ?
                item['type'] : 'average',
            act = item['activity'],
            mem = {
                name: item['name'],
                pay: item['pay']
            },
            acts = this.activities;
        type == 'specify' && (mem.cost = item['cost']);

        if (!acts[act]) {
            acts[act] = new Activity(act, type);
        }
        acts[act].addMember(mem);
    }

    function _sort(mem1, mem2) {
        return mem2.retrieve > mem1.retrieve;
    }

    function _deepCopy(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    Calculator.prototype.order = function () {
        var mems = this.members,
            positive = [], negative = [], zero = [];

        Object.keys(mems).forEach(function (name) {
            var r = mems[name].getRetrieve(),
                obj = {name: name};

            if (r == 0) {
                return zero.push(obj);
            }

            obj.retrieve = r;
            r > 0 ? positive.push(obj) :
                negative.push(obj);
        });
        positive.sort(_sort);
        negative.sort(_sort);

        return {
            positive: positive,
            negative: negative,
            zero: zero
        }
    };

    function _useIterator(arr) {
        arr.iterator = arr.keys();
        arr.unDone = 1;
    }

    function _getVal(arr) {
        var obj = arr.iterator.next();
        obj.done && arr.unDone--;
        return arr[obj.value];
    }

    Calculator.prototype.getResult = function () {
        var acts = this.activities,
            gather, zero,
            positive, negative,
            currentPos, currentNeg,
            result = [];

        // count in activity and sort
        Object.keys(acts).forEach(function (name) {
            acts[name].count();
        });
        gather = this.order();

        positive = gather.positive;
        negative = gather.negative;
        zero = gather.zero;

        // get 'pay for who'
        if (positive.length == 0 || negative.length == 0) {
            return zero.map(function (mem) {
                mem.payTo = null;
            });
        }

        var getObj = function (name) {
            return {name: name, receiveFrom: []};
        }, _result = {};
        _useIterator(positive);
        _useIterator(negative);
        currentPos = _getVal(positive);
        currentNeg = _getVal(negative);

        // calculate result of who pay for who
        (function () {
            if (!positive.unDone || !negative.unDone) {
                return;
            }

            var r, o;
            if (!_result.name) {
                _result = getObj(currentPos.name);
            }
            r = currentPos.retrieve + currentNeg.retrieve;
            r = _counter.roundNumber(r);
            o = {
                name: currentNeg.name
            };

            if (r >= 0) {
                o.amount = Math.abs(currentNeg.retrieve);
                _result.receiveFrom.push(_deepCopy(o));
                currentNeg.retrieve = 0;
                currentNeg = _getVal(negative);
            }

            if (r > 0) {
                currentPos.retrieve = r;
            }

            if (r < 0) {
                o.amount = Math.abs(currentPos.retrieve);
                _result.receiveFrom.push(_deepCopy(o));
                currentNeg.retrieve = r;
            }

            if (r <= 0) {
                result.push(_deepCopy(_result));
                currentPos.retrieve = 0;
                currentPos = _getVal(positive);
                delete _result.name;
            }

            arguments.callee.call();
        })();

        return result;
    };

    Calculator.prototype.getDetail = function () {

    };


    window.Calculator = Calculator;
})();