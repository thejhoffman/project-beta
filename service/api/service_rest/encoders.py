from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Service


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "import_href",
        "vin",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
        "employee_id",
    ]


class ServiceEncoder(ModelEncoder):
    model = Service
    properties = [
        "id",
        "vin",
        "customer",
        "date",
        "time",
        "technician",
        "reason",
        "canceled",
        "finished",
        "vip",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }
