---
title: 🤜MISSKEY IS NOT MASTODON🤛
description: MisskeyはMastodonではありません。
layout: blog
date: 2018-08-17T09:00:00+09:00
mtimes:
  - 2018-11-10T20:30:00+09:00
thumbnail: /files/images/imports/2018/07/sky.jpg
author:
  name: aqz
  url: https://yuzulia.xyz/@aqz
  avatar: aqz
category: 
amp: true
---
MisskeyはMastodonではありません。

## なぜMisskeyはMastodonではないのか
MisskeyがMastodonではないからです。これは運命です。これは自然の理です。そして、これは常識にならなければなりません。

Misskeyは永遠にMastodonにはなれませんし、MastodonもMisskeyになることはないでしょう。

MisskeyとMastodonは本質的に異なります。

FediverseはMastodonだけのものではありません。もちろんMisskeyだけのものでもありません。  
Misskey、Mastodon、その他の分散型SNSを繋ぐActivityPub規格は標準化団体が定めたもので、公共のものです。

### 確かに両者は似ています。
両者とも、ActivityPub規格に準拠していて、ローカルタイムラインがあったり投稿の公開範囲が設定できたりすることは共通しています。

### 作者が違います
Misskeyはしゅいろが作り始めました。MastodonはEugen Rochko氏が作り始めました。  
両者とも、多くの人が機能向上・不具合修正・翻訳に参加しました。

### 依存するソフトウェア・ライブラリ、プログラミング言語が違います
MisskeyはほぼTypeScriptとVueで記述されています。MastodonはだいたいRubyとReactで記述されています。  
MisskeyインスタンスはNode.jsで動作します。MastodonはRubyで動きますが、それ以外にも多くの環境を動かさなければなりません。  
ただ、両者とも、Dockerを利用すれば簡単にインスタンスを動作させることができます。

Mastodonは連合のキューイングにSidekiqを利用しますが、MisskeyはRedisを利用するNode.jsライブラリを利用します。Misskeyの方が、より高速に、より多くの通信を他のインスタンスと行うことができます。

### 機能が違います
Mastodonはトゥートを投稿し共有するという一点に絞られて開発されています。  
補うために、様々なフォークも作られています。

一方、Misskeyは初めから機能が豊富です。オセロで遊べだり、ダイレクト投稿とは別にトーク画面があったりします。ちょっと多すぎ？

### アプリ（API）に互換性がありません
ActivityPubに関連する部分を除いて、APIに互換性は全くありません。  
Mastodonに対応しているクライアントアプリは、Misskeyにも対応しているものを除けば、Misskeyでは利用できません。

### 中央集権に対する態度が違います
Mastodonは #DeleteTwitter、#DeleteFacebook、脱中央集権を掲げ、集約（中央集権）型SNSの問題点を強く批判しています。

一方、Misskeyにそのような理念はあまりありません。  
Misskeyは初めから分散型SNSとして設計されていたわけではありません。  
分散型（脱中央集権）であれ集約型であれ、ユーザーは自分が一番快適な環境に身を置くべきです。

## 結局どちらがいいのか
どのソフトウェアの、どのインスタンスを選択し、どのような使い方をするかは、あなたの手に委ねられています。

SNSはMisskeyとMastodonだけではありません。あなたが必要としているものがそもそもTwitter型のSNSではないのかもしれません。  
ぜひ、沢山のサービスを見つけ、試してみてください。  
もし良いサービスが見つかったら、そこに友だちを招待してくださいね！
