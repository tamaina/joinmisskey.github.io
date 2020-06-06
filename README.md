# join.misskey.page
The introduction site of [Misskey](https://github.com/syuilo/misskey)

## Usage
### Install

1. Install Node.js
2. Make a new folder and pushd to it
3. `git init`
4. `git remote add origin https://github.com/joinmisskey/joinmisskey.github.io.git`
5. `git fetch`
5. `git checkout src`
6. `npx yarn install`
8. `git worktree add docs master; git worktree add dist dist; git worktree add pages/ja pages/ja; git worktree add pages/en pages/en; git worktree add pages/fr pages/fr; git worktree add pages/de pages/de;`

### Build

1. Get campaign number and barer token of Patreon API and make `./.config/keys.yaml`: 
  ```
  patreon:
    campaign: xxxxxxx
    bearer: _.........
  ```
1. `npx gulp prebuild-files`  
   Run whenever you append images.  
   If you work on a forked repository, you never have to run this command, probably.
2. `npx gulp`

### Test
`npx gulp local-server`

### Compress images
#### Add Images
```
gulp image -i <glob-readable-path>
```

This command compresses bitmap images and produces:
- The **long side** is **equal or less than** 1200px
  * `/files/images/imports/yyyy/mm/<name>.<ext>`
  * `/files/images/imports/yyyy/mm/<name>.webp`
- The **long side** is **equal or less than** 720px
  * `/files/images/imports/yyyy/mm/<name>.720.<ext>`
  * `/files/images/imports/yyyy/mm/<name>.720.webp`
- The **long side** is **equal or less than** 360px
  * `/files/images/imports/yyyy/mm/<name>.360.<ext>`
  * `/files/images/imports/yyyy/mm/<name>.360.webp`

It also compresses bector images.

#### Recompress All Images
```
gulp image-prebuildFiles
```

### Translation
#### Add a new language
First, fork this repository, set yours as 'origin' on git and set this one as 'upstream'.

1. `cd pages/ja`
2. `git checkout -b pages/<languagecode>`
3. `git checkout pages/ja`
4. `cd ../..`
5. `git worktree add pages/<languagecode> pages/<languagecode>`
6. `cd pages/<languagecode>`
7. `git push --set-upstream origin pages/<languagecode>`
8. `cd ../..`
9. Add the language in these files: `README.md`(l14), `.config/lang.json`.
10. Commit these changes to your fork.
11. Make [new issue](https://github.com/joinmisskey/joinmisskey.github.io/issues/new) to ask aqz or syuilo to add a new language.
    We will make branch `pages/<languagecode>`
12. Make pull requests of 2 branches, `pages/<languagecode>` and `src`.

## LICENSES
### CONTENTS
Files in `pages/**/*`: All rights reserved  
Files in `files/**/*` or `dist/**/*`: No License or the license that the file has in metadata

### SYSTEM
the others: "maqz" system, under CC0
