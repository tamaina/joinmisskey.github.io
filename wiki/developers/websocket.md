---
title: ストリーミングAPIの利用方法
description: MisskeyのストリーミングAPIの利用方法について簡単に解説する。
layout: wiki
rank: 5
prev: /wiki/developers/api
---
MisskeyのWebSocket通信によるストリーミングAPIでは、リアルタイムなイベントの受信や通常のAPI操作が行える。

WebSocket通信のテストには、Google Chrome拡張機能の[Browser WebSocket Client](https://chrome.google.com/webstore/detail/browser-websocket-client/mdmlhchldhfnfnkfmljgeinlffmdgkjo)が便利である。

<small>https://misskey.io/docs/stream</small>

## ストリームに接続する
WebSocket通信のエンドポイントは、misskey.ioなら次のとおりである。

`i`は自分のものに置き換えること。[`i`の取得方法についてはこちらを参照](api)。

```pure
wss://misskey.io/streaming?i=1248aBCDeFGH1632
```

認証情報が必要ない操作のみ行う場合は、認証情報は不要だ。

```pure
wss://misskey.io/streaming
```

## APIリクエスト
まずは、ストリーミングAPIでノートの投稿をしてみよう。

```json
{
    "type": "api",
    "body": {
        "id": "hoge",
        "endpoint": "notes/create",
        "data": {
            "text": "yee haw!"
        }
    }
}
```

- `type`は`"api"`とする。
- `body.id`は、応答を区別できるようにするためのものだ。適当な文字列で構わない。
- `body.endpoint`でアクセスしたいエンドポイントを指定する。
- `data`に送信するデータを指定する。

上のJSONを送信し、投稿に成功すると、サーバーは以下のように返答してくる。

```json
{
  "type": "api:hoge",
  "body": {
    "res": {
      ... // 作成されたノートの情報
    }
  }
}
```

- `type`は`api:(送信時に指定したid)`となる。
- `body.res`に返り値が含まれる。

## チャンネル
チャンネルに接続することで、通知やタイムラインの更新を受け取ることができる。

### チャンネルに接続する
グローバルTLチャンネルに接続してみよう。

```json
{
  "type": "connect",
  "body": {
    "channel": "globalTimeline",
    "id": "global"
  }
}
```

- `type`は`"connect"`とする。
- `body.channel`に接続したいチャンネルを指定する。  
  チャンネルは以下の5つを指定できる。
  * `main`（自分の通知）
  * `homeTimeline`（ホームTL）
  * `localTimeline`（ローカルTL）
  * `hybridTimeline`（ソーシャルTL）  
    ハイブリッドTLとはソーシャルTLの旧称である。
  * `globalTimeline`（グローバルTL）
- `body.id`にはAPIリクエストと同じように適当な文字列を指定する。

### イベントの受信
チャンネルに接続すると、イベントを受信するようになる。  

````json
{
  "type": "channel",
  "body": {
    "id": "global",
    "type": "note",
    "body": {
      ... // グローバルTLに流れてきたノートの情報
    }
  }
}
````

- `type`は`"channnel"`である。
- `body.id`は接続時に指定したidである。
- `body.type`はイベントの種類で、タイムラインチャンネルならば`note`である。
  mainチャンネルでは、以下のタイプが流れてくる。
  - `renote`（リノート）
  - `mention`（メンション）
  - `readAllNotifications`（通知が全て既読になったことを示す）
  - `meUpdated`（自分の情報が更新された）
  - `follow`（フォローした）
  - `unfollow`（フォロー解除された）
  - `followed`（フォローされた）
  - `messagingMessage`（チャットにメッセージが来た）
- `body.body`が内容である。上の例の場合はノートの内容である。

### チャンネルから切断する
```json
{
  "type": "disconnect",
  "body": {
    "id": "foobar"
  }
}
```

- `type`は`disconnect`とする。
- `body.id`は接続時に指定したidとする。

## 投稿のキャプチャ
投稿のリアクションや投票の状況、そして投稿が削除されたことをリアルタイムに取得できるよう、Misskeyでは投稿のキャプチャと呼ばれる仕組みを提供している。

### キャプチャする
```json
{
    "type": "subNote",
    "body": {
        "id": "800......."
    }
}
```

- `type`は`"subNote"`とする。
- `body.id`はキャプチャしたい投稿のidとする。

### イベントの受信
いづれのイベントも、

- `type`は`"noteUpdated"`である。
- `body.id`はイベントが発生した投稿のidである。
- `body.type`が発生したイベントのタイプである。

#### `reacted`（リアクションされた）
```json
{
    "type": "noteUpdated",
    "body": {
        "id": "800.......",
        "type": "reacted",
        "body": {
            "reaction": "like",
            "userId": "801......."
        }
    }
}
```

- `body.body.reaction`はリアクションの種類である。
- `body.body.userId`はリアクションを付けたユーザーのidである。

#### `unreacted`（リアクションが外された）
内容としては`reacted`とほぼ同じであるので割愛。

#### `deleted`（削除された）
```json
{
    "type": "noteUpdated",
    "body": {
        "id": "800.......",
        "type": "deleted",
        "body": {
            "deletedAt": "2018-10-22T02:17:09.703Z"
        }
    }
}
```

- `body.body.deletedAt`として削除された日時が含まれる。

#### `pollVoted`（投票に票が入った）
```json
{
    "type": "noteUpdated",
    "body": {
        "id": "800.......",
        "type": "deleted",
        "body": {
            "choice": 2,
            "userId": "801......."
        }
    }
}
```

- `body.body.choice`は票が追加された選択肢の番号である。
- `body.body.userId`は票を追加したユーザーのidである。

### キャプチャを解除する
```json
{
    "type": "unsubNote",
    "body": {
        "id": "800......."
    }
}
```

- `type`は`"unsubNote"`とする。
- `body.id`はキャプチャを解除したい投稿のidとする。
