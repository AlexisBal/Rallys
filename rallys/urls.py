"""rallys URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from api import views
from django.conf.urls import url


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/register', views.register),
    url(r'^api/login', views.login),
    url(r'^api/users/$', views.users),
    url(r'^api/users/(?P<pk>[0-999999999999999999999]+)$', views.user),  
    url(r'^api/user-account/$', views.user_account),  
    url(r'^api/user-account/settings', views.user_account_settings),  
    url(r'^api/user-account/password', views.user_account_password),  
    url(r'^api/user-account/delete', views.user_account_delete),  
    url(r'^api/rallyes', views.rallyes),

]
