from django.urls import path
from service_rest.views import api_technician, api_technicians, api_service_appointments


urlpatterns = [
    path('technicans/', api_technicians, name="api_technicians"),
    path('technicans/<int:pk>', api_technician, name="api_technician"),
    path('services/', api_service_appointments, name="api_service_appointments"),
]
