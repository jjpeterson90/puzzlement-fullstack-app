from django.shortcuts import render
from django.http import Http404, HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import login, logout, authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AppUser, UserSaveData, Riddle, PictureSlider, TileFlip
import random, json

sessions = {}

###   HOMEPAGE  #############################################

def homepage(request):
  print(sessions)
  index_page = open('static/index.html').read()
  response = HttpResponse(index_page)
  return response

###  USER AUTH   ############################################

@api_view(['POST'])
def sign_up(request):
  # TO-DO: compare password1 and password2 and return JsonResponse
  print('sign_up request data: ', request.data)
  try:
    user = AppUser.objects.create_user(
      username = request.data['username'],
      password = request.data['password'],
    )
    login(request._request, user)
    response = JsonResponse({'success': True})
    return response
  except Exception as e:
    print('signup exception error: ', e)
    return JsonResponse({
      'success': False,
      'message': 'Failed to register.'
    })

@api_view(['POST'])
def log_in(request):
  print('cookies: ', request.COOKIES)
  
  username = request.data['username']
  password = request.data['password']
  
  user = authenticate(username=username, password=password)
  print('user: ', user)
  print('appuser objects: ', dir(AppUser.objects))
  
  if user is not None:
    if user.is_active:
      try:
        login(request._request, user)
        print('request body: ', request._request)
      except Exception as e:
        print('login exception error: ', e)
      return JsonResponse({
        'success': True,
        'message': 'User successfully logged in.'
      })
    else:
      return JsonResponse({
        'success': False,
        'message': 'Account inactive.'
      })
  else:
    return JsonResponse({
      'success': False,
      'message': 'User does not exist.'
    })

@api_view(['POST'])
def log_out(request):
  logout(request)
  return JsonResponse({'success':True})


@api_view(['GET'])
def who_am_i(request):
  if request.user.is_authenticated:
    data = serializers.serialize("json", [request.user], fields=['username'])
    return JsonResponse({'user': data})
  else:
    return JsonResponse({'user': None})
    
    
###  USER SAVE DATA   #######################################

@api_view(['GET'])
def load_save_data(request):
  if request.user.is_authenticated:
    try:
      user_save_data = UserSaveData.objects.get(user_id=request.user)
      data = serializers.serialize("json", [user_save_data])
      return HttpResponse(data)
    except:
      return JsonResponse({'fail': True})


@api_view(['POST'])
def save_data(request):
  if request.user.is_authenticated:
    if request.method == 'POST':
      print('user: ', request.user)
      try:
        user_save_data = UserSaveData.objects.get(user_id=request.user)
      except:
        user_save_data = UserSaveData.objects.create(user_id=request.user, riddle_number=0)
      if 'riddle_number' in request.data:
        user_save_data.riddle_number = request.data['riddle_number']
        user_save_data.save(update_fields=['riddle_number'])
      if 'riddle_letter_choices' in request.data:
        user_save_data.riddle_letter_choices = request.data['riddle_letter_choices']
        user_save_data.save(update_fields=['riddle_letter_choices'])
      return JsonResponse({
        'success': True,
        'riddle_number': user_save_data.riddle_number,
        'riddle_letter_choices': user_save_data.riddle_letter_choices,
      })