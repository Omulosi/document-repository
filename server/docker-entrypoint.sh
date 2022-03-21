#!/bin/sh

until cd /server/
do
    echo "Waiting for server volume..."
done


until ./manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done

./manage.py collectstatic --noinput

./manage.py initadmin

gunicorn server.wsgi -b 0.0.0.0:8000 --workers 4 --threads 4

exec "$@"
