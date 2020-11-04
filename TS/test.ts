import { Aqi, Eaqi, dict, Naqi } from './aqi';
// Testing
let pd = new dict(['pm2'], [260]);
let O = new Naqi(pd);
O.setres();
console.log(O.res);
O.setdes();
console.log(O.des);
O.setcol();
console.log(O.col);
