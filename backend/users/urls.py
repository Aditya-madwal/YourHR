from django.contrib import admin
from django.urls import path, include
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('admin/', admin.site.urls),
    # path('api/', include("api.urls")),
    # path('users/', include("users.urls")),
    path("register/", views.CreateUserView.as_view(), name="createUser"),
    path("showusers/", views.Showusers.as_view(), name="showusers")
]


urlpatterns += [
    path('userapi/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('userapi/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]