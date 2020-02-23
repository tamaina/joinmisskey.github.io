---
title: 主要なフォークの一覧
description: Misskeyのソースコードは、ライセンスがAGPLv3.0で、GitHubで公開・管理されているため、フォークも容易だ。主要なフォークを紹介する。
layout: wiki
has_child: false
rank: 3.1
---
Misskeyのソースコードは、ライセンスがAGPLv3.0で、GitHubで公開・管理されているため、派生ソフトウェアの作成（Git用語で「フォーク」と呼ぶ）も容易だ。ここでは主要なフォークを紹介する。

## フォーク一覧
### v11ベース
#### Groundpolis
[Xeltica氏](culture/users/xeltica)によるフォーク。総合的なUIの改良ほか多種多様な機能の改良・追加がある。

##### 主な追加機能
- MFMの追加構文
  * X/Y軸回転
  * 縦反転
  * 点滅
  * マーキー
  * など
- 新規投稿のプレビュー
- 言語の追加（タメ口、ねこ語など）
- 投稿範囲「ログインユーザー」

[差分の詳細はこちらに記載されている。](https://github.com/Xeltica/Groundpolis/blob/develop/DIFFERENCE.md)

### v10ベース
#### twista
[硫酸鶏（acid chicken）氏](culture/users/acid-chicken)によるフォーク。twistaという名は、『アイドルマスター シャイニーカラーズ』に登場するSNSの名称である『ツイスタ』から採られている。先頭tは小文字である。

**[346design/twista.283.cloud on GitHub](https://github.com/346design/twista.283.cloud)** ･ **[twista Help](https://twista-docs.283.cloud)**

##### 主な追加機能
- 名前のチャットン
- `@everyone`、`@info`
- MFMの構文追加 (Mochimochi Fuwafuwa Markup)
  * アバター絵文字
  * 吹き出し構文
  * ルビ
  * 明朝体
  * OpenTypeフラグ
  * など
- imastodon.netなどのLTLを表示

[差分の詳細はこちらに記載されている。](https://github.com/346design/twista.283.cloud/blob/twista/README.md)

#### めいすきー
[めいめい（mei23）氏](culture/users/mei23)によるフォーク。「ニコフレ」に似た拡張が特徴的で、他にもUIの利便性向上や管理面でも改造が加えられている。

**[mei23/misskey on GitHub](https://github.com/mei23/misskey)** ･ **[オリジナルとの差分](https://mei23.github.io/misskey_m544_diff.html)**

##### 主な追加機能
- アバター絵文字
- 外部のカスタム絵文字を使用可能
- メンションにアバター絵文字が表示される
- 長い投稿はスクロールして表示される
- Renoteの取り消し
- 時限削除機能
- 投稿ボタンに公開範囲を二種類プリセット可能に

[差分の詳細はこちらに記載されている。](https://mei23.github.io/misskey_m544_diff.html)
