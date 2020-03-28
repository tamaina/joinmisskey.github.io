---
title: メールサーバーを設定する
description: MisskeyにはアカウントとEメールアドレスを紐づける機能がある。これには管理者側での設定が必要。
layout: wiki
rank: 2
prev: /wiki/developers/installation
next: /wiki/developers/relationships
---
MisskeyのEメール連携を利用するには、`インスタンス` > `設定`でメールサーバーの設定を行う。

メールサーバーの設定は、メーラーで設定するのと同じようにSMTPの設定を行えばよい。GmailやYahoo!メールでも利用可能。  
設定値は各メールサービスで異なるため、各メールサービスのヘルプページなどで設定値を確認されたい。

設定が行えたら保存をクリックする。試しに自分のアカウントに認証リンクが送られてくるか確かめてみよう。

## Mailgunを使用する
Mailgunは、SMTPサーバーを提供するサービスであり、送信は1か月に1万件までなら無料で利用できる。  
毎月の支払ではないためデビットカードでも登録が可能である。

Mailgunの設定方法については、[さつき氏の『Misskey・Mastodon鯖缶のためのMailgunの使い方』](https://qiita.com/u1-liquid/items/9aadd3a057c5629fa79f)を参照されたい。
