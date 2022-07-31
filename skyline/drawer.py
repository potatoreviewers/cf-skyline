import datetime as dt
import numpy as np
import matplotlib as mpl
from matplotlib import pyplot 


def to_datetime(day: str):
    return dt.datetime.strptime(day, "%Y-%m-%d")

def coordinates(day: str):
    date = to_datetime(day)
    # number of days since the first day of the year
    days = (date - dt.datetime(date.year, 1, 1)).days
    x = days // 7
    y = (7 - date.weekday()) % 7
    return (x, y)
