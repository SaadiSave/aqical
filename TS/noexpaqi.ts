/* AQICALC for the calculation of air quality index
    Copyright (C) 2020  Varun Jain , Saadi Save

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>. */
    class dict {
        keys: Array<any>;
        vals: Array<any>;
    
        constructor(keys: Array<any>, vals: Array<any>) {
            this.keys = keys;
            this.vals = vals;
            if (this.keys.length !== this.vals.length) {
                throw Error('The number of keys is not equal to the number of values. This dict is invalid.');
            }
        }
        getval(key: any, otherwise: any = undefined): any {
            let x: number = this.keys.indexOf(key);
            if (x === -1) {
                return otherwise;
            } else {
                return this.vals[x];
            }
        }
        update(key: any, val: any) {
            let x: number = this.keys.indexOf(key);
            if (x === -1) {
                this.keys.push(key);
                this.vals.push(val);
            } else {
                this.vals[x] = val;
            }
        }
    }
    
    class Aqi {
        vals: dict;
        res: string;
        des: string;
        col: string;
    
        constructor(pdict: dict) {
            this.vals = pdict;
            this.des = '';
        }
    }
    
    class Eaqi extends Aqi {
        EAQI: dict;
        IDX: dict;
        idx: number;
        DES: dict;
        colour: dict;
    
        constructor(pdict: dict) {
            super(pdict);
            let x = this.vals.keys.indexOf('co');
            if(x !== -1) {
                this.vals.keys.splice(x, 1);
                this.vals.vals.splice(x, 1);
            }
            this.EAQI = new dict(['pm2', 'pm10', 'no2', 'o3', 'so2'], [[10, 20, 25, 50, 75, 800], [20, 40, 50, 100, 150, 1200], [40, 90, 120, 230, 340, 1000], [50, 100, 130, 240, 380, 800], [100, 200, 350, 500, 750, 1250]]);
            this.IDX = new dict([1, 2, 3, 4, 5, 6], ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor', 'Extremely Poor']);
            this.DES = new dict([1, 2, 3, 4, 5, 6], [['The air quality is good. Enjoy your usual outdoor activities.', 'The air quality is good. Enjoy your usual outdoor activities.'], ['Enjoy your usual outdoor activities.', 'Enjoy your usual outdoor activities.'], ['Enjoy your usual outdoor activities.', 'Consider reducing intense outdoor activities, if you experience symptoms.'], ['Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.', 'Consider reducing physical activities, particularly outdoors, especially if you experience symptoms.'], ['Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.', 'Reduce physical activities, particularly outdoors, especially if you experience symptoms.'], ['Reduce physical activities outdoors.', 'Avoid physical activities outdoors.']]);
            this.colour = new dict([1, 2, 3, 4, 5, 6], ['#0000ff', '#00cc99', '#ffff00', '#f75133', '#800000', '#800080']);
        }
        setres() {
            let caqi: Array<number> = [];
            for (let i = 0; i < this.vals.keys.length; i++) {
                const x = this.vals.keys[i];
                let thresh = this.EAQI.getval(x);
                if (this.vals.getval(x) > thresh[5]) {
                    this.des = 'How are you still alive?';
                }
                let j = 0;
                for (let k = 0; k < thresh.length; k++) {
                    j = thresh[k];
                    if (this.vals.getval(x) <= j) {
                        break;
                    }
                }
                let y = thresh.indexOf(j) + 1;
                caqi.push(y);
            }
            this.idx = Math.max(...caqi);
            this.res = this.IDX.getval(this.idx, '');
        }
        setdes() {
            if (this.des === '') {
                let [a, b] = this.DES.getval(this.idx, ['Invalid', 'Invalid']);
                this.des = `Health messages:\nGeneral population: ${a}\nSensitive populations: ${b}`;
            }
        }
        setcol() {
            if (this.des === 'How are you still alive?') {
                this.col = '#000000';
            } else {
                this.col = this.colour.getval(this.idx, '#ffffff');
            }
        }
    }
    
    class Naqi extends Aqi {
        NAQI: dict;
        idx: number;
        DES: dict;
        HM: dict;
        Ival: dict;
        colour: dict;
    
        constructor(pdict: dict) {
            super(pdict);
            try {
                if (this.vals.getval('co') === undefined) {
                    throw Error('key co does not exist');
                } else {
                    this.vals.update('co', (this.vals.getval('co') / 100));
                }
            } catch (error) {}
            this.NAQI = new dict(['pm2', 'pm10', 'no2', 'o3', 'so2', 'co'], [[30, 60, 90, 120, 250], [50, 100, 250, 350, 430], [40, 80, 180, 280, 400], [50, 100, 168, 208, 748], [40, 80, 380, 800, 1600], [10, 20, 100, 170, 340]]);
            this.DES = new dict([1, 2, 3, 4, 5, 6], ['Good', 'Satisfactory', 'Moderate', 'Poor', 'Very Poor', 'Severe']);
            this.HM = new dict([1, 2, 3,4, 5, 6], ['Minimal Impact', 'May cause minor breathing discomfort to sensitive people', 'May cause breathing discomfort to the people with lung disease such as asthma and discomfort to people with heart disease, children and older adults', 'May cause breathing discomfort to people on prolonged exposure and discomfort to people with heart disease with short exposure', 'May cause respiratory illness to the people on prolonged exposure. Effects may be more pronounced in people with lung and heart diseases', 'May cause respiratory effects even on healthy people and serious health impacts on people with lung/heart diseases. The health impacts may be experienced even during light physical activity'])
            this.Ival = new dict([1, 2, 3, 4, 5], [[0, 50], [51, 100], [101, 200], [201, 300], [301, 400]]);
            this.colour = new dict([1, 2, 3, 4, 5, 6], ['#009933', '#58ff09', '#ffff00', '#ffa500', '#ff0000', '#990000']);
        }
        setres() {
            let caqi: Array<number> = [];
            let ind: Array<number> = [];
            for (let i = 0; i < this.vals.keys.length; i++) {
                const x = this.vals.keys[i];
                let thresh = this.NAQI.getval(x);
                if (this.vals.getval(x) > thresh[4]) {
                    caqi.push(Math.round((((401 / thresh[4]) * (this.vals.getval(x) - thresh[4])) + 401)));
                    ind.push(6);
                } else {
                    let j = 0;
                    for (let k = 0; k < thresh.length; k++) {
                        j = thresh[k];
                        if (this.vals.getval(x) <= j) {
                            break;
                        }
                    }
                    let y = thresh.indexOf(j) + 1;
                    ind.push(y);
                    if (y !== 0) {
                        if (this.vals.getval(x) < thresh[y - 1] + 1) {
                            j = thresh[y - 1];
                            y = thresh.indexOf(j);
                        }
                    }
                    const z = y + 1;
                    let [Il, Ih] = this.Ival.getval(z, [0, 0]);
                    let Bl = 0;
                    if (y !== 0) {
                        Bl = thresh[y - 1] + 1;
                    }
                    let Bh = j;
                    caqi.push(Math.round((((Ih - Il) / (Bh - Bl)) * (this.vals.getval(x) - Bl)) + Il));
                }
            }
            this.res = Math.max(...caqi).toString();
            this.idx = Math.max(...ind);
        }
        setdes() {
            if (parseInt(this.res) > 500) {
                this.des = 'Extremely severe. Avoid going outdoors.';
            } else {
                this.des = `Description: ${this.DES.getval(this.idx)}\nHealth messages: ${this.HM.getval(this.idx)}`;
            }
        }
        setcol() {
            if (parseInt(this.res) > 700) {
                this.col = '#000000';
            } else {
                this.col = this.colour.getval(this.idx, '#ffffff');
            }
        }
    }
    
    class Mmaqi extends Aqi {
        MmAQI: dict;
        idx: number;
        DES: dict;
        HM: dict;
        Ival: dict;
        colour: dict;
    
        constructor(pdict: dict) {
            super(pdict);
            try {
                if (this.vals.getval('co') === undefined) {
                    throw Error('key co does not exist');
                } else {
                    this.vals.update('co', (this.vals.getval('co') / 100));
                }
            } catch (error) {}
            this.MmAQI = new dict(['pm2', 'pm10', 'no2', 'o3', 'so2', 'co'], [[10, 25, 50, 75, 150], [20, 50, 75, 150, 230], [40, 80, 120, 230, 340], [50, 100, 130, 240, 380], [20, 80, 200, 500, 750], [20, 100, 150, 250, 340]]);
            this.DES = new dict([1, 2, 3, 4, 5, 6, 7], ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor', 'Extremely Poor', 'Severe']);
            this.HM = new dict([1, 2, 3, 4, 5, 6, 7], [['The air quality is good. Enjoy your usual outdoor activities.', 'The air quality is good. Enjoy your usual outdoor activities.'], ['Enjoy your usual outdoor activities.', 'Enjoy your usual outdoor activities.'], ['Enjoy your usual outdoor activities.', 'Consider reducing intense outdoor activities, if you experience symptoms.'], ['Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.', 'Consider reducing physical activities, particularly outdoors, especially if you experience symptoms.'], ['Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.', 'Reduce physical activities, particularly outdoors, especially if you experience symptoms.'], ['Reduce physical activities outdoors.', 'Avoid physical activities outdoors.'], ['Avoid physical activities outdoors.', 'Do not go outdoors.']]);
            this.Ival = new dict([1, 2, 3, 4, 5], [[0, 50], [51, 100], [101, 200], [201, 300], [301, 400]]);
            this.colour = new dict([1, 2, 3, 4, 5, 6, 7], ['#0000ff', '#00cc99', '#ffff00', '#f75133', '#800000', '#800080', '#000000']);
        }
        setres() {
            let caqi: Array<number> = [];
            let ind: Array<number> = [];
            for (let i = 0; i < this.vals.keys.length; i++) {
                const x = this.vals.keys[i];
                let thresh = this.MmAQI.getval(x);
                if (this.vals.getval(x) > thresh[4]) {
                    caqi.push(Math.round((((401 / thresh[4]) * (this.vals.getval(x) - thresh[4])) + 401)));
                    ind.push(6);
                } else {
                    let j = 0;
                    for (let k = 0; k < thresh.length; k++) {
                        j = thresh[k];
                        if (this.vals.getval(x) <= j) {
                            break;
                        }
                    }
                    let y = thresh.indexOf(j) + 1;
                    ind.push(y);
                    if (y !== 0) {
                        if (this.vals.getval(x) < thresh[y - 1] + 1) {
                            j = thresh[y - 1];
                            y = thresh.indexOf(j);
                        }
                    }
                    const z = y + 1;
                    let [Il, Ih] = this.Ival.getval(z, [0, 0]);
                    let Bl = 0;
                    if (y !== 0) {
                        Bl = thresh[y - 1] + 1;
                    }
                    let Bh = j;
                    caqi.push(Math.round((((Ih - Il) / (Bh - Bl)) * (this.vals.getval(x) - Bl)) + Il));
                }
            }
            this.res = Math.max(...caqi).toString();
            this.idx = Math.max(...ind);
            if (parseInt(this.res) > 500) {
                this.idx = 7;
            }
        }
        setdes() {
            let [a, b] = this.HM.getval(this.idx, ['Invalid', 'Invalid']);
            this.des = `${this.DES.getval(this.idx, 'Invalid')}\nHealth messages:\nGeneral population: ${a}\nSensitive populations: ${b}`;
        }
        setcol() {
            this.col = this.colour.getval(this.idx, '#ffffff');
        }
    }
    
    function convert(pollutant: string, value: number, unit: string): number {
        let y = new dict(['co', 'no2', 'o3', 'so2'], [28, 46, 48, 64]);
        if (unit === 'ppm') {
            let m = y.getval(pollutant);
            value = value * 40.9 * m;
        } else if (unit === 'ppb') {
            let m = y.getval(pollutant);
            value = value * 0.0409 * m;
        }
        return Math.round(value * 100) / 100
    }
    
    function compare(a: Array<number>, b: Array<number>): number | string {
        /*
        a is the index to be compared with b 
        format:
        a = [aval, amax]
        b = [bval, bmax]
        compare(a, b)
        */
       let [a1, a2] = a;
       let [b1, b2] = b;
       if ((a1 <= a2) && (b1 <= b2)) {
           return Math.round((1 - ((b1 * a2) / (a1 * b2))) * 100);
       } else {
           return 'Invalid';
       }
    }
    