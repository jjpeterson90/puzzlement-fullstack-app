from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import login, logout, authenticate
from rest_framework.decorators import api_view
from .models import AppUser


# Create your views here.
def homepage(request):
    index_page = open('static/index.html').read()
    return HttpResponse(index_page)

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
        return JsonResponse({'success': True})
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
    return JsonResponse({
        'success': True,
        'message': 'User successfully logged out.'
    })

@api_view(['GET'])
def who_am_i(request):
    if request.user.is_authenticated:
        data = serializers.serialize("json", [request.user], fields=['username'])
        return JsonResponse({'user': data})
    else:
        return JsonResponse({'user': None})
    
## SAVE DATA MANAGEMENT

@api_view(['POST'])
def create_save_data(request, data):
    user = request.user
    user.riddles.count = data['riddles_count']
    
    pass

