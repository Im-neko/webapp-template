#!/bin/bash
set -e

if [ -e ./scripts/$1 ]; then
  ./scripts/"$@"
else
  exec "$@"
fi

exit;
