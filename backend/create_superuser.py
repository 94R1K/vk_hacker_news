import os

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError


class Command(BaseCommand):
    help = 'Создает суперпользователя из переменных среды'

    def handle(self, *args, **options):
        username = os.getenv('DJANGO_SUPERUSER_USERNAME', 'admin')
        email = os.getenv('DJANGO_SUPERUSER_EMAIL', 'admin@vk.com')
        password = os.getenv('DJANGO_SUPERUSER_PASSWORD', 'admin')
        User = get_user_model()
        if not User.objects.filter(username=username).exists():
            try:
                User.objects.create_superuser(username=username, email=email, password=password)
                self.stdout.write(self.style.SUCCESS('Суперпользователь успешно создан!'))
            except IntegrityError:
                self.stdout.write(self.style.WARNING('Данный суперпользователь уже создан!'))
