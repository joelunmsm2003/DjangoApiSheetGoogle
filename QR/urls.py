from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls import patterns
from app.views import *

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'colegio.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

	url(r'^api-token-auth/', 'jwt_auth.views.obtain_jwt_token'),
	url(r'^uploadbase/$', 'app.views.uploadbase'),
	url(r'^gamarra/$', 'app.views.gamarra'),
	url(r'^lista/$', 'app.views.lista'),
	url(r'^nuevos/$', 'app.views.nuevos'),
	url(r'^enventa/(\w+)/$', 'app.views.enventa'),
	url(r'^setnuevo/(\w+)/$', 'app.views.setnuevo'),
	url(r'^vendido/(\w+)/$', 'app.views.vendido'),
	url(r'^torre/(\w+)/$', 'app.views.torre'),
	url(r'^centro/(\w+)/$', 'app.views.centro'),
	url(r'^vendidogrupo/$', 'app.views.vendidogrupo'),
	url(r'^ubica/(\w+)/(\w+)/$', 'app.views.ubica'),
	url(r'^listaqr/(\d+)/(\d+)/$', 'app.views.listaqr'),
	url(r'^qr/(\d+)/(\d+)/$', 'app.views.qr'),
	url(r'^alertaalmacen/$', 'app.views.alertaalmacen'),



)
