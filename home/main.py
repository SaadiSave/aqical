# A file to test the prog
from test import aqi
O = aqi('eur', pdict={
    'pm2' : 700,
    'pm10' : 1100,
    'so2' : 1100,
    'no2' : 900,
    'o3' : 700,
})
O.setres()
O.set_des()
print(f"{O.getres()}\n{O.des}\n{O.get_color()}")