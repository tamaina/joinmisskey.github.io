#!/bin/sh
git fetch
git worktree remove dist
git branch -D dist
git worktree add dist dist
git add --all
git commit -a -m $1
git pull
