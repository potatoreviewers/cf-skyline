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

    def path_and_rename(instance, filename):
        upload_to = 'media/ads_images'
        ext = filename.split('.')[-1]
        # get filename
        if instance.pk:
            filename = '{}.{}'.format(instance.pk, ext)
        else:
            # set filename as random string
            filename = '{}.{}'.format(uuid4().hex, ext)
        # return the whole path to the file
        return os.path.join(upload_to, filename)

    def _generate_text(username):
        a = Converter.assembly(username)

        outfile = '{}.{}'.format(username + '_' + uuid4().hex, 'scad')
        stlfile = '{}.{}'.format(username + '_' + uuid4().hex, 'stl')
        scad_render_to_file(a, os.path.join(Path(__file__).resolve().parent, 'scad_files/', outfile))
        
        os.system("openscad {} -o {}".format(os.path.join(Path(__file__).resolve().parent, 'scad_files/', outfile), os.path.join(Path(__file__).resolve().parent, 'stl_unassembled/', stlfile)))

        return stlfile 
        