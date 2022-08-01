import numpy as np

class Point:
    def __init__(self, x, y, z):
        self.coords = (x, y, z)
    def list(self):
        return list(self.coords)
    

# return facets of rectangle
# of points p1, p2, p3, p4
# point must be ordered clockwise
def rect(p1: Point, p2: Point, p3: Point, p4: Point):
    return np.array([ 
        [p1.list(), p2.list(), p3.list()],
        [p3.list(), p4.list(), p1.list()]
    ])

class Tower:
    def __init__(self, point: Point, width, height):
        # bottom left back corner of tower
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
