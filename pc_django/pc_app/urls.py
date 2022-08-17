from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
  path('', views.homepage),
  path('signup', views.sign_up),
  path('login', views.log_in),
  path('logout', views.log_out),
  path('whoami', views.who_am_i),
  # User Save Data
  path('save', views.save_data),
  path('loadsave', views.load_save_data),
  path('deletesave', views.delete_save_data),
  # Score Save Data
  path('riddle/scores', views.riddle_scores),
  path('riddle/score/save', views.riddle_score_save),
  path('imgslider/scores', views.imgslider_scores),
  path('imgslider/score/save', views.imgslider_score_save),
  path('tileflip/scores', views.tileflip_scores),
  path('tileflip/score/save', views.tileflip_score_save),
  # Fairy API
  path('activityAPI', views.activity_API),
]
