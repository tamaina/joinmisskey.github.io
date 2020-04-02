---
title: 他のサービスとの連携を設定する
description: Twitter、GitHubおよびDiscordでの認証を利用することができる。これには管理者側での設定が必要である。
layout: wiki
rank: 2.1
prev: /wiki/developers/email
next: /wiki/developers/moderation
---
## Twitter
一時期話題になったことだが、Twitterアプリの作成には使用用途を記入し審査を受ける必要がある。  
審査には数日かかるようだ。

### 1. Twitterアカウントを作成
Twitterアカウントを持っていない場合、作成する必要がある。

### 2. Developer Accountとして認証し、アプリを作成
[この記事(A)](https://masatoshihanai.com/php-twitter-bot-01/#Twitter_APIdeveloper_account)や[この記事(B)](https://www.torikun.com/entry/twitter-developer-api#Twitter-Developer%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9)を参考にDeveloper Accountとして認証し、アプリを作成する。  
（記事AはDeveloper Accountの認証まで、記事Bはアプリの作成まで解説されている）

アプリのコールバックURLは`https://(your-misskey-instance)/api/tw/cb`というように指定する（(your-misskey-instance)は自分のインスタンスのドメインに置き換える）。

### 3. キーをデータベースに登録
`インスタンス` > `設定` > `連携` > `Twitter`で`Twitter連携を有効にする`を有効にし、 Consumer Id と Consumer Secret を記入する。

## GitHub
GitHubの連携の設定はとても簡単。

### 1. GitHubアカウントを作成
GitHubアカウントを持っていない場合、作成する必要がある。

### 2. OAuth Appを作成
https://github.com/settings/developers にアクセスし`New Oauth App`をクリック。

Authorization callback URLは`https://(your-misskey-instance)/api/gh/cb`というように指定する（your-misskey-instance)は自分のインスタンスのドメインに置き換える）。

### 3. キーをデータベースに登録
`インスタンス` > `設定` > `連携` > `GitHub`で`GitHub連携を有効にする`を有効にし、 Client Id と Client Secret を記入する。

## Discord
Discordの連携の設定はかなり簡単。

### 1. Discordアカウントを作成
Discordアカウントを持っていない場合、作成する必要がある。

### 2. OAuth Appを作成
https://discordapp.com/developers/applications/ にアクセスし`Create an application`をクリック。

1. `Oauth2`タブを開く
2. `Add Redirect`をクリックし、出現したフォームに`https://(your-misskey-instance)/api/dc/cb`と記入する（(your-misskey-instance)は自分のインスタンスのドメインに置き換える）。

### 3. キーをデータベースに登録
`インスタンス` > `設定` > `連携` > `Discord`で`Discord連携を有効にする`を有効にし、 Client Id と Client Secret を記入する。
