from typing import Dict, List, Tuple, Union

class aqi:
    def __init__(self, pdict: Dict[str, float]) -> None:
        self.__vals = pdict
        self.res: str
        self.des: Union[Tuple[str, str], str]
        self.col: str

class eaqi(aqi):
    def __init__(self, pdict) -> None:
        aqi.__init__(self, pdict)
        self.__EAQI: Dict[str, List[int]] = {
            'AQI' : [1, 2, 3, 4, 5, 6],
            'pm2' : [10, 20, 25, 50, 75, 800],
            'pm10' : [20, 40, 50, 100, 150, 1200],
            'no2' : [40, 90, 120, 230, 340, 1000],
            'o3' : [50, 100, 130, 240, 380, 800],
            'so2' : [100, 200, 350, 500, 750, 1250]
        }
        self.__IDX: Dict[int, str] = {
            1 : 'Good',
            2 : 'Fair',
            3 : 'Moderate',
            4 : 'Poor',
            5 : 'Very Poor',
            6 : 'Extremely Poor'
        }
        self.__idx: int = 0
        self.__DES: Dict[int, Tuple[str, str]] = {
            1 : ('The air quality is good. Enjoy your usual outdoor activities.','The air quality is good. Enjoy your usual outdoor activities.'),
            2 : ('Enjoy your usual outdoor activities.','Enjoy your usual outdoor activities.'),
            3 : ('Enjoy your usual outdoor activities.','Consider reducing intense outdoor activities, if you experience symptoms.'),
            4 : ('Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.','Consider reducing physical activities, particularly outdoors, especially if you experience symptoms.'),
            5 : ('Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.','Reduce physical activities, particularly outdoors, especially if you experience symptoms.'),
            6 : ('Reduce physical activities outdoors.','Avoid physical activities outdoors.')
        }
        self.__colour: Dict[int, str] = {
            1 : '#00ffff',
            2 : '#00cc99',
            3 : '#ffff00',
            4 : '#f75133',
            5 : '#800000',
            6 : '#800080'
        }

    def set_res(self):
        caqi: List[int] = []
        for i in self.__vals:
            thresh = self.__EAQI.get(i)
            if (self.__vals.get(i) > thresh[5]):
                self.des = 'How are you even alive?'
            j = 0
            for j in thresh:
                if self.__vals.get(i) <= j: break
            caqi.append(thresh.index(j) + 1)
        self.__idx = max(caqi)
        self.res = self.__IDX.get(self.__idx, '')
    def set_des(self):
        if (self.des == ''):
            self.des = self.__DES.get(self.__idx, 'Invalid')

    def set_col(self):
        self.col = self.__colour.get(self.__idx, '#ffffff')