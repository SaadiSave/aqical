from typing import Dict
from aqical.home.aqisys import *
pin = Dict[str, tuple]
class inp:
    def __init__(self, pdict: pin) -> None:
        self.__poll = polldict