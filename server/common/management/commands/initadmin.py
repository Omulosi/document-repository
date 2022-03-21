from django.core.management.base import BaseCommand
from users.models import User
from django.conf import settings


class Command(BaseCommand):
    help = 'Create admin users'
    
    def handle(self, *args, **options):
        try:
            for user in settings.ADMINS:
                email = user[0]
                password = user[1]
                print('Creating account for admin: email (%s), password (%s)' % (email, password))
                user = User.objects.create_superuser(
                    email=email, 
                    password=password, 
                    role=User.ADMIN, 
                    access_level=User.TOP_SECRET)
                # user.activate()
                
        except Exception as e:
            print('Error creating admin account: ', e)