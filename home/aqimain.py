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
import pandas as pd
from typing import Dict

class aqi:
    def __init__(self, syst: str, pdict: Dict[str, float]) -> None:
        try: assert((syst == 'eur') or (syst == 'ind'))
        except AssertionError:
            print("Only ind and eur are accepted values for system")
            raise ValueError
        self.system = syst
        self.__vals = pdict
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
    def __init__(self) -> None:
        self.__NAQI = pd.DataFrame({
            'AQI' : ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor', 'Extremely Poor'],
            'pm2' : [10, 20, 25, 50, 75, 800],
            'pm10' : [20, 40, 50, 100, 150, 1200],
            'no2' : [40, 90, 120, 230, 340, 1000],
            'o3' : [50, 100, 130, 240, 380, 800],
            'so2' : [100, 200, 350, 500, 750, 1250]
        })
    def setres(self):
        pass
