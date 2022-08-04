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
    riddle_number = models.IntegerField()
    riddle_letter_choices = models.CharField(max_length=50)
    # image_slider_img = 'url'
    tile_flip_orientation = models.CharField(max_length=250)
    image_slider_difficulty = models.CharField(max_length=50)
    tile_flip_difficulty = models.CharField(max_length=50)
    
class Riddle(models.Model):
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='riddles')
    riddle_number = models.IntegerField()

class PictureSlider(models.Model):
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='picturesliders')
    difficulty_level = models.CharField(max_length=50)
    number_of_moves = models.IntegerField()
    
class TileFlip(models.Model):
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='tileflips')
    difficulty_level = models.CharField(max_length=50)
    number_of_moves = models.IntegerField()
    




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