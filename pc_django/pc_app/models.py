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
    
    
class Score(models.Model):
    """
    Model recording user scores
    """
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='scores')
    puzzle_name = models.CharField(max_length=50)
    difficulty = models.CharField(max_length=50)
    completion_time = models.IntegerField()