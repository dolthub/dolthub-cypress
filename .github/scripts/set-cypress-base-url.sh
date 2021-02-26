#!/bin/bash

set -e

if [[ $# -ne 1 ]]; then
  echo "Usage: ./set-cypress-base-url.sh SERVICE"
  echo "  Example: ./set-cypress-base-url.sh dolthub"
  exit 1
fi

echo "This is the service input to determine base_url: $1"

if [ "$1" = "dolthub" ]; then
  echo "::set-output name=cypress_base_url::https://dolthub.awsdev.ld-corp.com"
elif [ "$1" = "dolthub-v3" ]; then
  echo "::set-output name=cypress_base_url::https://dolthub-v3.awsdev.ld-corp.com"
else
  echo "$1 not currently supported"
  exit 1
fi
