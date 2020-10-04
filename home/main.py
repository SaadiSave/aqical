# A file to test the prog
from test import aqi
O = aqi('eur', pdict={
    'pm2' : 50,
    'pm10' : 100,
    'so2' : 100,
    'no2' : 100,
    'o3' : 100,
})
O.setres()
O.set_des()
print(f"{O.getres()}\n{O.des}\n{O.get_color()}")