# Generated by Django 2.2.24 on 2021-07-22 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cts_forms', '0122_auto_reply_form_letter'),
    ]

    operations = [
        migrations.AddField(
            model_name='report',
            name='number_contacts',
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddIndex(
            model_name='report',
            index=models.Index(fields=['-create_date', 'number_contacts', 'assigned_to', 'location_name'], name='cts_forms_r_create__b1ecc0_idx'),
        ),
    ]
