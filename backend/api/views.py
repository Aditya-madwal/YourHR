from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

# CORS error :
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import status
from users.serializers import *

class ShowMe(APIView) :
    def get(self, request):
        user = UserProfile.objects.get(user = self.request.user)
        serializer = UserProfileSerializer(user, many=False)

        return Response(serializer.data, status=status.HTTP_200_OK)
