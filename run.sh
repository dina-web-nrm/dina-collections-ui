#!/usr/bin/env bash
set -e
set -x

export NODE_ENV="${NODE_ENV:-development}"

if [ $NODE_ENV == "development" ]; then
  # this runs webpack-dev-server with hot reloading
  npm start
else
  # build the app and serve it via nginx
  npm run build
  mkdir -p $ROOT/logs/nginx
  nginx -g 'daemon off;' -c $ROOT/src/nginx.conf
  nginx -c $ROOT/src/nginx.conf
fi
