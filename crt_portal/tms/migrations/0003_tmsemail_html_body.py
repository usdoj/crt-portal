# Generated by Django 4.2.2 on 2023-07-07 20:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tms', '0002_tmsemail_purpose'),
    ]

    operations = [
        migrations.AddField(
            model_name='tmsemail',
            name='html_body',
            field=models.TextField(help_text='HTML body of outbound email, if present', null=True),
        ),
    ]
