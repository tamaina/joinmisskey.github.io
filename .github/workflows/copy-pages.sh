#!/bin/sh
cd pages/en
git pull origin pages/en
git pull origin pages/ja
git push origin pages/en
cd ../fr
git pull origin pages/fr
git pull origin pages/ja
git push origin pages/fr
cd ../de
git pull origin pages/de
git pull origin pages/ja
git push origin pages/de
cd ../..
