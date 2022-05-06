from django.db import migrations, connection

def create_materialized_form_letters_sent_view(apps, schema_editor):
    with connection.cursor() as cursor:
        cursor.execute("""
            CREATE MATERIALIZED VIEW form_letters_sent AS
            SELECT cts_forms_report.id AS report_id, cts_forms_report.assigned_section, actstream_action.timestamp
            FROM cts_forms_report
            JOIN actstream_action
            ON cts_forms_report.id = CAST(actstream_action.target_object_id as int)
            WHERE actstream_action.verb LIKE 'Contacted complainant:';
        """)

def revert_materialized_form_letters_sent_view(apps, schema_editor):
    with connection.cursor() as cursor:
        cursor.execute("""
            DROP MATERIALIZED VIEW form_letters_sent
        """)

class Migration(migrations.Migration):

    dependencies = [
        ('cts_forms', '0143_alter_report_district'),
    ]

    operations = [
        migrations.RunPython(create_materialized_form_letters_sent_view, create_materialized_form_letters_sent_view)
    ]