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

from typing import Dict, List, Tuple, Union


class Aqi:
    def __init__(self, pdict: Dict[str, float]) -> None:
        for i in pdict:
            if i not in ["pm2", "pm10", "no2", "o3", "so2", "co"]:
                raise ValueError("invalid pollutant used")
        self.vals = pdict
        self.res: str = ''
        self.des: str = ''
        self.col: str = ''


class Eaqi(Aqi):
    def __init__(self, pdict) -> None:
        Aqi.__init__(self, pdict)
        try:
            self.vals.pop('co')
        except KeyError:
            pass
        if not self.vals:
            raise ValueError("pdict should contain atleast one other pollutant than 'co' for Eaqi")
        self.__EAQI: Dict[str, List[int]] = {
            'AQI': [1, 2, 3, 4, 5, 6],
            'pm2': [10, 20, 25, 50, 75, 800],
            'pm10': [20, 40, 50, 100, 150, 1200],
            'no2': [40, 90, 120, 230, 340, 1000],
            'o3': [50, 100, 130, 240, 380, 800],
            'so2': [100, 200, 350, 500, 750, 1250]
        }
        self.__IDX: Dict[int, str] = {
            1: 'Good',
            2: 'Fair',
            3: 'Moderate',
            4: 'Poor',
            5: 'Very Poor',
            6: 'Extremely Poor'
        }
        self.__idx: int = 0
        self.__DES: Dict[int, Tuple[str, str]] = {
            1: ('The air quality is good. Enjoy your usual outdoor activities.', 'The air quality is good. Enjoy your usual outdoor activities.'),
            2: ('Enjoy your usual outdoor activities.', 'Enjoy your usual outdoor activities.'),
            3: ('Enjoy your usual outdoor activities.', 'Consider reducing intense outdoor activities, if you experience symptoms.'),
            4: ('Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.', 'Consider reducing physical activities, particularly outdoors, especially if you experience symptoms.'),
            5: ('Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.', 'Reduce physical activities, particularly outdoors, especially if you experience symptoms.'),
            6: ('Reduce physical activities outdoors.', 'Avoid physical activities outdoors.')
        }
        self.__colour: Dict[int, str] = {
            1: '#00ffff',
            2: '#00cc99',
            3: '#ffff00',
            4: '#f75133',
            5: '#800000',
            6: '#800080'
        }

    def set_res(self):
        caqi: List[int] = []
        for i in self.vals:
            thresh = self.__EAQI.get(i)
            if self.vals.get(i) > thresh[5]:
                self.des = 'How are you even alive?'
            j = 0
            for j in thresh:
                if self.vals.get(i) <= j: break
            caqi.append(thresh.index(j) + 1)
        self.__idx = max(caqi)
        self.res = self.__IDX.get(self.__idx, '')

    def set_des(self):
        if self.des == '':
            a, b = self.__DES.get(self.__idx, ('Invalid', 'Invalid'))
            self.des = f'Health messages:\nGeneral population: {a}\nSensitive populations: {b}'

    def set_col(self):
        if self.des == 'How are you even alive?':
            self.col = '#000000'
        else:
            self.col = self.__colour.get(self.__idx, '#ffffff')


class Naqi(Aqi):
    def __init__(self, pdict) -> None:
        Aqi.__init__(self, pdict)
        try:
            self.vals['co'] /= 100
        except KeyError:
            pass
        self.__NAQI: Dict[str, List[int]] = {
            'AQI': [1, 2, 3, 4, 5],
            'pm2': [30, 60, 90, 120, 250],
            'pm10': [50, 100, 250, 350, 430],
            'no2': [40, 80, 180, 280, 400],
            'o3': [50, 100, 168, 208, 748],
            'so2': [40, 80, 380, 800, 1600],
            'co': [10, 20, 100, 170, 340]
        }
        self.__idx: int = 0
        self.__DES: Dict[int, str] = {
            1: 'Good',
            2: 'Satisfactory',
            3: 'Moderate',
            4: 'Poor',
            5: 'Very Poor',
            6: 'Severe'
        }
        self.__HM: Dict[int, str] = {
            1: 'Minimal Impact',
            2: 'May cause minor breathing discomfort to sensitive people',
            3: 'May cause breathing discomfort to the people with lung disease such as asthma and discomfort to people with heart disease, children and older adults',
            4: 'May cause breathing discomfort to people on prolonged exposure and discomfort to people with heart disease with short exposure',
            5: 'May cause respiratory illness to the people on prolonged exposure. Effects may be more pronounced in people with lung and heart diseases',
            6: 'May cause respiratory effects even on healthy people and serious health impacts on people with lung/heart diseases. The health impacts may be experienced even during light physical activity'
        }
        self.__Ival: Dict[int, Tuple[int, int]] = {
            1: (0, 50),
            2: (51, 100),
            3: (101, 200),
            4: (201, 300),
            5: (301, 400)
        }
        self.__colour: Dict[int, str] = {
            1: '#009933',
            2: '#58ff09',
            3: '#ffff00',
            4: '#ffa500',
            5: '#ff0000',
            6: '#990000'
        }

    def set_res(self):
        caqi: List[int] = []
        idx: List[int] = []
        for i in self.vals:
            thresh = self.__NAQI.get(i)
            if self.vals.get(i) > thresh[4]:
                caqi.append(int(round((((401 / thresh[4]) * (self.vals.get(i) - thresh[4])) + 401), 0)))
                idx.append(6)
            else:
                j = 0
                for j in thresh:
                    if self.vals.get(i) <= j: break
                idx.append(thresh.index(j) + 1)
                if thresh.index(j) != 0:
                    if self.vals.get(i) < thresh[thresh.index(j) - 1] + 1:
                        j = thresh[thresh.index(j) - 1]
                x = thresh.index(j) + 1
                Il, Ih = self.__Ival.get(x, (0, 0))
                if thresh.index(j) != 0:
                    Bl = thresh[thresh.index(j) - 1] + 1
                else:
                    Bl = 0
                Bh = j
                caqi.append(int(round(((((Ih - Il) / (Bh - Bl)) * (self.vals.get(i) - Bl)) + Il), 0)))

        self.res = str(max(caqi))
        self.__idx = max(idx)

    def set_des(self):
        if int(self.res) > 500:
            self.des = 'Extremely severe. Avoid going outdoors.'
        else:
            self.des = f'Description: {self.__DES.get(self.__idx)}\nHealth message: {self.__HM.get(self.__idx)}'

    def set_col(self):
        if self.des == 'Extremely severe. Avoid going outdoors.':
            self.col = '#000000'
        else:
            self.col = self.__colour.get(self.__idx, '#ffffff')

