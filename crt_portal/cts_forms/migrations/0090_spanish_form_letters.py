# Generated by Django 2.2.13 on 2020-09-01 18:18

from django.db import migrations


def add_spanish_templates(apps, schema_editor):
    ResponseTemplate = apps.get_model('cts_forms', 'ResponseTemplate')
    ResponseTemplate.objects.create(
        title='CRT - Non-Actionable (Spanish)',
        subject='',
        body="""
        """)
    ResponseTemplate.objects.create(
        title='CRT - No Capacity (Spanish)',
        subject='',
        body="""
        """)
    ResponseTemplate.objects.create(
        title='CRT - Comments & Opinions (Spanish)',
        subject='',
        body="""
        """)
    ResponseTemplate.objects.create(
        title='CRT - Request for Agency Review (Spanish)',
        subject='',
        body="""
        """)
    ResponseTemplate.objects.create(
        title='HCE - Referral for Housing/Lending/Public Accommodation (Spanish)',
        subject='',
        body="""
        """)
    ResponseTemplate.objects.create(
        title='SPL - Referral for PREA Issues (Spanish)',
        subject='',
        body="""
        """)


def remove_spanish_templates(apps, schema_editor):
    ResponseTemplate = apps.get_model('cts_forms', 'ResponseTemplate')
    templates = ResponseTemplate.objects.filter(title__icontains='(Spanish)')
    templates.delete()


class Migration(migrations.Migration):

    dependencies = [
        ('cts_forms', '0089_crm-referral-to-fbi'),
    ]

    operations = [
        migrations.RunPython(add_spanish_templates, remove_spanish_templates)
    ]
