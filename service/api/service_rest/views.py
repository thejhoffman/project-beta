from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Service
from common.json import ModelEncoder
from datetime import datetime
import json

# Create your views here.
class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_id",
    ]

class ServiceListEncoder(ModelEncoder):
    model = Service
    properties = [
        "customer_name",
        "vin",
        "appointment_date_time",
        "reason",
        "is_vip",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

class ServiceDetailEncoder(ModelEncoder):
    model = Service
    properties = [
        "customer_name",
        "vin",
        "appointment_date_time",
        "reason",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

# Get techinician, create technician
@require_list_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
        {"technicians": technicians},
        encoder = TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.object.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create technician"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_technician(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=pk)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician does not exist!"})
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(id=pk)
            props = ["name", "employee_id"]
            for prop in props:
                if prop in content:
                    setattr(technician, prop, content[prop])
            technician.save()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does not exist!"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def service_appointments(request):
    if request.method == "GET":
        service = Service.objects.all()
        return JsonResponse(
            {"services": service},
            encoder=ServiceListEncoder,
            sale=False,
        )
    else:
        try:
            content = json.loads(request.body)
            employee_id = content["technician"]
            try:
                technician = Technician.objects.get(employee_id=employee_id)
                content["technician"] = technician
            except Technician.DoesNotExist:
                response = JsonResponse({"message": "Technician does not exist !"})
                response.status_code = 404
                return response
