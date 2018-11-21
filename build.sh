#!/bin/sh
CURRENT_PATH=$(cd "$(dirname "$0")"; pwd)

APP_NAME="bend-sdk"
APP_VERSION=$(git rev-list HEAD | head -n 1)
#rm -fr $CURRENT_PATH/output && mkdir -p $CURRENT_PATH/output/webroot && mkdir $CURRENT_PATH/output/template
node build/build.js
