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
  riddle_number = models.IntegerField()
  riddle_letter_choices = models.CharField(max_length=50)
  image_slider_img = models.URLField(max_length=500, null=True)
  tile_flip_orientation = models.CharField(max_length=250)
  image_slider_difficulty = models.CharField(max_length=50)
  tile_flip_difficulty = models.CharField(max_length=50)
    
class Riddle(models.Model):
  user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
  riddle_number = models.IntegerField()

class PictureSlider(models.Model):
  user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
  image_url = models.URLField(max_length=500, null=True)
  number_of_moves = models.IntegerField()
  difficulty_level = models.CharField(max_length=50)
    
class TileFlip(models.Model):
  user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
  difficulty_level = models.CharField(max_length=50)
  number_of_moves = models.IntegerField()
