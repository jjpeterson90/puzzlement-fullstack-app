# Generated by Django 4.0.6 on 2022-08-08 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pc_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pictureslider',
            name='moves',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='riddle',
            name='riddle_number',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='tileflip',
            name='moves',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='usersavedata',
            name='image_slider_moves',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='usersavedata',
            name='riddle_number',
            field=models.IntegerField(default=0),
        ),
    ]
