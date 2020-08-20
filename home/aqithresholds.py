import pandas as pd
#Tbe
EAQI = pd.DataFrame({
    'Pollutants' : ['PM2', 'PM10', 'NO2', 'SO2', 'O3'],
    1 : [10, 20, 40, 100, 50],
    2 : [20, 40, 90, 200, 100],
    3 : [25, 50, 120, 350, 130],
    4 : [50, 100, 230, 500, 240],
    5 : [75, 150, 340, 750, 380],
    6 : [800, 1200, 1000, 1250, 800]
})
#Tbe
USAQI = pd.DataFrame({
    'Pollutants' : ['O3', 'NO2', 'SO2', 'PM10', 'PM2.5'],
    1 : [80, 40, 100, 20, 10],
    2 : [120, 100, 200, 35, 20],
    3 : [180, 200, 350, 50, 25],
    4 : [240, 400, 500, 100, 50],
    5 : [600, 1000, 1250, 1200, 800]
})
