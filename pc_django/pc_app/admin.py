from django.contrib import admin
from .models import AppUser, Score

# Register your models here.
admin.site.register(AppUser)
admin.site.register(Score)