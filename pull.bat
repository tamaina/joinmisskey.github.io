git fetch
cd dist
git add --all
git commit -a -m %1
git pull
cd ..
git add --all
git commit -a -m %1
git pull
