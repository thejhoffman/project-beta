from common.json import ModelEncoder
from .models import SalesPerson, SalesCustomer, SalesRecord, AutomobileVO


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "import_href",
        "vin",
    ]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "id",
        "name",
        "employee_number",
    ]


class SalesCustomerEncoder(ModelEncoder):
    model = SalesCustomer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]


class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "id",
        "price",
        "automobile",
        "sales_person",
        "customer",
    ]

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonEncoder(),
        "customer": SalesCustomerEncoder(),
    }
