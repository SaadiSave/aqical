from typing import Dict
aqiindex = Dict[str, int]
class pollutants:
    '''All values in ppm'''
    def __init__(self) -> None:
        self.__pm: float
        self.__pm10: float
        self.__co: float
        self.__no2: float
        self.__o3: float
class aqi:
    def __init__(self) -> None:
        pass