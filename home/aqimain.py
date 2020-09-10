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
        self.des: str
    def getres(self) -> int:
        return self.__res

class eaqi(aqi):
    def __init__(self) -> None:
        self.__EAQI = {
            'AQI' : [1, 2, 3, 4, 5, 6],
            'pm2' : [10, 20, 25, 50, 75, 800],
            'pm10' : [20, 40, 50, 100, 150, 1200],
            'no2' : [40, 90, 120, 230, 340, 1000],
            'o3' : [50, 100, 130, 240, 380, 800],
            'so2' : [100, 200, 350, 500, 750, 1250]
        }
        self.__edes: Dict[int, str] = {
            1 : 'Good',
            2 : 'Fair',
            3 : 'Moderate',
            4 : 'Poor',
            5 : 'Very Poor',
            6 : 'Extremely Poor'
        }

    def set_eaqi_des(self):
        self.des = self.__edes.get(self.__res, 'Invalid')

    def get_eaqi_colour(self):
        eaqi_colour = {
            'Good' : 'cyan',
            'Fair' : '#00CC99',
            'Moderate' : 'yellow',
            'Poor' : '#F75133',
            'Very Poor' : 'maroon',
            'Extremely Poor' : 'purple'
        }
        return eaqi_colour.get(self.des, 'Invalid')

    def setres(self):
        caqi: List[int] = []
        for i in self.__vals:
            thresh = self.__EAQI.get(i)
            j = 0
            for j in thresh:
                if self.__vals.get(i) <= j: break
            caqi.append(thresh.index(j) + 1)
        self.__res = max(caqi)

class naqi(aqi):
    def __init__(self) -> None:
        self.__NAQI = {
            'AQI' : ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor', 'Extremely Poor'],
            'pm2' : [10, 20, 25, 50, 75, 800],
            'pm10' : [20, 40, 50, 100, 150, 1200],
            'no2' : [40, 90, 120, 230, 340, 1000],
            'o3' : [50, 100, 130, 240, 380, 800],
            'so2' : [100, 200, 350, 500, 750, 1250]
        }
        self.__ndes: Dict[int, str] = {
            1 : 'Good',
            2 : 'Satisfactory',
            3 : 'Moderate',
            4 : 'Poor',
            5 : 'Very Poor',
            6 : 'Severe'
        }

    def set_naqi_des(self):
        self.des = self.__ndes.get(self.__res, 'Invalid')

    def get_naqi_color(self):
        naqi_color = {
            'Good' : '#009933',
            'Satisfactory' : '#58FF09',
            'Moderate' : 'yellow',
            'Poor' : 'orange',
            'Very Poor' : 'red',
            'Severe' : '#990000'
        }
        return naqi_color.get(self.des, 'Invalid')

    def setres(self):
        pass

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