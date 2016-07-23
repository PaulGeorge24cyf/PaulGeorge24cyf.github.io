from django.db import models

# Create your models here.
class User(models.Model):
	userid = models.IntegerField()
	username = models.CharField(max_length=30)
	password = models.CharField(max_length=30)
	nickname = models.CharField(max_length=30)
	email = models.CharField(max_length=30)
	address = models.CharField(max_length=30)
	credit = models.IntegerField()
	gender = models.IntegerField()
	identity = models.IntegerField()