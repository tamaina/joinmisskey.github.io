#!/bin/sh
git fetch
git add --all
git commit -a -m %1
git pull
git push origin src