class Mmaqi(Aqi):
    def __init__(self, pdict) -> None:
        Aqi.__init__(self, pdict)
        try:
            self.vals['co'] /= 100
        except KeyError:
            pass
        self.__MmAQI: Dict[str, List[int]] = {
            'AQI': [1, 2, 3, 4, 5],
            'pm2': [10, 25, 50, 75, 150],
            'pm10': [20, 50, 75, 150, 230],
            'no2': [40, 80, 120, 230, 340],
            'o3': [50, 100, 130, 240, 380],
            'so2': [40, 80, 200, 500, 750],
            'co' : [30, 100, 150, 250, 340]
        }
        self.__idx: int = 0
        self.__DES: Dict[int, str] = {
            1: 'Good',
            2: 'Fair',
            3: 'Moderate',
            4: 'Poor',
            5: 'Very Poor',
            6: 'Extremely poor',
            7: 'Severe',
            8: 'Hazardous'
        }
        self.__HM: Dict[int, Tuple[str, str]] = {
            1: ('The air quality is good. Enjoy your usual outdoor activities.', 'The air quality is good. Enjoy your usual outdoor activities.'),
            2: ('Enjoy your usual outdoor activities.', 'Enjoy your usual outdoor activities.'),
            3: ('Enjoy your usual outdoor activities.', 'Consider reducing intense outdoor activities, if you experience symptoms.'),
            4: ('Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.', 'Consider reducing physical activities, particularly outdoors, especially if you experience symptoms.'),
            5: ('Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.', 'Reduce physical activities, particularly outdoors, especially if you experience symptoms.'),
            6: ('Reduce physical activities outdoors.', 'Avoid physical activities outdoors.'),
            7: ('Avoid physical activities outdoors.', 'Do not go outdoors'),
            8: ('Do not go outdoors. An air purifier is recommended.', 'Avoid coming into contact with any outdoor pollution. An air purifier is essential.')
        }
        self.__Ival: Dict[int, Tuple[int, int]] = {
            1: (0, 50),
            2: (51, 100),
            3: (101, 200),
            4: (201, 300),
            5: (301, 400)
        }
        self.__colour: Dict[int, str] = {
            1: '#00ffff',
            2: '#00cc99',
            3: '#ffff00',
            4: '#f75133',
            5: '#800000',
            6: '#800080',
            7: '#000000',
            8: '#000000'
        }

    def set_res(self):
        caqi: List[int] = []
        idx: List[int] = []
        for i in self.vals:
            thresh = self.__MmAQI.get(i)
            if self.vals.get(i) > thresh[4]:
                caqi.append(int(round((((401 / thresh[4]) * (self.vals.get(i) - thresh[4])) + 401), 0)))
                idx.append(6)
            else:
                j = 0
                for j in thresh:
                    if self.vals.get(i) <= j: break
                idx.append(thresh.index(j) + 1)
                if thresh.index(j) != 0:
                    if self.vals.get(i) < thresh[thresh.index(j) - 1] + 1:
                        j = thresh[thresh.index(j) - 1]
                x = thresh.index(j) + 1
                Il, Ih = self.__Ival.get(x, (0, 0))
                if thresh.index(j) != 0:
                    Bl = thresh[thresh.index(j) - 1] + 1
                else:
                    Bl = 0
                Bh = j
                caqi.append(int(round(((((Ih - Il) / (Bh - Bl)) * (self.vals.get(i) - Bl)) + Il), 0)))

        self.res = str(max(caqi))
        self.__idx = max(idx)
        if (int(self.res) > 500 and int(self.res) < 775):
            self.__idx = 7
        elif int(self.res) >= 775:
            self.__idx = 8

    def set_des(self):
        a, b = self.__HM.get(self.__idx, ('Invalid', 'Invalid'))
        self.des = f'{self.__DES.get(self.__idx)}\nHealth messages:\nGeneral population: {a} \nSensitive populations: {b}'

    def set_col(self):
        self.col = self.__colour.get(self.__idx, '#ffffff')


def convert(pollutant: str, value: float, unit: str):
    y = {
        'CO': 28,
        'NO2': 46,
        'O3': 48,
        'SO2': 64
    }
    if unit == 'ppm':
        mass = y[pollutant]
        value *= 0.0409 * mass * 1000
    elif unit == 'ppb':
        mass = y[pollutant]
        value *= 0.0409 * mass
    return round(value, 2)


def compare(a: Tuple[int, int], b: Tuple[int, int]) -> Union[int, str]:
    """a is the index to be compared with b
    \nformat:
    \ncompare(a=(a, amax), b=(b, bmax))
    """
    a1, a2 = a
    b1, b2 = b
    return int(round((1 - ((b1 * a2) / (a1 * b2))) * 100, 0))