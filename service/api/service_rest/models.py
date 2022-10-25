from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    import_href = models.CharField(unique=True, max_length=200)

class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField(unique=True, max_length=5)

    def __str__(self):
        return self.name

class Service(models.Model):
    customer_name = models.CharField(max_length=200)
    vin = models.CharField(max_length=100)
    appointment_date_time = models.DateTimeField(null=True, blank=True)
    reason = models.TextField
    technician = models.ForeignKey(
        "Technician",
        related_name="appointment",
        on_delete=models.PROTECT,
    )
    is_vip = models.BooleanField(default=False)
