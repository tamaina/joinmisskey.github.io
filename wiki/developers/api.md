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

### アプリケーションとしてiを取得する
上の方法で取得したiをアプリケーションで使用するのは大変危険なため、アプリケーションからAPIを利用する際には、アプリケーションとユーザーが結び付けられた専用のAPIキーを発行する。

**v12.27.0よりAPIの利用方法が変更された。**  
変更版の記事が完成するまで待ってほしい。
<!--
#### 1. アプリケーションの作成
まず、各インスタンスでアプリケーションを登録し、シークレットキー`appSecret`を取得する。

アプリケーションの登録時にはパーミッションの設定が必要なので、まずは各インスタンスの`/api-doc`（例: https://misskey.io/api-doc ）で必要なパーミッションを確認しよう。

`appSecret`は、次の2つの方法で取得できる。  
ここでは仮に`fAb12cD34Ef56gH78Ij16kL32Mn64oPf`というappSecretを取得したものとして進める。

##### 開発者センターから作成
各インスタンスのデベロッパーセンター`/dev`（例: https://misskey.io/dev ）でアプリケーションを作成し`appSecret`を取得する。

##### APIで取得
`app/create`エンドポイントを利用することでもアプリケーションを作成できる。

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
-->
## 様々なエンドポイントを利用する
各インスタンスの`/api-doc`（例: https://misskey.io/api-doc ）にアクセスすることで、そのインスタンスで利用できるAPIの一覧と必要なパーミッションを見ることができる。
