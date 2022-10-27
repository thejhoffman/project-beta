from django.urls import path
from service_rest.views import (
    api_technician,
    api_technicians,
    api_service_appointments,
    api_service_appointment,
)


urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:pk>/", api_technician, name="api_technician"),
    path("services/", api_service_appointments, name="api_service_appointments"),
    path("services/<int:pk>/", api_service_appointment, name="api_service_appoinment"),
]
