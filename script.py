import os
import numpy as np
import json

from stl import mesh
from mpl_toolkits import mplot3d
from matplotlib import pyplot

from requests import request
import requests
from skyline.drawer import coordinates, to_datetime

class Point:
    def __init__(self, x, y, z):
        self.coords = (x, y, z)
    def list(self):
        return list(self.coords)
    

# return stl representation of triangles of a rectangle
# point must be ordered
def rect(p1: Point, p2: Point, p3: Point, p4: Point):
    return np.array([ 
        [p1.list(), p2.list(), p3.list()],
        [p3.list(), p4.list(), p1.list()]
    ])

class Tower:
    def __init__(self, point: Point, width, height):
        self.point = point
        self.width = width
        self.height = height
    
    def stl(self):
        p = self.point
        # width is along the x-axis and z-axis
        w = self.width
        # height is along the y-axis 
        h = self.height
        
        # surface coordinates are x and z
        # x, z = coordinates(self.day)
        x, y, z = p.coords

        base = rect(
            Point(x,   y,   z),
            Point(x+w, y,   z),
            Point(x+w, y,   z-w),
            Point(x,   y,   z-w)
        )

        roof = rect(
            Point(x,   y+h, z),
            Point(x+w, y+h, z),
            Point(x+w, y+h, z-w),
            Point(x,   y+h, z-w)
        )

        left = rect(
            Point(x,   y,   z),
            Point(x,   y+h, z),
            Point(x,   y+h, z-w),
            Point(x,   y,   z-w)
        )

        right = rect(
            Point(x+w, y,   z),
            Point(x+w, y+h, z),
            Point(x+w, y+h, z-w),
            Point(x+w, y, z-w)
        )

        front = rect(
            Point(x,   y,   z-w),
            Point(x+w, y,   z-w),
            Point(x+w, y+h, z-w),
            Point(x,   y+h, z-w)
        )

        back = rect(
            Point(x,   y,   z),
            Point(x+w, y,   z),
            Point(x+w, y+h, z),
            Point(x,   y+h, z)
        )

        return np.concatenate((base, roof, left, right, front, back))



# p1(x, y, z)          p2(x+w, y, z)
# 
# p3(x, y, z+w)        p4(x+w, y, z+w)

def get_user_info(username):
    url = f"http://0.0.0.0:8080/user_activity_graph?username={username}"
    response = requests.get(url)
    return response.json() if response.status_code == 200 else None

def build_stl(username, year, output_file='output.stl'):
    # remove existing file
    if os.path.exists(output_file):
        os.remove(output_file)

    user_info = get_user_info(username)
    if user_info is None:
        print('Could not find user')
        return

    days = user_info['data']
    towers = []

    x0, y0, z0 = 0, 0, 0
    W, H = 53, 7
    scale = W / 53
    base = rect(
        Point(x0,   y0, z0-1),
        Point(x0+W, y0, z0-1),
        Point(x0+W, y0, z0-1+H),
        Point(x0,   y0, z0-1+H)
    )

    for day in days:
        date = to_datetime(day)
        if date.year != year:
            continue
        x, z = coordinates(day)
        x, z = x0 + x * scale, z0 + z * scale
        y = y0
        h = days[day]
        towers.append(Tower(Point(x, y, z), width=1, height=h))

    np_towers_triangles = np.concatenate([tower.stl() for tower in towers])
    np_towers_triangles = np.concatenate((base, np_towers_triangles))

    # write to stl file
    with open(output_file, 'w') as f:
        f.write('solid skyline\n')
        for triangle in np_towers_triangles:
            f.write('facet normal 0 0 0\n')
            f.write('   outer loop\n')
            f.write('       vertex {} {} {}\n'.format(*triangle[0]))
            f.write('       vertex {} {} {}\n'.format(*triangle[1]))
            f.write('       vertex {} {} {}\n'.format(*triangle[2]))
            f.write('   endloop\n')
            f.write('endfacet\n')
        f.write('endsolid skyline\n')

if __name__ == '__main__':
    username = 'muratmurat'
    year = 2022
    build_stl(username, year)
