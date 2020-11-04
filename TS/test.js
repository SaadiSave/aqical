var aqi_1 = require('./aqi');
// Testing
var pd = new aqi_1.dict(['pm2'], [260]);
var O = new aqi_1.Naqi(pd);
O.setres();
console.log(O.res);
O.setdes();
console.log(O.des);
O.setcol();
console.log(O.col);
