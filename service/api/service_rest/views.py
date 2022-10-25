from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Service
from common.json import ModelEncoder
from datetime import datetime
import json

# Create your views here.

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties =[
        "vip",
        "vin"
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_id",
    ]

class ServiceListEncoder(ModelEncoder):
    model = Service
    properties = [
        "vin",
        "customer_name",
        "appointment_date_time",
        "technician",
        "reason",
        "is_vip",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

class ServiceDetailEncoder(ModelEncoder):
    model = Service
    properties = [
        "id",
        "vin",
        "customer_name",
        "appointment_date_time",
        "technician",
        "reason",
        "finished",
    ]
    encoders = {
        "vin": AutomobileVOEncoder(),
        "technician": TechnicianEncoder(),
    }

# Get techinician list, create technician
@require_http_methods(["GET", "POST"])
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
            technician = Technician.objects.create(**content)
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

# Update technician. Primary Key
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

# Get service request, create service request
@require_http_methods(["GET", "POST"])
def api_service_appointments(request):
    if request.method == "GET":
        service = Service.objects.all()
        return JsonResponse(
            {"services": service},
            encoder=ServiceDetailEncoder,
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
# check if vin was entered, if not available throw VinNotValid  error and return with error message
            # try:
            #     vin = content["vin"]
            #     automobile = AutomobileVO.objects.get(vin=vin)
            #     if automobile:
            #         sale_status = automobile.sale_status
            #         if sale_status == 'Available':
            #             response = JsonResponse (
            #                 {"message": "VIN number is available in our inventory. Does not belong to customer"}
            #             )
            #             response.status_code = 400
            #             return response
            # except:
            #     pass
            service_appointment = Service.objects.create(**content)
            return JsonResponse(
                service,
                encoder=ServiceDetailEncoder,
                safe=False,

            )
        except:
                response = JsonResponse(
                    {"message": "Could not create the appointment."}
                )
                response.status_code = 400
                return response

# "Detail" service request
@require_http_methods(["DELETE", "GET", "POST"])
def api_service_appointment(request, pk):
    if request.method == "GET":
        try:
            model = Service.objects.get(id=pk)
            return JsonResponse(
                model,
                encoder=ServiceDetailEncoder,
                safe=False
            )
        except Service.DoesNotExist:
            response = JsonResponse({"message": "Appointment does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            model = Service.objects.get(id=pk)
            model.delete()
            return JsonResponse(
                model,
                encoder=ServiceDetailEncoder,
                safe=False,
            )
        except Service.DoesNotExist:
            return JsonResponse({"message": "Appointment does not exist"})
    else:
        try:
            content = json.loads(request.body)
            Service.objects.filter(id=pk).update(**content)
            appointment = Service.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=ServiceDetailEncoder,
                safe=False,
            )

        except Service.DoesNotExist:
            response = JsonResponse({"message": "Appointment does not exist"})
            response.status_code = 404
            return response
