#!/bin/bash

# A script for starting the node server in test mode,
# then running tests in spec/

BASE_DIR=$(dirname $0)

echo ""
echo "Starting Node Server..." 

node $BASE_DIR/../server.js test &

sleep 1s

echo ""
echo "Running tests..."
$BASE_DIR/../node_modules/jasmine-node/bin/jasmine-node spec

pkill -n node
