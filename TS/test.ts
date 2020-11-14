import { Aqi, Eaqi, dict, Naqi, Mmaqi } from './aqi'
// Testing
const pd = new dict(['co'], [34400])
const O = new Mmaqi(pd)
O.setres()
console.log(O.res)
O.setdes()
console.log(O.des)
O.setcol()
console.log(O.col)
