from django.shortcuts import render
from django.http import Http404, HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import login, logout, authenticate
from django.forms import model_to_dict
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AppUser, UserSaveData, Riddle, PictureSlider, TileFlip
import random, json, requests

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
    print('user: ', user)
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
  print('usename: ', username, ', password: ', password)
  user = authenticate(username=username, password=password)
  print('user: ', user)
  
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
      print(user_save_data)
      data = serializers.serialize("json", [user_save_data])
      print('data: ', data)
      return HttpResponse(data)
    except:
      return JsonResponse({'fail': True})

@api_view(['POST'])
def save_data(request):
  if request.user.is_authenticated:
    if request.method == 'POST':      
      try:
        user_save_data = UserSaveData.objects.get(user_id=request.user)
      except:
        user_save_data = UserSaveData.objects.create(user_id=request.user)
      
      fields = []
      if 'riddle_number' in request.data:
        user_save_data.riddle_number = request.data['riddle_number']
        fields.append('riddle_number')
      if 'riddle_letter_choices' in request.data:
        user_save_data.riddle_letter_choices = request.data['riddle_letter_choices']
        fields.append('riddle_letter_choices')
      if 'image_slider_img' in request.data:
        user_save_data.image_slider_img = request.data['image_slider_img']
        fields.append('image_slider_img')
      if 'image_slider_orientation' in request.data:
        user_save_data.image_slider_orientation = request.data['image_slider_orientation']
        fields.append('image_slider_orientation')
      if 'image_slider_difficulty' in request.data:
        user_save_data.image_slider_difficulty = request.data['image_slider_difficulty']
        fields.append('image_slider_difficulty')
      if 'image_slider_started' in request.data:
        user_save_data.image_slider_started = request.data['image_slider_started']
        fields.append('image_slider_started')
      if 'image_slider_moves' in request.data:
        user_save_data.image_slider_moves = request.data['image_slider_moves']
        fields.append('image_slider_moves')
      if 'tile_flip_image' in request.data:
        user_save_data.tile_flip_image = request.data['tile_flip_image']
        fields.append('tile_flip_image')
      if 'tile_flip_orientation' in request.data:
        user_save_data.tile_flip_orientation = request.data['tile_flip_orientation']
        fields.append('tile_flip_orientation')
      if 'tile_flip_difficulty' in request.data:
        user_save_data.tile_flip_difficulty = request.data['tile_flip_difficulty']
        fields.append('tile_flip_difficulty')
      if 'tile_flip_moves' in request.data:
        user_save_data.tile_flip_moves = request.data['tile_flip_moves']
        fields.append('tile_flip_moves')
        
      user_save_data.save(update_fields=fields)
      
      return JsonResponse( {'success': True} )
    
@api_view(['DELETE'])
def delete_save_data(request):
  if request.user.is_authenticated:
    user_save_data = UserSaveData.objects.get(user_id=request.user)
    user_save_data.delete()
    
    return JsonResponse({'success': True})
  return JsonResponse({'success': False})


###     SCORE DATA    #######################################

@api_view(['GET'])
def riddle_scores(request):
  if request.user.is_authenticated:
    # user_list = AppUser.objects.all()
    # print('user_list: ', user_list)
    # scores = []
    # for user in user_list:
    #   print('user: ', user.username)
    #   scores = Riddle.objects.filter(user_id=user).exists()
    #   if scores
    # scores = Riddle.objects.select_related().all()
    # data = serializers.serialize("json", AppUser.objects.select_related('').all(), fields=('username', 'riddle_number'))
    pass

@api_view(['POST'])
def riddle_score_save(request):
  if request.user.is_authenticated:
    try:
      new = Riddle.objects.create(
        user_id = request.user,
        riddle_number = request.data['riddle_number'],
      )
      new.save()
    except:
      return JsonResponse({'success':False})
    return JsonResponse({'success':True})

@api_view(['GET'])
def imgslider_scores(request):
  if request.user.is_authenticated:
    user_list = AppUser.objects.all()
    slider_scores_list = PictureSlider.objects.all()
    flip_scores_list = TileFlip.objects.all()
    users = serializers.serialize('json', user_list)
    slider_scores = serializers.serialize('json', slider_scores_list)
    
    print(users)
    print(slider_scores)

    return JsonResponse({
      'users': users,
      'scores': slider_scores,
    })
    
    # users = serializers.serialize("json", [user_list], fields=['username'])
    # user_list = AppUser.objects.all()
    # print('user_list: ', user_list)
    # full_list = []
    # for user in user_list:
    #   userObj = {}
    #   userObj['username'] = user.username
    #   testScores = PictureSlider.objects.filter(user_id=user).exists()
    #   scores_list = []
    #   if testScores:
    #     scores = PictureSlider.objects.filter(user_id=user)
    #     for score in scores:
    #       scores_list.append(model_to_dict(score))
    #     userObj['scores'] = scores_list
    #   full_list.append(scores_list)
      
    # return HttpResponse(full_list)
  return HttpResponse('boo')

@api_view(['POST'])
def imgslider_score_save(request):
  if request.user.is_authenticated:
    try:
      new = PictureSlider.objects.create(
        user_id = request.user,
        image_url = request.data['image_url'],
        moves = request.data['moves'],
        difficulty = request.data['difficulty'],
      )
      new.save()
    except:
      return JsonResponse({'success':False})
    return JsonResponse({'success':True})

@api_view(['GET'])
def tileflip_scores(request):
  if request.user.is_authenticated:
    pass

@api_view(['POST'])
def tileflip_score_save(request):
  if request.user.is_authenticated:
    try:
      new = TileFlip.objects.create(
        user_id = request.user,
        moves = request.data['moves'],
        difficulty = request.data['difficulty'],
      )
      new.save()
    except:
      return JsonResponse({'success':False})
    return JsonResponse({'success':True})


###   ACTIVITY API    #######################################

@api_view(['POST'])
def activity_API(request):
  if request.method == 'POST':
    choice = request.data['choice']
    if choice == 'random':
      path = 'http://www.boredapi.com/api/activity/'
    else:
      path = f'http://www.boredapi.com/api/activity?type={choice}'
    response = requests.get(path)
    if response.status_code == 200:
      return JsonResponse({
        'success': True,
        'message': response.json(),
      })
    else:
      return JsonResponse({
        'success': False,
      })
