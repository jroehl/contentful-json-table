#!/usr/bin/env bash

set -e

for space_id in $(echo ${CONTENTFUL_SPACE_IDS} | sed "s/,/ /g"); do
  node_modules/.bin/contentful config add \
    --active-space-id ${space_id} \
    --active-environment-id master \
    --management-token ${CONTENTFUL_MANAGEMENT_TOKEN}

  node_modules/.bin/contentful extension update --force
done