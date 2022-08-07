import os
from solid import *
from pathlib import Path
from uuid import uuid4


class Converter:
    def assembly(annotation=""):

        a = import_stl(os.path.join(Path(__file__).resolve().parent, 'empty.stl')) + translate([5, -37, 10])(
        linear_extrude(height=2, convexity=4)(
        text(annotation,
            size=8,
            font="helvetica",
            halign="center",
            valign="center",
            )))

        return a

    def _generate_text(username):
        a = Converter.assembly(username)

        outfile = '{}.{}'.format(username + '_' + uuid4().hex, 'scad')
        stlfile = '{}.{}'.format(username + '_' + uuid4().hex, 'stl')
        # # create output file if it doesn't exist
        # path = os.path.join(Path(__file__).resolve().parent, 'scad_files/', outfile)
        # if not os.path.exists(path):
        #     open(path, 'wb').close()

        scad_render_to_file(a, os.path.join(Path(__file__).resolve().parent, 'scad_files/', outfile))
        
        os.system("openscad {} -o {}".format(os.path.join(Path(__file__).resolve().parent, 'scad_files/', outfile), os.path.join(Path(__file__).resolve().parent, 'stl_unassembled/', stlfile)))

        return stlfile 
