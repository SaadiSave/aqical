# A file to test the prog
import aqim
import test2 as t
# O = aqim.aqi('eur', pdict={
#     'pm2' : 50,
#     'pm10' : 100,
#     'so2' : 100,
#     'no2' : 100,
#     'o3' : 100,
# })
# O.setres()
# O.set_des()
# print(f"{O.getres()}\n{O.des}\n{O.get_color()}")

O = t.Eaqi(pdict={
    'pm2' : 50,
    'pm10' : 100,
    'so2' : 100,
    'no2' : 100,
    'o3' : 100,
    'co' : 1000
})
O.set_res()
O.set_des()
O.set_col()
try:
    assert(isinstance(O.des, tuple))
    a, b = O.des
    print(f"{O.res}\n{a}\n{b}\n{O.col}")
except AssertionError:
    print(f"{O.res}\n{O.des}\n{O.col}")

O = t.Naqi(pdict={
    'pm2' : 50,
    'pm10' : 100,
    'so2' : 100,
    'no2' : 100,
    'o3' : 100,
    'co' : 1000
})
O.set_res()
O.set_des()
O.set_col()
print(f"{O.res}\n{O.des}\n{O.col}")

# s = aqim.aqi('ind', pdict={
#     'pm2' : 56,
#     'pm10' : 116,
#     'so2' : 130,
#     'no2' : 112,
#     'o3' : 108,
#     'co' : 122000,
# })
# s.setres()
# s.set_des()
# print(f"{s.getres()}\n{s.des}\n{s.get_color()}")