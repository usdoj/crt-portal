# Generated by Django 4.2.3 on 2023-10-26 15:42

import os

from django.db import migrations
from django.conf import settings

from analytics import models


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0005_alter_filegroupassignment_analytics_file_and_more'),
    ]

    if settings.TESTING:
        # The analytics user isn't needed for tests, and having the tests try to create it can break local development.
        operations = []
    elif os.environ.get('ENV', 'UNDEFINED') in ['STAGE']:
        operations = models.make_analytics_user()
    else:
        operations = []
