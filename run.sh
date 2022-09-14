#!/usr/bin/sh

# This script is used to run the program
mkdir -p ./cf_skyline/stl_builder/stl_unassembled/
mkdir -p ./cf_skyline/stl_builder/stl_unassembled/assembled/

python3 -m venv .env

.env/bin/pip3 install -r ./cf_skyline/requirements.txt

.env/bin/python3 cf_skyline/manage.py runserver
