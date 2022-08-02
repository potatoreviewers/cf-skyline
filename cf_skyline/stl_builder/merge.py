import math
import stl.mesh as mesh
import numpy, stl, os
from cfskyline.settings import MEDIA_ROOT
from mpl_toolkits import mplot3d
from matplotlib import pyplot

def find_mins_maxs(obj):
    minx = obj.x.min()
    maxx = obj.x.max()
    miny = obj.y.min()
    maxy = obj.y.max()
    minz = obj.z.min()
    maxz = obj.z.max()
    return minx, maxx, miny, maxy, minz, maxz

def translate(_solid, step, padding, multiplier, axis):
    if 'x' == axis:
        items = 0, 3, 6
    elif 'y' == axis:
        items = 1, 4, 7
    elif 'z' == axis:
        items = 2, 5, 8
    else:
        raise RuntimeError('Unknown axis %r, expected x, y or z' % axis)

def copy_obj(obj, dims, num_rows, num_cols, num_layers):
    w, l, h = dims
    copies = []
    for layer in range(num_layers):
        for row in range(num_rows):
            for col in range(num_cols):
                if row == 0 and col == 0 and layer == 0:
                    continue
                _copy = mesh.Mesh(obj.data.copy())
                if col != 0:
                    translate(_copy, w, w / 10., col, 'x')
                if row != 0:
                    translate(_copy, l, l / 10., row, 'y')
                if layer != 0:
                    translate(_copy, h, h / 10., layer, 'z')
                copies.append(_copy)
    return copies


def merger(base_stl, name_stl, year_stl, towers_stl, username, year):

    base_mesh = mesh.Mesh.from_file(base_stl)
    name_mesh = mesh.Mesh.from_file(name_stl)
    year_mesh = mesh.Mesh.from_file(year_stl)
    towers_mesh = mesh.Mesh.from_file(towers_stl)

    #base init

    base_mesh.translate(translation=[0,0,0])

    minx, maxx, miny, maxy, minz, maxz = find_mins_maxs(base_mesh)
    w1 = maxx - minx
    l1 = maxy - miny
    h1 = maxz - minz

    #towers_init
    towers_mesh.rotate([-0.5, 0.0, 0.0], math.radians(90))
    towers_mesh.vectors = towers_mesh.vectors * 3
    towers_mesh.translate(translation=[4*4.5,4*4.5,4*4.5])

    #name_init


    name_mesh.rotate([-0.5, 0.0, 0.0], math.radians(70))
    name_mesh.vectors = name_mesh.vectors * 0.8
    x_shift = name_mesh.x.min() + 51.908424 
    name_mesh.translate(translation=[-x_shift,3.8,24.8])

    #date_init

    year_mesh.rotate([-0.5, 0.0, 0.0], math.radians(70))
    year_mesh.vectors = year_mesh.vectors * 0.8
    year_mesh.translate(translation=[50,3.8,24.8])

    merged_mesh = mesh.Mesh(numpy.concatenate(
                                    [name_mesh.data, year_mesh.data] +
                                    [base_mesh.data, towers_mesh.data]))
    file_name = '{}-{}.{}'.format(username, year, 'stl')
    merged_mesh.save(os.path.join(MEDIA_ROOT, 'assembled', file_name),mode=stl.Mode.ASCII)
    return file_name