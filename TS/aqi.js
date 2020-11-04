var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dict = (function () {
    function dict(keys, vals) {
        this.keys = keys;
        this.vals = vals;
        if (this.keys.length !== this.vals.length) {
            throw Error('The number of keys is not equal to the number of values. This dict is invalid.');
        }
    }
    dict.prototype.getval = function (key, otherwise) {
        if (otherwise === void 0) { otherwise = undefined; }
        var x = this.keys.indexOf(key);
        if (x === -1) {
            return otherwise;
        }
        else {
            return this.vals[x];
        }
    };
    dict.prototype.update = function (key, val) {
        var x = this.keys.indexOf(key);
        if (x === -1) {
            this.keys.push(key);
            this.vals.push(val);
        }
        else {
            this.vals[x] = val;
        }
    };
    return dict;
})();
exports.dict = dict;
var Aqi = (function () {
    function Aqi(pdict) {
        this.vals = pdict;
        this.des = '';
    }
    return Aqi;
})();
exports.Aqi = Aqi;
var Eaqi = (function (_super) {
    __extends(Eaqi, _super);
    function Eaqi(pdict) {
        _super.call(this, pdict);
        this.EAQI = new dict(['pm2', 'pm10', 'no2', 'o3', 'so2'], [[10, 20, 25, 50, 75, 800], [20, 40, 50, 100, 150, 1200], [40, 90, 120, 230, 340, 1000], [50, 100, 130, 240, 380, 800], [100, 200, 350, 500, 750, 1250]]);
        this.IDX = new dict([1, 2, 3, 4, 5, 6], ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor', 'Extremely Poor']);
        this.DES = new dict([1, 2, 3, 4, 5, 6], [['The air quality is good. Enjoy your usual outdoor activities.', 'The air quality is good. Enjoy your usual outdoor activities.'], ['Enjoy your usual outdoor activities.', 'Enjoy your usual outdoor activities.'], ['Enjoy your usual outdoor activities.', 'Consider reducing intense outdoor activities, if you experience symptoms.'], ['Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.', 'Consider reducing physical activities, particularly outdoors, especially if you experience symptoms.'], ['Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.', 'Reduce physical activities, particularly outdoors, especially if you experience symptoms.'], ['Reduce physical activities outdoors.', 'Avoid physical activities outdoors.']]);
        this.colour = new dict([1, 2, 3, 4, 5, 6], ['#0000ff', '#00cc99', '#ffff00', '#f75133', '#800000', '#800080']);
    }
    Eaqi.prototype.setres = function () {
        var caqi = [];
        for (var i = 0; i < this.vals.keys.length; i++) {
            var x = this.vals.keys[i];
            var thresh = this.EAQI.getval(x);
            if (this.vals.getval(x) > thresh[5]) {
                this.des = 'How are you still alive?';
            }
            var j = 0;
            for (var k = 0; k < thresh.length; k++) {
                j = thresh[k];
                if (this.vals.getval(x) <= j) {
                    break;
                }
            }
            var y = thresh.indexOf(j) + 1;
            caqi.push(y);
        }
        this.idx = Math.max.apply(Math, caqi);
        this.res = this.IDX.getval(this.idx, '');
    };
    Eaqi.prototype.setdes = function () {
        if (this.des === '') {
            this.des = "Healthy Individuals: " + this.DES.getval(this.idx, ['Invalid', 'Invalid'])[0] + " \nIndividuals with pre-existing conditions: " + this.DES.getval(this.idx, ['Invalid', 'Invalid'])[1];
        }
    };
    Eaqi.prototype.setcol = function () {
        if (this.des === 'How are you still alive?') {
            this.col = '#000000';
        }
        else {
            this.col = this.colour.getval(this.idx, '#ffffff');
        }
    };
    return Eaqi;
})(Aqi);
exports.Eaqi = Eaqi;
var Naqi = (function (_super) {
    __extends(Naqi, _super);
    function Naqi(pdict) {
        _super.call(this, pdict);
        try {
            if (this.vals.getval('co') === undefined) {
                throw Error('key co does not exist');
            }
            else {
                this.vals.update('co', (this.vals.getval('co') / 100));
            }
        }
        catch (error) { }
        this.NAQI = new dict(['pm2', 'pm10', 'no2', 'o3', 'so2', 'co'], [[30, 60, 90, 120, 250], [50, 100, 250, 350, 430], [40, 80, 180, 280, 400], [50, 100, 168, 208, 748], [40, 80, 380, 800, 1600], [10, 20, 100, 170, 340]]);
        this.DES = new dict([1, 2, 3, 4, 5, 6], ['Good', 'Satisfactory', 'Moderate', 'Poor', 'Very Poor', 'Severe']);
        this.Ival = new dict([1, 2, 3, 4, 5], [[0, 50], [51, 100], [101, 200], [201, 300], [301, 400]]);
        this.colour = new dict([1, 2, 3, 4, 5, 6], ['#009933', '#58ff09', '#ffff00', '#ffa500', '#ff0000', '#990000']);
    }
    Naqi.prototype.setres = function () {
        var caqi = [];
        var ind = [];
        for (var i = 0; i < this.vals.keys.length; i++) {
            var x = this.vals.keys[i];
            var thresh = this.NAQI.getval(x);
            if (this.vals.getval(i) > thresh[4]) {
                caqi.push(Math.round((((401 / thresh[4]) * (this.vals.getval(i) - thresh[4])) + 401)));
                ind.push(6);
            }
            else {
                var j = 0;
                for (var k = 0; k < thresh.length; k++) {
                    j = thresh[k];
                    if (this.vals.getval(x) <= j) {
                        break;
                    }
                }
                var y = thresh.indexOf(j);
                ind.push();
                if (y !== 0) {
                    if (this.vals.getval(x) < thresh[y - 1] + 1) {
                        j = thresh[y - 1];
                        y = thresh.indexOf(j);
                    }
                }
                var z = y + 1;
                var _a = this.Ival.getval(z, [0, 0]), Il = _a[0], Ih = _a[1];
                var Bl = 0;
                if (y !== 0) {
                    Bl = thresh[y - 1] + 1;
                }
                var Bh = j;
                caqi.push(Math.round((((Ih - Il) / (Bh - Bl)) * (this.vals.getval(x) - Bl)) + Il));
            }
        }
        this.res = Math.max.apply(Math, caqi).toString();
        this.idx = Math.max.apply(Math, ind);
    };
    return Naqi;
})(Aqi);
exports.Naqi = Naqi;
