# Generated by Django 3.2.17 on 2023-02-28 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cts_forms', '0165_create_report_contact_email_index'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='foo',
            field=models.CharField(default='asdf', help_text='foo', max_length=100, unique=True),
            preserve_default=False,
        ),
    ]
