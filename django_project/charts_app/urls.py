from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/$', views.ChartDetail.as_view(), name='chart_detail'),
    url(r'^add/(?P<layer_id>[0-9]+)/$', views.ChartCreate.as_view(), name='chart_add'),
    url(r'^update/(?P<pk>[0-9]+)/$', views.ChartUpdate.as_view(), name='chart_update'),
    url(r'^delete/(?P<pk>[0-9]+)/$', views.ChartDelete.as_view(), name='chart_delete'),
    url(r'^$', views.ChartList.as_view(), name='chart_list')
]
