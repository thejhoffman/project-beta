from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    SalesPersonEncoder,
    SalesCustomerEncoder,
    SalesRecordEncoder,
)
from .models import SalesPerson, SalesCustomer, SalesRecord, AutomobileVO


@require_http_methods(["GET", "POST"])
def api_persons(request):
    if request.method == "GET":
        staff = SalesPerson.objects.all()
        return JsonResponse(
            {"staff": staff},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_person(request, pk):
    if request.method == "GET":
        try:
            sales_person = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sales_person = SalesPerson.objects.get(id=pk)
            sales_person.delete()
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:  # PUT
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.get(id=pk)

            props = ["name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(sales_person, prop, content[prop])
            sales_person.save()
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = SalesCustomer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=SalesCustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = SalesCustomer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=SalesCustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_customer(request, pk):
    if request.method == "GET":
        try:
            customer = SalesCustomer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=SalesCustomerEncoder,
                safe=False,
            )
        except SalesCustomer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = SalesCustomer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=SalesCustomerEncoder,
                safe=False,
            )
        except SalesCustomer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:  # PUT
        try:
            content = json.loads(request.body)
            customer = SalesCustomer.objects.get(id=pk)

            props = ["name", "address", "phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=SalesCustomerEncoder,
                safe=False,
            )
        except SalesCustomer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_records(request, staff_id=None):
    if request.method == "GET":
        if staff_id is not None:
            sales_person = SalesPerson.objects.get(id=staff_id)
            records = SalesRecord.objects.filter(sales_person=sales_person)
        else:
            records = SalesRecord.objects.all()
        return JsonResponse(
            {"records": records},
            encoder=SalesRecordEncoder,
        )
    else:
        try:
            content = json.loads(request.body)

            vin_num = content["automobile"]
            sales_person_id = content["sales_person"]
            customer_id = content["customer"]

            content["automobile"] = AutomobileVO.objects.get(vin=vin_num)
            content["sales_person"] = SalesPerson.objects.get(id=sales_person_id)
            content["customer"] = SalesCustomer.objects.get(id=customer_id)

            record = SalesRecord.objects.create(**content)
            return JsonResponse(
                record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except (
            AutomobileVO.DoesNotExist,
            SalesPerson.DoesNotExist,
            SalesCustomer.DoesNotExist,
        ) as e:
            message = "Error has occurred."
            if "AutomobileVO" in str(e):
                message = "Invalid vin number."
            if "SalesPerson" in str(e):
                message = "Invalid sales person id"
            if "SalesCustomer" in str(e):
                message = "Invalid customer id"
            response = JsonResponse({"message": message})
            response.status_code = 404
            return response


@require_http_methods(["GET", "PUT", "DELETE"])
def api_record(request, pk):
    if request.method == "GET":
        try:
            record = SalesRecord.objects.get(id=pk)
            return JsonResponse(
                record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            record = SalesRecord.objects.get(id=pk)
            record.delete()
            return JsonResponse(
                record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:  # PUT
        try:
            content = json.loads(request.body)
            record = SalesRecord.objects.get(id=pk)

            props = ["vin", "sales_person", "customer", "price"]
            for prop in props:
                if prop in content:
                    if prop == "vin":
                        vin = AutomobileVO.objects.get(vin=content["vin"])
                        setattr(record, prop, vin)
                    elif prop == "sales_person":
                        sales_person = SalesPerson.objects.get(id=content["sales_person"])
                        setattr(record, prop, sales_person)
                    elif prop == "customer":
                        customer = SalesCustomer.objects.get(id=content["customer"])
                        setattr(record, prop, customer)
                    else:
                        setattr(record, prop, content[prop])
            record.save()
            return JsonResponse(
                record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except (
            SalesRecord.DoesNotExist,
            AutomobileVO.DoesNotExist,
            SalesPerson.DoesNotExist,
            SalesCustomer.DoesNotExist,
        ) as e:
            message = "Error has occurred."
            if "SalesRecord" in str(e):
                message = "Record does not exist."
            if "AutomobileVO" in str(e):
                message = "Invalid vin number."
            if "SalesPerson" in str(e):
                message = "Invalid sales person id"
            if "SalesCustomer" in str(e):
                message = "Invalid customer id"
            response = JsonResponse({"message": message})
            response.status_code = 404
            return response
