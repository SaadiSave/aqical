"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aqi_1 = require("./aqi");
// Testing
const pd = new aqi_1.dict(['co'], [72100]);
const O = new aqi_1.Mmaqi(pd);
O.setres();
console.log(O.res);
O.setdes();
console.log(O.des);
O.setcol();
console.log(O.col);
