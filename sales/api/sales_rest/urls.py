from django.urls import path
from .views import (
    api_persons,
    api_person,
    api_customers,
    api_customer,
    api_records,
    api_record,
)

urlpatterns = [
    path("records/", api_records, name="api_records"),
    path("records/<int:pk>/", api_record, name="api_record"),
    path("staff/", api_persons, name="api_persons"),
    path("staff/<int:pk>/", api_person, name="api_person"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customer"),
]
