"""Project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from index import views as index_views
from Project import settings

urlpatterns = [
	url(r'^$', index_views.home , name='home'),
    url(r'^loginbutton/',index_views.loginbutton , name='loginbutton'),
    url(r'^logoutbutton/',index_views.logoutbutton , name='logoutbutton'),
    url(r'^modifybutton/',index_views.modifybutton , name='modifybutton'),
    url(r'^cart/',index_views.cart , name='cart'),
    url(r'^favorite/',index_views.favorite , name='favorite'),
    url(r'^orderlist/',index_views.orderlist , name='orderlist'),
	url(r'^login/', index_views.login , name='login'),
    url(r'^register/', index_views.register , name='register'),
    url(r'^modify/', index_views.modify , name='modify'),
    url(r'^admin/', admin.site.urls),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve',{ 'document_root': settings.STATIC_URL }),  
]
