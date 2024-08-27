from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class BaseUserSerializer(serializers.ModelSerializer) :
    class Meta :
        model = User
        fields=['username'] 

class UserProfileSerializer(serializers.ModelSerializer):
    user = BaseUserSerializer()

    class Meta:
        model = UserProfile
        fields = ['name', 'email', 'resume', 'user']



# class UserRegistrationSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(style={'input_type':'password'}, write_only=True)
#     username = serializers.CharField()
#     class Meta:
#         model = UserProfile
#         fields=['email', 'name','resume', 'password', 'username']
#         # extra_kwargs={
#         # 'password':{'write_only':True}
#         # }

#     def validate(self, validated_data):
#         password = validated_data.get('password')
#         if len(password) < 8 :
#             raise serializers.ValidationError("Password is too short")
        
#         return validated_data


#     def create(self, validated_data):
#         baseuser = User.objects.create_user(username=validated_data['username'], password=validated_data['password'])
#         validated_data.pop('username', None)
#         instance = self.Meta.model.objects.create(user = baseuser, **validated_data)
#         return instance

class RegisterSerializer(serializers.ModelSerializer):
    # Additional fields for user creation
    username = serializers.CharField(max_length=150, write_only=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    class Meta:
        model = UserProfile
        fields = ['username', 'password', 'password2', 'name', 'email', 'resume']
    
    def validate(self, data):
        # Check if the passwords match
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data
    
    def create(self, validated_data):
        # Extract user-related fields
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        
        # Create the user instance
        user = User.objects.create_user(username=username, password=password)
        
        # Create the UserProfile instance
        user_profile = UserProfile.objects.create(
            user=user,
            name=validated_data['name'],
            email=validated_data['email'],
            resume=validated_data['resume']
        )
        
        return user_profile