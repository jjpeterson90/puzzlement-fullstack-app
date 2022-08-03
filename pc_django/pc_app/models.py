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
    user_id = models.OneToOneField(AppUser, on_delete=models.CASCADE, related_name='savedata')
    count = models.IntegerField()
    letter_choices = models.CharField(max_length=50)
    # image_slider_img = 'url'
    tile_flip_orientation = 'str'
    image_slider_difficulty = ''
    tile_flip_difficulty = ''
    
class Riddle(models.Model):
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='Riddle')
    riddle_id = 0

class PictureSlider(models.Model):
    user_id = 1
    difficulty_level = ''
    number_of_moves = 0
    
class TileFlip(models.Model):
    user_id = 1
    difficulty_level = ''
    number_of_moves = 0
    




# class PictureTileSliderSaveData(models.Model):
#     user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='picture_tile_slider')
    
# class Score(models.Model):
#     """
#     Model recording user scores
#     """
#     user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='scores')
#     puzzle_name = models.CharField(max_length=50)
#     difficulty = models.CharField(max_length=50)
#     completion_time = models.IntegerField()