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

from typing import Dict
import aqimain as AQI
from flask import Flask, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp

app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "GET":
        return render_template("home.html")
    else:
        s: Dict[str, float] = {}
        casedict: Dict[str, str] = {
            'PM2.5' : 'pm2',
            'PM10' : 'pm10',
            'CO' : 'co',
            'NO2' : 'no2',
            'O3' : 'o3',
            'SO2' : 'so2'
        }
        for f in ["PM2.5", "PM10", "CO", "NO2", "O3", "SO2"]:
            value = request.form.get(f"value{ f }")
            value = str(value)
            unit = request.form.get(f"unit{ f }")
            unit = str(unit)
            value = str(value)
            try:
                value = AQI.conversion(f, float(value), unit)
                f = casedict.get(f)
                s.update({
                    f : value
                })
            except ValueError:
                pass
        y = s.pop("co", None)
        if not s:
            return render_template("home.html", message = "Fill atleast 1 field except CO")
        s.update({
            "co" : y
        })
        country = request.form.get("country")
        if country == "GBR":
            s.pop("co", None)
            AQI.aqi("eur", s)
        elif country == "IND":
            AQI.aqi("ind", s)
        return render_template("home.html", s = s)