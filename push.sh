#!/bin/sh
git fetch
cd dist
git add --all
git commit -a -m $1
git pull
git push origin dist
cd ..
git add --all
git commit -a -m $1
git pull
git push origin src
