#!/bin/bash
#Needs to be db cleaner
echo 'Running database migrations' 
sequelize db:migrate 
echo 'Running database seeders'
sequelize db:seed:all
echo 'Database initialized'

