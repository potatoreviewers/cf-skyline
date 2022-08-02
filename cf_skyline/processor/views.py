from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.decorators import api_view
from parser import CalendarParser
from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_417_EXPECTATION_FAILED
import json
import asyncio
import stl_builder._text2stl as converter   
from cfskyline.settings import MEDIA_ROOT, BASE_DIR
import os
from stl_builder.tower.builder import TowerBuilder
from uuid import uuid4
import stl_builder.merge as Merger

@api_view(['GET'])
def ActivityDict(request):
    if (request.data.get('username')):
        username = request.data.get('username')
        data = asyncio.run(CalendarParser.user_activity_dict(username))
        if (data!=None):
            return Response(data, status=HTTP_200_OK)
        else:
            return Response('Invalid username', status=HTTP_400_BAD_REQUEST)
    else:
        return Response('Invalid username', status=HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def STLLink(request):
    if (request.data.get('username') and request.data.get('year')):
        username = request.data.get('username')
        year = request.data.get('year')
        data = asyncio.run(CalendarParser.user_activity_dict(username))
        if (data!=None):
            try:
                username_file_name = converter.Converter._generate_text(username)
                year_file_name = converter.Converter._generate_text(year)
                builder = TowerBuilder(username, year=year)
                tower_file_name = '{}.{}'.format('tower_' + username + '_' + uuid4().hex, 'stl')
                builder.build(data, os.path.join(MEDIA_ROOT, tower_file_name))
                # merge them all
                skyline_file = Merger.merger(os.path.join(BASE_DIR, 'stl_builder\cf-base.stl'), 
                os.path.join(MEDIA_ROOT, username_file_name), 
                os.path.join(MEDIA_ROOT, year_file_name), 
                os.path.join(MEDIA_ROOT, tower_file_name),
                username,
                year)
                jsn = {
                    "skyline" : os.path.join(MEDIA_ROOT, 'assembled', skyline_file),
                }
                os.remove(os.path.join(MEDIA_ROOT, username_file_name))
                os.remove(os.path.join(MEDIA_ROOT, year_file_name))
                os.remove(os.path.join(MEDIA_ROOT, tower_file_name))
                return Response(jsn, status=HTTP_200_OK)
            except Exception as e:
                return Response(e, status=HTTP_417_EXPECTATION_FAILED)
        else:
            return Response('Invalid username', status=HTTP_400_BAD_REQUEST)
    else:
        return Response('Invalid username', status=HTTP_400_BAD_REQUEST)
