# A file to test the prog
import aqical.home.pollutants as p

def inp():
    pdict: p.pin = {
        'pm' : (0, 'u'),
        'pm10' : (0, 'u'),
        'no2' : (0, 'u'),
        'co' : (0, 'u'),
        'o3' : (0, 'u'),
    }
    return pdict