#!/bin/bash

set -e

if [[ $# -ne 1 ]]; then
  echo "Usage: ./set-service-name.sh SERVICE"
  echo "  Example: ./set-service-name.sh dolthub"
  exit 1
fi

echo "This is the service input: $1"

if [ "$1" = "dolthub" ]; then
  echo "::set-output name=service::dolthub"
elif [ "$1" = "dolthub-v3" ]; then
  echo "::set-output name=service::dolthub-v3"
else
  echo "$1 not currently supported"
  exit 1
fi
