# Generated by Django 3.2.15 on 2022-09-27 18:26

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('cts_forms', '0152_reportsdata'),
    ]

    operations = [
        migrations.AddField(
            model_name='reportsdata',
            name='modified_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
