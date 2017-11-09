#!/usr/bin/env bash
set -e
set -x

mkdir -p $ROOT/logs/nginx
nginx -g 'daemon off;' -c $ROOT/src/nginx.conf
nginx -c $ROOT/src/nginx.conf

