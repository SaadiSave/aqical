#!/usr/bin/python3
# AQICALC for the calculation of air quality index
#     Copyright (C) 2020  Varun Jain , Saadi Save

#     This program is free software: you can redistribute it and/or modify
#     it under the terms of the GNU Affero General Public License as published
#     by the Free Software Foundation, either version 3 of the License, or
#     (at your option) any later version.

#     This program is distributed in the hope that it will be useful,
#     but WITHOUT ANY WARRANTY; without even the implied warranty of
#     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#     GNU Affero General Public License for more details.

#     You should have received a copy of the GNU Affero General Public License
#     along with this program.  If not, see <https://www.gnu.org/licenses/>.

import aqi as t
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
        a = int(input("Choose an index:\n1\tEuropean Air Quality Index\n2\tNational Air Quality Index\n3\tBombay Air Quality Index\nEnter a number from the options above\n> "))
        assert((a == 1) or (a == 2) or (a == 3))
        break
    except AssertionError or ValueError: print("Enter only from one of the given options")

print("\n\n")
if a == 1:
    E = t.Eaqi(pdict=pd)
    E.set_res()
    E.set_des()
    E.set_col()
    print(f"AQI: {E.res}\n{E.des}")
elif a == 2:
    N = t.Naqi(pdict=pd)
    N.set_res()
    N.set_des()
    N.set_col()
    print(f"AQI: {N.res}\nDescription: {N.des}")
elif a == 3:
    B = t.Baqi(pdict=pd)
    B.set_res()
    B.set_des()
    B.set_col()
    print(f"AQI: {B.res}\n{B.des}")
