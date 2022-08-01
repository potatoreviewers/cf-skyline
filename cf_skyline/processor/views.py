from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.decorators import api_view
from parser import CalendarParser
from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_400_BAD_REQUEST, HTTP_200_OK
import json
import asyncio


@api_view(['GET'])
def ActivityDict(request):
    if (request.data.get('username')):
        username = request.data.get('username')
        data = asyncio.run(CalendarParser.user_activity_dict(username))
        if (data!=None):
            return Response(data, status=HTTP_200_OK)
        else:
            return Response('Invalud username', status=HTTP_400_BAD_REQUEST)
    else:
        return Response('Invalud username', status=HTTP_400_BAD_REQUEST)
