#!/bin/sh
git fetch
cd dist
git worktree remove dist
git branch -D dist
git worktree add dist dist
cd ..
git add --all
git commit -a -m $1
git pull
