from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Service


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vip", "vin"]


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
        "customer",
        "date",
        "time",
        "technician",
        "reason",
        "vip",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


class ServiceDetailEncoder(ModelEncoder):
    model = Service
    properties = [
        "id",
        "vin",
        "customer",
        "date",
        "time",
        "technician",
        "reason",
        "finished",
        "vip",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }
