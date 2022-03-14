#!/bin/sh

cd /server/

python manage.py collectstatic --noinput

sleep 3

python manage.py migrate

sleep 3

python manage.py initadmin

gunicorn server.wsgi -b 0.0.0.0:8000

exec "$@"
