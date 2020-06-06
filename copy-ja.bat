git fetch
cd pages/ja
git add --all
git commit -a -m %1
git pull origin pages/ja
git push origin pages/ja
cd ../en
git commit -a -m %1
git pull origin pages/en
git pull origin pages/ja
git push origin pages/en
cd ../fr
git commit -a -m %1
git pull origin pages/fr
git pull origin pages/ja
git push origin pages/fr
cd ../de
git commit -a -m %1
git pull origin pages/de
git pull origin pages/ja
git push origin pages/de
cd ../..
