#!/bin/bash
set -e

vue-tsc -p tsconfig.build.json
tsc-alias -p tsconfig.build.json
