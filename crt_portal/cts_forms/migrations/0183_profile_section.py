# Generated by Django 4.2.3 on 2023-10-20 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cts_forms', '0182_add_section_records_staff'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='section',
            field=models.TextField(blank=True, choices=[('ADM', 'Administrative'), ('APP', 'Appellate'), ('CRM', 'Criminal'), ('DRS', 'Disability Rights'), ('ELS', 'Employment Litigation'), ('EOS', 'Educational Opportunities'), ('FCS', 'Federal Coordination and Compliance'), ('HCE', 'Housing and Civil Enforcement'), ('IER', 'Immigrant and Employee Rights'), ('POL', 'Policy'), ('SPL', 'Special Litigation'), ('VOT', 'Voting')], default=None, null=True),
        ),
    ]
