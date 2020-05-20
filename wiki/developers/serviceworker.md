---
title: ServiceWorkerの設定をする
description: インスタンス側でServiceWorkerの設定をする必要がある。
layout: wiki
rank: 1.9
prev: /wiki/developers/installation
next: /wiki/developers/email
---
Misskeyには、ServiceWorkerを利用してユーザーにバックグラウンドで通知を送る機能が備わっている。

ServiceWorkerを有効するには、`インスタンス` > `設定` > `ServiceWorker`で設定を行う。

まずは、設定を有効にしよう。

サーバーで以下のコマンドを実行する。

```
npx web-push generate-vapid-keys
```

**Public Key**と**Private Key**が出力される。

これらをインスタンス設定画面に入力し、「保存」を選択する。

これでServiceWorkerの設定は完了だ。
