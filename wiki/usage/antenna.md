---
title: アンテナ
description: アンテナを設置してエゴサーチしよう。
layout: wiki
rank: 3.2
prev: /wiki/usage/hashtag
next: /wiki/usage/interactions
---
アンテナを設置してエゴサーチしよう。

## アンテナの設定
メニューの`アンテナ`からアンテナの追加・設定を行える。

### 受信ソース
対象のユーザーを指定する。

### 受信/除外キーワード

#### クエリの記入方法
1つのキーワード（たとえば`misskey`）を検索するなら、以下のように記入する。

```
misskey
```

さらに、簡単な条件を指定して検索できる。  
半角スペースは`and`、改行は`or`となる。  

```
misskey syuilo
misskey aqz
```

この場合、`misskey syuilo`・`misskey aqz`の2つのパターンのいずれかにあてはまるノートが表示される。
