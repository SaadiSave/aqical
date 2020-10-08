# A file to test the prog
from aqim import aqi
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

s = aqi('ind', pdict={
    'pm2' : 56,
    'pm10' : 116,
    'so2' : 130,
    'no2' : 112,
    'o3' : 108,
    'co' : 1008,
})
s.setres()
s.set_des()
print(f"{s.getres()}\n{s.des}\n{s.get_color()}")