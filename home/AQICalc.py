#!/usr/bin/python3
import test2 as t
from os import system, name
from time import sleep

def cls():
    if name == 'nt': 
        _ = system('cls')
    else: 
        _ = system('clear')

print("AQI Calc is starting", end='')
for i in range(2):
    print(".", end='')
    sleep(0.7)
print('.')
sleep(1)
cls()

s = None
while s == None:
    try: s = int(input("1: Compare indices\n2: Calculate a single index\n> "))
    except ValueError: print("Enter only from one of the below options")
cls()

d = {
    1: 'ug',
    2: 'ppm',
    3: 'ppb'
}
pd = {}

v = None
while 1:
    v = input("Enter the concentration of PM 2.5 in ug m⁻³.\nType 0 if you do not wish to enter this pollutant.\n> ")
    if v != None:
        try:
            v = float(v)
            break
        except ValueError: print("Enter only from one of the given options")
if v != 0: pd['pm2'] = v

v = None
while 1:
    v = input("Enter the concentration of PM 10 in ug m⁻³.\nType 0 if you do not wish to enter this pollutant.\n> ")
    if v != None:
        try:
            v = float(v)
            break
        except ValueError: print("Enter only from one of the given options")
if v != 0: pd['pm10'] = v

v = None
while 1:
    v = input("Enter the concentration of sulfur dioxide in ug m⁻³.\nType 0 if you do not wish to enter this pollutant.\n> ")
    if v != None:
        try:
            v = float(v)
            break
        except ValueError: print("Enter only from one of the given options")
if v != 0: pd['so2'] = v

v = None
while 1:
    v = input("Enter the concentration of nitrogen dioxide in ug m⁻³.\nType 0 if you do not wish to enter this pollutant.\n> ")
    if v != None:
        try:
            v = float(v)
            break
        except ValueError: print("Enter only from one of the given options")
if v != 0: pd['no2'] = v

v = None
while 1:
    v = input("Enter the concentration of carbon monoxide in ug m⁻³.\nType 0 if you do not wish to enter this pollutant.\n> ")
    if v != None:
        try:
            v = float(v)
            break
        except ValueError: print("Enter only from one of the given options")
if v != 0: pd['co'] = v

v = None
while 1:
    v = input("Enter the concentration of ozone in ug m⁻³.\nType 0 if you do not wish to enter this pollutant.\n> ")
    if v != None:
        try:
            v = float(v)
            break
        except ValueError: print("Enter only from one of the given options")
if v != 0: pd['o3'] = v

del v
cls()

a = None
while True:
    try:
        a = int(input("Choose an index:\n1\tEuropean Air Quality Index\n2\tNational Air Quality Index\nEnter a number from the options above\n> "))
        assert((a == 1) or (a == 2))
        break
    except AssertionError or ValueError: print("Enter only from one of the given options")

print("\n\n")
if a == 1:
    O = t.Eaqi(pdict=pd)
    O.set_res()
    O.set_des()
    O.set_col()
    a, b = O.des
    print(f"AQI: {O.res}\nHealthy individuals: {a}\nIndividuals with pre existing conditions: {b}")
elif a == 2:
    O = t.Naqi(pdict=pd)
    O.set_res()
    O.set_des()
    O.set_col()
    print(f"AQI: {O.res}\nDescription: {O.des}")
