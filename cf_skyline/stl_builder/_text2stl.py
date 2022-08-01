import os
from solid import *
from PIL import Image


def assembly(annotation=""):

    a = import_stl("base.stl") + translate([5, -37, 10])(
    linear_extrude(height=2, convexity=4)(
    text(annotation,
         size=8,
         font="helvetica",
         halign="center",
         valign="center")))

    return a


if __name__ == '__main__':
    a = assembly("Hello World!")

    outfile = "export.scad"
    stlfile = "export.stl"
    outimage = "export.png"

    scad_render_to_file(a, outfile)

    os.system("openscad {} -o {}".format(outfile, stlfile))

    os.system("openscad --preview --imgsize=512,512 {} -o {}".format(outfile, outimage))
    picture = Image.open(outimage).show()