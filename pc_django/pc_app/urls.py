from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
  path('', views.homepage),
  path('signup', views.sign_up),
  path('login', views.log_in),
  path('logout', views.log_out),
  path('whoami', views.who_am_i),
  path('save', views.save_data),
  path('loadsave', views.load_save_data),
  path('activityAPI', views.activity_API),
]
