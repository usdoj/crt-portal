# Generated by Django 4.2.3 on 2023-12-20 16:47
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cts_forms', '0190_alter_retentionschedule_options'),
    ]

    operations = [
        # NOTE: This is causing problems on production, so we're disabling it:
        # See replacement at management/commands/backfill_ten_year_retention.py
        migrations.RunPython(migrations.RunPython.noop,
                             migrations.RunPython.noop),
    ]
