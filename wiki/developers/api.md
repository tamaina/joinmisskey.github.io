---
title: APIの利用方法
description: MisskeyのAPIの利用方法について簡単に解説する。
layout: wiki
rank: 4
next: /wiki/developers/websocket
---
ここでは、Node.js上で[HTTPクライアント「axios」](https://github.com/axios/axios)を使用し、APIを操作してみる。

ここで提示するコードは[RunKit](https://npm.runkit.com/axios)で実際に実行できる。

## iを取得する
MisskeyのAPIでは、APIキーとも呼ばれるキーを`i`として本文に含めることでAPIを利用できる。  
様々な場面で`i`という名前で扱われるため、ここではこのAPIキーを単に`i`と呼ぶことにする。

### 自分のアカウントのiを取得する
自分のアカウントのiはアカウント設定（`/my/settings`）のAPI欄のトークンに表示されている。

ここで取得できるiは特別なiで、アカウントの全ての情報を操作できるため、インターネット上に公開したり第三者に教えたりしてはいけない。

まずはこのiを使って実際にAPIから投稿してみよう。  
次のコードを、`1248aBCDeFGH1632`を自分の`i`に書き換えて実行してみよう。自分が登録しているインスタンスがmisskey.ioでない場合は自分のインスタンスのURLに置き換えて実行しよう。

```javascript
axios.post("https://misskey.io/api/notes/create", {i: "1248aBCDeFGH1632", text: "Hello Misskey API World!"})
  .then(({data}) => console.log(data))
```

自分のアカウントから「Hello Misskey API World!」という文章が投稿されたはずだ。

### MiAuthでiを取得する
**上の方法で取得したiはアカウントの全ての情報を操作できるため、アプリケーションで使用するのは大変危険である。**  
WebViewのストレージからiを取得する等の実装は、絶対にしないこと。

アプリケーションからAPIを利用する際には、アプリケーションとユーザーが結び付けられた専用のアクセストークンを発行する。

12.27.0以降で利用できる方式はMiAuthと呼ばれ、今後はこの方式を使うことが推奨される。  
MiAuthに対応しているかどうかは`api/meta`の`features.miauth`が存在するかどうかで判定できる。  
[12.27.0未満のバージョンのアクセストークン取得方法はこちら](old-api)

**なお、OAuthでの認証はMisskeyに実装されていない。**

#### 1: セッションIDの生成
UUIDを生成する。
以後これをセッションIDと呼ぶ。

このセッションIDは毎回生成し、使いまわさないように。

```javascript
const { v4 } = require("uuid")

console.log(v4())

// ここでは 19bbf45d-5ae7-4c87-b33e-2933b3eec683 が生成されたものとして進める。
// 実際のインスタンスで試すときは絶対に他のuuidを使うこと。  
```
リンク: [UUID生成ツール](https://www.wellhat.co.jp/tools/uuid.html)

#### 2: ユーザーを`/miauth/:sessionId`にアクセスさせる

`/miauth/19bbf45d-5ae7-4c87-b33e-2933b3eec683`（`19bbf...`は生成したセッションIDに置き換える）をユーザーにブラウザでアクセスさせる。

表示する際、URLにクエリパラメータとしていくつかのオプションを設定できる:

- `name`: アプリケーション名
	* 例: `MissDeck`
- `icon`: アプリケーションのアイコン画像URL
	* 例: `https://missdeck.example.com/icon.png`
- `callback`: 認証が終わった後にリダイレクトするURL
	* 例: `https://missdeck.example.com/callback`
	* `https://missdeck.example.com/callback?session=19bbf45d-5ae7-4c87-b33e-2933b3eec683`というように、クエリパラメータで`session`にセッションIDが設定されてリダイレクトされる。
- `permission` ... アプリケーションが要求する権限
	* 例: `write:notes,write:following,read:drive`
	* 要求する権限を`,`で区切って列挙する。
	* どのような権限があるかは各インスタンスのAPIリファレンス(/api-doc)で確認できる。

例:  
インスタンス`misskey.example.com`で認証させるとき、以下のURLにユーザーを誘導すればよい。

```
https://misskey.example.com/miauth/19bbf45d-5ae7-4c87-b33e-2933b3eec683?name=MissDeck&icon=https%3A%2F%2Fmissdeck.example.com%2Ficon.png&callback=https%3A%2F%2Fmissdeck.example.com%2Fcallback&permission=write%3Anotes,write%3Afollowing,read%3Adrive
```

#### 3: アクセストークンを取得
ユーザーが連携を許可した後、`/miauth/19bbf45d-5ae7-4c87-b33e-2933b3eec683/check`（`19bbf...`は自分のセッションIDに置き換える）に**POST**すると、レスポンスとしてアクセストークンを含むJSONが返る。

レスポンスに含まれるプロパティ:
- `token`: i（アクセストークン）
- `user`: ユーザーの情報

```javascript
axios.post("https://misskey.example.com/miauth/19bbf45d-5ae7-4c87-b33e-2933b3eec683/check")
  .then(({token}) => console.log(token))
```

## 様々なエンドポイントを利用する
各インスタンスの`/api-doc`（例: https://misskey.io/api-doc ）にアクセスすることで、そのインスタンスで利用できるAPIの一覧と必要なパーミッションを見ることができる。

## ラッパーライブラリを利用する
有志の方々がAPIをより簡単に利用できるようにするラッパーライブラリを各言語・実行環境向けに開発している。  
**[ライブラリ](../apps/libraries)**
