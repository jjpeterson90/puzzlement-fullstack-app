from django.contrib import admin
from .models import AppUser, UserSaveData, Riddle, PictureSlider, TileFlip

# Register your models here.
admin.site.register(AppUser)
admin.site.register(UserSaveData)
admin.site.register(Riddle)
admin.site.register(PictureSlider)
admin.site.register(TileFlip)