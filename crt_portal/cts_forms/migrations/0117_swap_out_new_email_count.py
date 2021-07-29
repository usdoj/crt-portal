# Generated by Django 2.2.24 on 2021-07-29 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cts_forms', '0116_add_email_count_data'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='emailreportcount',
            name='report',
        ),
        migrations.RemoveIndex(
            model_name='report',
            name='cts_forms_r_create__b1ecc0_idx',
        ),
        migrations.RenameField(
            model_name='report',
            old_name='number_contacts',
            new_name='email_count',
        ),
        migrations.AddIndex(
            model_name='report',
            index=models.Index(fields=['-create_date', 'email_count', 'assigned_to', 'location_name'], name='cts_forms_r_create__bbb07e_idx'),
        ),
        migrations.DeleteModel(
            name='EmailReportCount',
        ),
    ]
