from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    user = models.ForeignKey(User, on_delete=models.CASCADE, unique=True)
    resume = models.FileField(upload_to='resumes/', max_length=100)
    
    def __str__(self):
        return self.name
