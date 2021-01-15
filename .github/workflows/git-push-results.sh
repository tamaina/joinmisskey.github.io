#!/bin/sh
git fetch
cd docs
git filter-branch -f --index-filter "git rm -rf --ignore-unmatch ./ --cached" --prune-empty
git add --all
git commit -a -m "auto-built from $GITHUB_SHA"
git push --force origin master
cd ../dist
git add --all
git commit -a -m "auto-built from $GITHUB_SHA"
git push --force origin dist
cd ..
