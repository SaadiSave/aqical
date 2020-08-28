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
