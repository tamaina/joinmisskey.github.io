---
title: 連合リレー
description: ActivityPubの投稿リレーサービス、またそのサーバーソフトウェア
layout: wiki
---
**連合リレー**とは、[ActivityPub](activitypub)のアクティビティ（投稿や削除）をリレーするサービス、またそのサーバーソフトウェアのことである。  
最初の連合リレーの実装の名称である**Pub-Relay**が連合リレーを指す語として用いられることが多い。

## 概要
連合リレーは、[Fediverse](fediverse)内での交流を活発化するためのサービスである。

インスタンスが連合リレーに参加すると、その連合リレーに参加している他のインスタンスのユーザーの全ての公開投稿がグローバル（連合）タイムラインに流れるようになる。  
これは、グローバルTLに連合リレーに参加しているインスタンスのローカルTLの全てが流れてくることと同じである。  
連合リレーに参加するだけで、連合の様々な話題に触れることができるようになるだろう。

連合リレーの自体の働きは、参加インスタンスを管理することと、インスタンスから受信したアクティビティを各参加インスタンスに配信（ブロードキャスト）することとがある。

Misskeyをはじめ連合リレーに対応するインスタンスのソフトウェアは、連合リレーへの参加を管理する機能と、連合リレーとアクティビティを送受信する機能とを備えている。

## 主要な連合リレーサーバー（日本語話者向け）
- [YUKIMOCHI Toot Relay Service](https://relay.toot.yukimochi.jp/)
- [Enjoy Fediverse](https://relay.mstdn-jp.site/ui/)
- [h3zjp ActivityPub Relay Server](https://pub-relay.hama3.net/)
- [taruntarun relay](https://relay.taruntarun.net/)
- [Fedibird Relay Service](https://relay.fedibird.com/)

## 実装
### 連合リレーの
連合リレーは、その実装方法の差異によってMastodon方式とPleroma方式の2種類に分けられる。  
MisskeyはMastodon方式で実装されている。

#### Mastodon方式
Mastodonの連合リレーがとる方式は、リレーサーバーが各インスタンスに投稿等のアクティビティそのものを配信するものである。

この方式は、一つのアクティビティを配信するために、`発信者のインスタンス → リレーサーバー → 各インスタンス`と、後述のPleroma方式にくらべて単純な通信をすれば済む。

一方、リレーサーバーから配信されたアクティビティが本当に発信者のものかどうか検証するために、インスタンスはアクティビティへの**LDシグネチャ**（Linked Data Signature）と呼ばれる署名とその検証に対応する必要がある。

Mastodon方式の実装の多くはPleroma方式にも対応している。

#### Pleroma方式
Pleromaの連合リレーがとる方式は、リレーサーバーが各インスタンスにAnnounceアクティビティを配信するものである。

Announceアクティビティとは、リノート（ブースト）である。  
この方式では、LDシグネチャへの対応が不要だ。  
しかし、リレーサーバーからのAnnounceアクティビティが到着した後に、各インスタンスは発信元インスタンスへ投稿の問い合わせを行う。参加インスタンスが100あった場合、一回の投稿ごとに発信元インスタンスに対して99の問い合わせが発生するということである。これは、Announceアクティビティは元のアクティビティそのものを配信するものではないためである。

### 主な実装
- [Activity-Relay](https://github.com/yukimochi/Activity-Relay) by YUKIMOCHI
  * Mastodon方式。Goでの実装。
- [Pub-Relay](https://source.joinmastodon.org/mastodon/pub-relay) by Mastodon
  * Mastodon公式の連合リレー。Crystalでの実装。
- [relay by Pleroma](https://git.pleroma.social/pleroma/relay)
  * Pleroma公式の連合リレー。Pythonでの実装。

### 連合リレーに対応するActivityPub実装
- [Mastodon](../softwares/mastodon) バージョン2.5.0より対応
- [Misskey](../softwares/misskey) バージョン12.37.0より対応
- Pleroma
  * Pleroma方式のみ対応

## 外部リンク
- [連合リレーと Activity Relay （雪餅の鯖缶日誌）](https://blog.yukimochi.jp/2018/12/fediverse-with-relay.html)
- [リレーサーバの内部の仕組み （noellabo's tech blog）](https://noellabo.qrunch.io/entries/cS3PkZFqMXK4linH)
- [Pub-Relay （マストドン日本語ウィキ）](https://ja.mstdn.wiki/Pub-relay)
