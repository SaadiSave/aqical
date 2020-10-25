from typing import Dict, List, Tuple, Union

class aqi:
    def __init__(self, pdict: Dict[str, float]) -> None:
        self.vals = pdict
        self.res: str = ''
        self.des: Union[Tuple[str, str], str] = ''
        self.col: str = ''

class eaqi(aqi):
    def __init__(self, pdict) -> None:
        aqi.__init__(self, pdict)
        try: self.vals.pop('co')
        except KeyError: pass
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
        for i in self.vals:
            thresh = self.__EAQI.get(i)
            if (self.vals.get(i) > thresh[5]):
                self.des = 'How are you even alive?'
            j = 0
            for j in thresh:
                if self.vals.get(i) <= j: break
            caqi.append(thresh.index(j) + 1)
        self.__idx = max(caqi)
        self.res = self.__IDX.get(self.__idx, '')
    def set_des(self):
        if (self.des == ''):
            self.des = self.__DES.get(self.__idx, 'Invalid')

    def set_col(self):
        if (self.des == 'How are you even alive?'):
            self.col = '#000000'
        else:
            self.col = self.__colour.get(self.__idx, '#ffffff')

class naqi(aqi):
    def __init__(self, pdict) -> None:
        aqi.__init__(self, pdict)
        self.vals['co'] /= 100
        self.__NAQI: Dict[str, List[int]] = {
            'AQI' : [1, 2, 3, 4, 5],
            'pm2' : [30, 60, 90, 120, 250],
            'pm10' : [50, 100, 250, 350, 430],
            'no2' : [40, 80, 180, 280, 400],
            'o3' : [50, 100, 168, 208, 748],
            'so2' : [40, 80, 380, 800, 1600],
            'co' : [10, 20, 100, 170, 340]
        }
        self.__idx: int = 0
        self.__DES: Dict[int, str] = {
            1 : 'Good',
            2 : 'Satisfactory',
            3 : 'Moderate',
            4 : 'Poor',
            5 : 'Very Poor',
            6 : 'Severe'
        }
        self.__Ival: Dict[int, Tuple[int, int]] = {
            1 : (0, 50),
            2 : (51, 100),
            3 : (101, 200),
            4 : (201, 300),
            5 : (301, 400)
        }
        self.__colour: Dict[int, str] = {
            1 : '#009933',
            2 : '#58ff09',
            3 : '#ffff00',
            4 : '#ffa500',
            5 : '#ff0000',
            6 : '#990000'
        }

    def set_res(self):
        caqi: List[int] = []
        idx: List[int] = []
        for i in self.vals:
            thresh = self.__NAQI.get(i)
            if (self.vals.get(i) > thresh[4]):
                caqi.append(int(round((((401/thresh[4]) * (self.vals.get(i) - thresh[4])) + 401), 0)))
                idx.append(6)
            else:
                j = 0
                for j in thresh:
                    if (self.vals.get(i) <= j): break
                x = thresh.index(j) + 1
                Il, Ih = self.__Ival.get(x, (0, 0))
                if (thresh.index(j) != 0):
                    Bl = thresh[thresh.index(j) - 1] + 1
                else: Bl = 0
                Bh = j
                caqi.append(int(round(((((Ih - Il)/(Bh - Bl)) * (self.vals.get(i) - Bl)) + Il), 0)))
                idx.append(thresh.index(j) + 1)

        self.res = str(max(caqi))
        self.__idx = max(idx)

    def set_des(self):
        if (int(self.res) > 500):
            self.des = 'DO NOT STEP OUTSIDE YOUR HOME. SHUT ALL WINDOWS.'
        else:
            self.des = self.__DES.get(self.__idx, '')

    def set_col(self):
        if (self.des == 'DO NOT STEP OUTSIDE YOUR HOME. SHUT ALL WINDOWS.'):
            self.col = '#000000'
        else:
            self.col = self.__colour.get(self.__idx, '#ffffff')

def conversion(pollutant: str, value: float, unit: str):
    y = {
        'CO' : 28,
        'NO2' : 46,
        'O3' : 48,
        'SO2' : 64
    }
    if unit == 'ppm':
        mass = y[pollutant]
        value *= 0.0409 * mass * 1000
    elif unit == 'ppb':
        mass = y[pollutant]
        value *= 0.0409 * mass
    else: pass    
    return round(value, 2)

def compare(a: Tuple[int, int], b: Tuple[int, int]) -> Union[int, str]:
    '''a is the index to be compared with b
    \nformat:
    \ncompare(a=(a, amax), b=(b, bmax))
    '''
    a1, a2 = a
    b1, b2 = b
    if (a1 <= a2) and (b1 <= b2):
        c = int(round((1 - ((b1 * a2)/(a1 * b2))) * 100, 0))
    else:
        c = 'Invalid'
    return c