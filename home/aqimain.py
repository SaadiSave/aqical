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
from os import system
import pandas as pd
from typing import Dict

class aqi:
    def __init__(self, syst: str, pm2: float, pm10: float, no2: float, o3: float, so2: float) -> None:
        try: assert((syst == 'eur') or (syst == 'ind'))
        except AssertionError:
            print("Only ind and eur are accepted values")
            raise ValueError
        self.system = syst
        self.__vals: Dict[str, float] = {
            'pm2' : pm2,
            'pm10' : pm10,
            'no2' : no2,
            'o3' : o3,
            'so2' : so2
        }
        self.__res: str
        self.cat: int # 1, 2, 3, 4, 5, 6
    def getres(self) -> str:
        return self.__res

class eaqi(aqi):
    def __init__(self) -> None:
        self.__EAQI = pd.DataFrame({
            'AQI' : ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor', 'Extremely Poor'],
            'pm2' : [10, 20, 25, 50, 75, 800],
            'pm10' : [20, 40, 50, 100, 150, 1200],
            'no2' : [40, 90, 120, 230, 340, 1000],
            'o3' : [50, 100, 130, 240, 380, 800],
            'so2' : [100, 200, 350, 500, 750, 1250]
        })
    def setres(self):
        pass

class naqi(aqi):
    def __init__(self, co: float) -> None:
        self.__NAQI = pd.DataFrame({
            'AQI' : ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor', 'Extremely Poor'],
            'pm2' : [10, 20, 25, 50, 75, 800],
            'pm10' : [20, 40, 50, 100, 150, 1200],
            'no2' : [40, 90, 120, 230, 340, 1000],
            'o3' : [50, 100, 130, 240, 380, 800],
            'so2' : [100, 200, 350, 500, 750, 1250]
        })
        self.__vals['co'] = co
    def setres(self):
        pass
