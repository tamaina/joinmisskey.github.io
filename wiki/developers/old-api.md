---
title: 旧来のi（アクセストークン）取得方法
description: MiAuth導入以前のアクセストークン取得方法について説明する。
layout: wiki
rank: 4.1
prev: /wiki/developers/api
next: /wiki/developers/websocket
---
MiAuth導入（12.27.0）より前の、旧来のアクセストークン取得方法について説明する。  
当面の間こちらの旧来の方式も利用できるが、将来的には廃止されるかもしれない。  
12.27.0未満のバージョンのインスタンスではこの旧来の方式を使用する必要があるため、こちらに解説を残しておく。

#### 1. アプリケーションの作成
`app/create`エンドポイントに情報を送信し、`appSecret`を取得する。

```javascript
axios.post("https://misskey.io/api/app/create", {
    // アプリの名前
    name: "test",
    // アプリの説明
    description: "my test application",
    // アプリのパーミッション
    permission: ["write:notes"]
}).then(({data}) => console.log(data.secret))
```

この時、`callbackUrl`でお好きなURLを含めると、次のアクセス許可操作が終了したときに`token`をクエリ文字列に含めながらそこにコールバックするようになる。

#### 2. ユーザーに認証させる
`auth/session/generate`エンドポイントに`appSecret`をPOSTする。

```javascript
axios.post("https://misskey.io/api/auth/session/generate", {appSecret: "fAb12cD34Ef56gH78Ij16kL32Mn64oPf"})
  .then(({data}) => console.log(data))
```

`token`（ここでは仮に`798b9f6e-248d-43a7-a919-fabc664027f1`）と`url`を返してくるので、まずはこのurlにウェブブラウザでアクセスし「アクセスを許可」を選択。

#### 3. accessTokenを問い合わせる
2が終わったことが確認できたら、`auth/session/userkey`エンドポイントに`appSecret`と先ほどの`token`をPOSTする。

```javascript
axios.post("https://misskey.io/api/auth/session/userkey", {
  appSecret: "fAb12cD34Ef56gH78Ij16kL32Mn64oPf",
  token: "798b9f6e-248d-43a7-a919-fabc664027f1"
}).then(({data}) => console.log(data.accessToken))
```

ここで取得できる文字列は`accessToken`と呼ばれる。`accessToken`は一度限りしか取得できない。

#### 3. iを生成
`i`は、Node.jsであれば以下のようなコードで生成でき、設定画面で取得するものとは違って64桁の16進数である。

```javascript
const crypto = require("crypto")
const i = crypto.createHash("sha256")
    .update(accessToken + appSecret, "utf8")
    .digest("hex")
console.log(i)
```

#### 4. 実際にテストする
```javascript
axios.post("https://misskey.io/api/notes/create", {
  i: "/* ここにiを入力 */",
  text: "Hello Misskey API World with My Application!"
})
```
