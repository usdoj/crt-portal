# Generated by Django 2.2.8 on 2020-01-21 23:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cts_forms', '0034_update_election_choices'),
    ]

    operations = [
        migrations.AddField(
            model_name='report',
            name='commercial_or_public_place',
            field=models.CharField(choices=[('place_of_worship', 'Place of worship'), ('store', 'Commercial or retail building'), ('healthcare', 'Healthcare facility'), ('financial', 'Financial institution'), ('public_space', 'Public outdoor space'), ('other', 'Other')], default=None, max_length=225, null=True),
        ),
        migrations.AddField(
            model_name='report',
            name='other_commercial_or_public_place',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
