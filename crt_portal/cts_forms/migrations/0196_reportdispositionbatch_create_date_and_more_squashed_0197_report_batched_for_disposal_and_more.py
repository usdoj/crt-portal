# Generated by Django 4.2.3 on 2024-03-03 19:15

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    replaces = [('cts_forms', '0196_reportdispositionbatch_create_date_and_more'), ('cts_forms', '0197_report_batched_for_disposal_and_more')]

    dependencies = [
        ('cts_forms', '0195_remove_profile_saved_searches_savedsearch_created_by_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='reportdispositionbatch',
            name='proposed_disposal_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='report',
            name='batched_for_disposal',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='reportdispositionbatch',
            name='create_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 3, 2, 14, 8, 31, 871687)),
        ),
    ]
