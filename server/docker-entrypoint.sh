#!/bin/bash

cd /server/

python manage.py collectstatic --noinput

python manage.py migrate

# python manage.py initadmin

gunicorn server.wsgi -b 0.0.0.0:8000

exec "$@"