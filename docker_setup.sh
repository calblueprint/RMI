#!/bin/bash

# if .env doesn't exist, ask user to create it
if [ ! -e ".env" ] ; then
    echo ".env file doesn't exit! Please create it with environment variables needed."
    exit
fi

# Environment variables
#cp config/application.yml.sample config/application.yml

# Webpacker
cp config/webpacker.yml.docker config/webpacker.yml

# build docker images
docker-compose build

# create docker-compose compatible db config
cp config/database.yml.docker config/database.yml

docker-compose start
docker-compose run web rake db:create
docker-compose run web rake db:migrate

