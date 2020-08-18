from pollutants import inp
from flask import Flask, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from functools import wraps

# at line 45, this error comes up. Not imp, but would I suggest adhering to the typed
# Assume that the lang is statically typed 
# Argument of type "() -> Text | None" cannot be assigned to parameter "p0" of type "_VT"
# Type "() -> Text | None" is not compatible with bound type "(*args: Unknown, **kwargs: Unknown) -> NoReturn | (*args: Unknown, **kwargs: Unknown) -> (str | ByteString | Dict[Text, Any] | Response | _WSGICallable | Tuple[str | ByteString | Dict[Text, Any] | Response | _WSGICallable, str | int, Dict[Any, Any] | List[Tuple[Any, Any]]] | Tuple[str | ByteString | Dict[Text, Any] | Response | _WSGICallable, str | int] | Tuple[str | ByteString | Dict[Text, Any] | Response | _WSGICallable, Dict[Any, Any] | List[Tuple[Any, Any]]])" for TypeVar "_VT"
# Function return type "Text | None" is not compatible with type "NoReturn"
# Function return type "Text | None" is not compatible with type "str | ByteString | Dict[Text, Any] | Response | _WSGICallable | Tuple[str | ByteString | Dict[Text, Any] | Response | _WSGICallable, str | int, Dict[Any, Any] | List[Tuple[Any, Any]]] | Tuple[str | ByteString | Dict[Text, Any] | Response | _WSGICallable, str | int] | Tuple[str | ByteString | Dict[Text, Any] | Response | _WSGICallable, Dict[Any, Any] | List[Tuple[Any, Any]]]"Pylance (reportGeneralTypeIssues)

# Import aqi thresholds using
# import aqithresholds as aqi
# accessing standard
# aqi.EAQI

# This is a message
# I shall need the pollutant as str, value as float, and unit as str
# Pollutant accepted values: pm2, pm10, co, no2, o3
# units acc values: µg
# show ppm and ppb, but convert them to µg and pass
# which will all be eventually converted to ppb
# Configure application
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