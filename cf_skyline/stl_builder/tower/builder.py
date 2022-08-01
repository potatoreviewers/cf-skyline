from random import randint
import numpy as np
import datetime as dt
import stl
from ._tower import Tower, Point, rect
from cf_skyline.parser import CalendarParser

def _to_datetime(day: str):
    return dt.datetime.strptime(day, "%Y-%m-%d")

# return surface coordinates of day
def _coordinates(day: str):
    date = _to_datetime(day)
    days = (date - dt.datetime(date.year, 1, 1)).days
    week = days // 7
    weekday = date.weekday()
    return (week, weekday)

class TowerBuilder:
    def __init__(self, username: str, base_point=Point(0, 0, 0), height=7, width=53, year=dt.datetime.now().year):
        self.towers = []
        self.base = base_point
        self.width = width
        self.height = height
        self.year = year
        self.username = username

    def _add_date(self, date: str, height: int):
        if _to_datetime(date).year != self.year:
            return

        x0, y0, z0 = self.base.coords
        week, weekday = _coordinates(date)
        unit = self.width / 53
        x = x0 + week * unit
        z = z0 - weekday * unit

        tower = Tower(Point(x, y0, z), width=unit, height=height)
        self.towers.append(tower)

    def _add_dates(self, data: dict):
        for day in data:
            self._add_date(day, data[day])
        
    def build(self, data: dict, output_file='towers.stl'):
        self._add_dates(data)

        if len(self.towers) == 0:
            # open empty.stl and copy to output_file
            with open('empty.stl', 'r') as f:
                with open(output_file, 'w') as f2:
                    f2.write(f.read())
            return

        facets = np.concatenate([tower.stl() for tower in self.towers])

        # write to stl file
        with open(output_file, 'w') as f:
            f.write('solid towers\n')
            for facet in facets:
                f.write('facet normal 0 0 0\n')
                f.write('   outer loop\n')
                f.write('       vertex {} {} {}\n'.format(*facet[0]))
                f.write('       vertex {} {} {}\n'.format(*facet[1]))
                f.write('       vertex {} {} {}\n'.format(*facet[2]))
                f.write('   endloop\n')
                f.write('endfacet\n')
            f.write('endsolid towers\n')
