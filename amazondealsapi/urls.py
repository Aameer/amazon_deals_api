from django.conf.urls import patterns, include, url
import json
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from amazonparser.views import deals_view, lightning_deals_view, get_lightning_deals 
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'amazondealsapi.views.home', name='home'),
    #url(r'^amazondealsapi/', include('amazondealsapi.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^get_deals/', deals_view, name='deals_view'),
    url(r'^lightning_deals_view/', lightning_deals_view, name='lightning_deals_view'),
    url(r'^get_lightning_deals/', get_lightning_deals, name='get_lightning_deals'),
)
