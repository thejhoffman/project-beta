from common.json import ModelEncoder
from .models import SalesPerson, SalesCustomer, SalesRecord, AutomobileVO


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
    ]


class SalesPersonListEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "id",
        "name",
        "employee_number",
    ]


class SalesPersonDetailEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "id",
        "name",
        "employee_number",
    ]


class SalesCustomerListEncoder(ModelEncoder):
    model = SalesCustomer
    properties = [
        "id",
        "name",
    ]


class SalesCustomerDetailEncoder(ModelEncoder):
    model = SalesCustomer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]


class SalesRecordListEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "price",
        "vin",
        "sales_person",
        "customer",
    ]

    encoders = {
        "vin": AutomobileVOEncoder(),
        "sales_person": SalesPersonDetailEncoder(),
        "customer": SalesCustomerDetailEncoder(),
    }


class SalesRecordDetailEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "id",
        "price",
        "vin",
        "sales_person",
        "customer",
    ]

    encoders = {
        "vin": AutomobileVOEncoder(),
        "sales_person": SalesPersonDetailEncoder(),
        "customer": SalesCustomerDetailEncoder(),
    }
