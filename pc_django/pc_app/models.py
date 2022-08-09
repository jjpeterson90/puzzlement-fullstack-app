from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class AppUser(AbstractUser):
  """
  An abstract base class implementing a fully featured User model with
  admin-compliant permissions.

  Username and password are required. Other fields are optional.
  """
  REQUIRED_FIELDS = []
  
  def __str__(self):
    return self.username
    
class UserSaveData(models.Model):
  user_id = models.OneToOneField(AppUser, on_delete=models.CASCADE)
  riddle_number = models.IntegerField(default=0)
  riddle_letter_choices = models.CharField(max_length=50)
  image_slider_img = models.URLField(max_length=500)
  image_slider_orientation = models.CharField(max_length=50)
  image_slider_difficulty = models.CharField(max_length=50)
  image_slider_moves = models.IntegerField(default=0)
  tile_flip_orientation = models.CharField(max_length=250)
  tile_flip_difficulty = models.CharField(max_length=50)

class Riddle(models.Model):
  user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
  riddle_number = models.IntegerField(default=0)

class PictureSlider(models.Model):
  user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
  image_url = models.URLField(max_length=500)
  moves = models.IntegerField(default=0)
  difficulty = models.CharField(max_length=50)
    
class TileFlip(models.Model):
  user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
  difficulty = models.CharField(max_length=50)
  moves = models.IntegerField(default=0)
