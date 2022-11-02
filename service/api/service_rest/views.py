from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Service
from .encoders import (
    TechnicianEncoder,
    ServiceEncoder,
)
import json


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
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
            response = JsonResponse({"message": "Could not create technician"})
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
def api_service_appointments(request):
    if request.method == "GET":
        services = Service.objects.all()
        return JsonResponse(
            {"services": services},
            encoder=ServiceEncoder,
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(employee_id=content["technician"])
            content["technician"] = technician
            try:
                AutomobileVO.objects.get(vin=content["vin"])
                content["vip"] = True
            except AutomobileVO.DoesNotExist:
                pass
            service = Service.objects.create(**content)
            return JsonResponse(
                service,
                encoder=ServiceEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician not in system"},
                status=400,
            )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_service_appointment(request, pk):
    if request.method == "GET":
        try:
            model = Service.objects.get(id=pk)
            return JsonResponse(model, encoder=ServiceEncoder, safe=False)
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
                encoder=ServiceEncoder,
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
                encoder=ServiceEncoder,
                safe=False,
            )
        except Service.DoesNotExist:
            response = JsonResponse({"message": "Appointment does not exist"})
            response.status_code = 404
            return response
