# Generated by Django 4.0.3 on 2022-10-25 16:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(max_length=17)),
                ('vip', models.BooleanField(default=False)),
                ('import_href', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Technician',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('employee_id', models.PositiveSmallIntegerField(max_length=5, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('finished', models.BooleanField(default=False)),
                ('automobile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointment', to='service_rest.automobilevo')),
                ('technician', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='appointment', to='service_rest.technician')),
            ],
        ),
    ]
