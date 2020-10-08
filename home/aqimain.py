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
from typing import Dict, List

class aqi:
    def __init__(self, syst: str, pdict: Dict[str, float]) -> None:
        try: assert((syst == 'eur') or (syst == 'ind'))
        except AssertionError:
            print('Only ind and eur are accepted values for system')
            raise ValueError
        self.__system = syst
        self.__vals = pdict
        self.__res: int
        self.__aqi: int
        self.des = ""
        if self.__system == "eur":
            self.__EAQI = {
            'AQI' : [1, 2, 3, 4, 5, 6],
            'pm2' : [10, 20, 25, 50, 75, 800],
            'pm10' : [20, 40, 50, 100, 150, 1200],
            'no2' : [40, 90, 120, 230, 340, 1000],
            'o3' : [50, 100, 130, 240, 380, 800],
            'so2' : [100, 200, 350, 500, 750, 1250]
            }
            self.__ades: Dict[int, str] = {
                1 : 'Good',
                2 : 'Fair',
                3 : 'Moderate',
                4 : 'Poor',
                5 : 'Very Poor',
                6 : 'Extremely Poor'
            }
        else:
            x = self.__vals.get('co', None)
            if x != None:
                self.__vals['co'] = x / 100
            self.__NAQI = {
                'AQI' : [1, 2, 3, 4, 5],
                'pm2' : [30, 60, 90, 120, 250],
                'pm10' : [50, 100, 250, 350, 430],
                'no2' : [40, 80, 180, 280, 400],
                'o3' : [50, 100, 168, 208, 748],
                'so2' : [40, 80, 380, 800, 1600],
                'co' : [10, 20, 100, 170, 340]
            }
            self.__ades: Dict[int, str] = {
                1 : 'Good',
                2 : 'Satisfactory',
                3 : 'Moderate',
                4 : 'Poor',
                5 : 'Very Poor',
                6 : 'Severe'
            }
            self.__Ival = {
                1 : (0, 50),
                2 : (51, 100),
                3 : (101, 200),
                4 : (201, 300),
                5 : (301, 400)
            }
    def getres(self) -> int:
        return self.__aqi

    def set_des(self):
        if (self.des == ""):
            self.des = self.__ades.get(self.__res, 'Invalid')

    def get_color(self):
        if (self.des == "How are you even alive?"):
            return "#000000"
        if self.__system == 'eur':
            eaqi_colour = {
            'Good' : '#00ffff',
            'Fair' : '#00cc99',
            'Moderate' : '#ffff00',
            'Poor' : '#f75133',
            'Very Poor' : '#800000',
            'Extremely Poor' : '#800080'
            }
            return eaqi_colour.get(self.des, 'Invalid')
        else:
            naqi_color = {
            'Good' : '#009933',
            'Satisfactory' : '#58ff09',
            'Moderate' : '#ffff00',
            'Poor' : '#ffa500',
            'Very Poor' : '#ff0000',
            'Severe' : '#990000'
            }
            return naqi_color.get(self.des, 'Invalid')

    def setres(self):
        caqi: List[int] = []
        if self.__system == "eur":
            for i in self.__vals:
                thresh = self.__EAQI.get(i)
                if (self.__vals.get(i) > thresh[5]):
                    self.des = "How are you even alive?"
                j = 0
                for j in thresh:
                    if self.__vals.get(i) <= j: break
                caqi.append(thresh.index(j) + 1)
            self.__aqi = max(caqi)
            self.__res = self.__aqi
        else:
            res: List[int] = []
            for i in self.__vals:
                thresh = self.__NAQI.get(i)
                if (self.__vals.get(i) > thresh[4]):
                    caqi.append(int(round((((401/thresh[4]) * (self.__vals.get(i) - thresh[4])) + 401), 0)))
                    res.append(6)
                else:
                    j = 0
                    for j in thresh:
                        if self.__vals.get(i) <= j: break
                    x = thresh.index(j) + 1
                    Il, Ih = self.__Ival.get(x, (0, 0))
                    if thresh.index(j) != 0:
                        Bl = thresh[thresh.index(j) - 1] + 1
                    else: Bl = 0
                    Bh = j
                    caqi.append(int(round(((((Ih - Il)/(Bh - Bl)) * (self.__vals.get(i) - Bl)) + Il), 0)))
                    res.append(thresh.index(j) + 1)

            self.__aqi = max(caqi)
            self.__res = max(res)

def conversion(pollutant: str, value: float, unit: str):
    y = {
        'CO' : 28,
        'NO2' : 46,
        'O3' : 48,
        'SO2' : 64
    }
    if unit == 'ppm':
        mass = y[pollutant]
        v = value * 0.0409 * mass * 1000
        return round(v, 2)
    elif unit == 'ppb':
        mass = y[pollutant]
        v = value * 0.0409 * mass
        return round(v, 2)
    else: return round(value, 2)