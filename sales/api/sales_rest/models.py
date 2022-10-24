from django.core.validators import RegexValidator
from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return f"{self.vin}"


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name}"

    def get_api_url(self):
        return reverse("api_person", kwargs={"pk": self.pk})


class SalesCustomer(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    phone_regex = RegexValidator(
        regex=r"^\+?1?\d{9,15}$",
        message="Phone number must be entered in the format: '+999999999'",
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=17)

    def __str__(self):
        return f"{self.name}"

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.pk})


class SalesRecord(models.Model):
    vin = models.ForeignKey(
        AutomobileVO,
        related_name="sales_record",
        on_delete=models.PROTECT,
    )
    sales_person = models.ForeignKey(
        "SalesPerson",
        related_name="sales_record",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        "SalesCustomer",
        related_name="sales_record",
        on_delete=models.PROTECT,
    )
    price = models.DecimalField(max_digits=19, decimal_places=2)

    def __str__(self):
        return f"Sale of {self.vin} by {self.sales_person}"

    def get_api_url(self):
        return reverse("api_record", kwargs={"pk": self.pk})
