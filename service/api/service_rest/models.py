from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    vip = models.BooleanField(default=False)
    import_href = models.CharField(unique=True, max_length=200)


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return self.name


class Service(models.Model):
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    technician = models.ForeignKey(
        "Technician",
        related_name="appointment",
        on_delete=models.PROTECT,
    )
    reason = models.TextField
    finished = models.BooleanField(default=False)
