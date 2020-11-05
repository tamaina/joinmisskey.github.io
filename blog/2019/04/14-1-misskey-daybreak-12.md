---
title: Misskey <<daybreak>> v11.0.0 Released!!
description: Misskeyの新しいバージョン「daybreak」がリリースされました。データベースソフトウェアをPostgreSQLに変更しました。
layout: blog
date: 2019-04-14T23:00:00+09:00
thumbnail: /files/images/imports/2019/04/dbk-lg.png
author:
  name: aqz
  url: https://misskey.xyz/@aqz
  avatar: aqz
category: 更新
amp: true
---
![Misskey daybreak](/files/images/imports/2019/04/dbk-lg.png)

Misskeyの新しいバージョン「daybreak」の正式版がついにリリースされました。データベースソフトウェアをMongoDBからPostgreSQLに変更しました。  
[**詳細はCHANGELOGをご覧ください。**](https://https://github.com/syuilo/misskey/blob/59cb7992e2d68529fcc4cc921e69349bad758594/CHANGELOG.md#1100-daybreak)

v11.0.0では、PostgreSQLにしたこと以外の変更はあまりありません。

- アカウントを完全に削除できるように
- 投稿フォームで添付ファイルの閲覧注意を確認/設定できるように
- ミュート/ブロック時にそのユーザーの投稿のウォッチをすべて解除するように
- フォロー申請数が実際より1すくなくなる問題を修正
- リストからアカウント削除したユーザーを削除できない問題を修正
- リストTLでフォローしていないユーザーの非公開投稿が流れる問題を修正
- リストTLでダイレクト投稿が流れない問題を修正
- ミュートしているユーザーの投稿がタイムラインに流れてくることがある問題を修正
