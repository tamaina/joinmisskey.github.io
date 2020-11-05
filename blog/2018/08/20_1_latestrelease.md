---
title: 最近の更新 ～7.1.1
description: バグ修正など
layout: blog
date: 2018-08-20T13:00:00+09:00
thumbnail: /files/images/imports/2018/07/hirasawa.jpg
author:
  name: aqz
  url: https://yuzulia.xyz/@aqz
  avatar: aqz
category: 更新
amp: true
---
## 【管理者向け】Migration
[CHANGELOG](https://https://github.com/syuilo/misskey/blob/59cb7992e2d68529fcc4cc921e69349bad758594/CHANGELOG.md#700)に従いMigrationを実行してください。

## 更新
### 関西弁
言語設定で関西弁が選択できるようになりました。

この記事も本当は関西弁で記述したかったのですが、似非関西弁はすぐ指摘されてしまうようなのでやめておきます。

### 画像の閲覧注意関連
#### ドライブでの表示
ドライブで画像に閲覧注意が付いているかどうか一目でわかるようになりました。

#### リモートと連携
閲覧注意がリモートと連携されるようになりました。  
これでようやく安心してリモートのユーザーをフォローできます。

#### 不具合修正
閲覧注意が解除できない問題を修正しました。

### 設定ファイルなしでビルドできるように
設定ファイルを更新した後、ビルドする手間がなくなります。

### 管理画面の強化
管理画面がより良い感じになりました。

### アプリ作成支援
nameIdが廃止され、アプリ作成時にappSecretを返すようになりました。