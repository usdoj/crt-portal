import functools
import traceback
from django.core.management.base import BaseCommand
from datetime import datetime

from cts_forms.models import SavedSearch, ScheduledNotification, NotificationPreference
from cts_forms.filters import get_report_filter_from_search


@functools.cache
def _get_new_reports(search, last_checked):
    queryset, _ = get_report_filter_from_search(search)
    return queryset.filter(create_date__gt=last_checked).count()


def _maybe_schedule_for(preference: NotificationPreference, search: SavedSearch):
    frequency = preference.saved_searches.get(str(search.pk), 'none')
    if frequency == 'none':
        return

    last_checked = datetime.fromisoformat(preference.saved_searches_last_checked[str(search.id)])
    new_reports = _get_new_reports(search, last_checked)

    if not new_reports:
        return

    key = f'saved_search_{search.pk}'
    if frequency == 'threshold':
        count = preference.saved_searches_count.get(str(search.pk), 0) + new_reports
        preference.saved_searches_count[str(search.pk)] = count
        preference.save()
        threshold = preference.saved_searches_threshold.get(str(search.pk), 0)
        if count < threshold:
            return
        preference.saved_searches_count[str(search.pk)] = 0
    scheduled = ScheduledNotification.find_for(preference.user, frequency)
    if key not in scheduled.notifications:
        scheduled.notifications[key] = {
            'name': search.name,
            'new_reports': 0,
        }
    scheduled.notifications[key]['new_reports'] += new_reports
    scheduled.save()


def _process_preference(preference: NotificationPreference):
    search_ids = preference.saved_searches.keys()
    searches = SavedSearch.objects.filter(id__in=search_ids).all()
    now = datetime.now().isoformat()

    for search in searches:
        _maybe_schedule_for(preference, search)
        preference.saved_searches_last_checked[str(search.id)] = now
    preference.save()


class Command(BaseCommand):
    help = 'Sends any scheduled digest notifications'

    def handle(self, *args, **options):

        preferences = NotificationPreference.objects.exclude(saved_searches__exact={}).all()

        for preference in preferences.all():
            try:
                _process_preference(preference)
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error processing preference {preference.pk}: {e}\n\n{traceback.format_exc()}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Post-processed report {preference.pk}'))
