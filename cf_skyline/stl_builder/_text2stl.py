import os
from solid import *
from pathlib import Path
from PIL import Image

def assembly(annotation=""):

    a = import_stl(os.path.join(Path(__file__).resolve().parent, 'base.stl')) + translate([5, -37, 10])(
    linear_extrude(height=2, convexity=4)(
    text(annotation,
         size=8,
         font="helvetica",
         halign="center",
         valign="center",
         )))

    return a


if __name__ == '__main__':
    a = assembly("muratmurat")

    outfile = "text.scad"
    stlfile = "text.stl"
    outimage = "text.png"

    scad_render_to_file(a, os.path.join(Path(__file__).resolve().parent, outfile))
    
    os.system("openscad {} -o {}".format(os.path.join(Path(__file__).resolve().parent, outfile), os.path.join(Path(__file__).resolve().parent, stlfile)))

    os.system("openscad {} -o {}".format(os.path.join(Path(__file__).resolve().parent, outfile), os.path.join(Path(__file__).resolve().parent, outimage)))
    picture = Image.open(outimage).show()