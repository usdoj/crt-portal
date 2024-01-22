# Generated by Django 4.2.7 on 2024-01-22 16:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cts_forms', '0192_alter_report_crt_reciept_year_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='report',
            name='disposed',
            field=models.BooleanField(default=False),
        ),
        migrations.CreateModel(
            name='ReportDispositionBatch',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('disposed_date', models.DateTimeField(auto_now_add=True)),
                ('disposed_count', models.IntegerField(default=0)),
                ('disposed_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='disposed_report_batches', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ReportDisposition',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('public_id', models.CharField(help_text='The record locator for the disposed report', max_length=100)),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='disposed_reports', to='cts_forms.reportdispositionbatch')),
                ('schedule', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='disposed_reports', to='cts_forms.retentionschedule')),
            ],
        ),
    ]
