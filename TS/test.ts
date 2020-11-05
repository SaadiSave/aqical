import { Aqi, Eaqi, dict, Naqi, Mmaqi } from './aqi';
// Testing
let pd = new dict(['co'], [42400]);
let O = new Mmaqi(pd);
O.setres();
console.log(O.res);
O.setdes();
console.log(O.des);
O.setcol();
console.log(O.col);
