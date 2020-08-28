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
# Class input format
# pdict = {
#     'pm2' : 0.0,
#     'pm10' : 0.0,
#     'no2' : 0.0,
#     'so2' : 0.0,
#     'o3' : 0.0
# }
class aqi:
    def __init__(self, syst: str):
        try: assert((syst == 'eur') or (syst == 'ind') or (syst == 'usa'))
        except AssertionError: raise ValueError
        self.__system = syst
        self.__res: str
class inp(aqi):
    def __init__(self, pdict: Dict[str, float]):
        self.__vals = pdict
class eaqi(inp):
    def __init__(self):
        self.__EAQI = pd.DataFrame({
            'AQI' : ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor', 'Extremely Poor'],
            'pm2' : [10, 20, 25, 50, 75, 800],
            'pm10' : [20, 40, 50, 100, 150, 1200],
            'no2' : [40, 90, 120, 230, 340, 1000],
            'so2' : [100, 200, 350, 500, 750, 1250],
            'o3' : [50, 100, 130, 240, 380, 800],
        })
    def setres(self):
        for i in self.__vals: pass
