#!/bin/sh
git fetch
cd pages/ja
git add --all
git commit -a -m $1
git pull origin pages/ja
git push origin pages/ja
cd ../en
git add --all
git commit -a -m $1
git pull origin pages/en
git pull origin pages/ja
git push origin pages/en
cd ../fr
git add --all
git commit -a -m $1
git pull origin pages/fr
git pull origin pages/ja
git push origin pages/fr
cd ../..
