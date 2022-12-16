# Generated by Django 3.2.16 on 2022-12-16 20:47

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('cts_forms', '0159_remove_test_form_letters'),
    ]

    operations = [
        migrations.CreateModel(
            name='Campaign',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('internal_name', models.CharField(help_text='The non-publicly-facing name for this campaign', max_length=100, unique=True)),
                ('description', models.TextField(blank=True, max_length=1000)),
                ('show_in_filters', models.BooleanField(default=True)),
            ],
        ),
        migrations.AddField(
            model_name='report',
            name='origination_utm_content',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='report',
            name='origination_utm_medium',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='report',
            name='origination_utm_source',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='report',
            name='origination_utm_term',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='report',
            name='origination_utm_campaign',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reports', to='cts_forms.campaign'),
        ),
    ]
