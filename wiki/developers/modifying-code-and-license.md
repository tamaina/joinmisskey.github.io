---
title: 改造とライセンス
description: Misskeyの改造とライセンスについて説明する。
layout: wiki
rank: 3.1
prev: /wiki/developers/moderation
---
Misskeyはソースコードが公開されているため改造を自由にできる。  
ただし、ソースコードを編集したMisskeyでインスタンスを運営する場合には、**Misskeyのライセンスである[GNU Affero General Public License v3.0 (AGPL v3)](https://github.com/syuilo/misskey/blob/develop/LICENSE)に基づき、改造後のソースコードを公開する義務がある**。

ソースコードを即時に公開する必要はないが、要求されたら公開に応じる必要がある。

念のため書いておくが、`default.yml`などの設定ファイルの作成・編集については、コードの改造にはあたらない。

<small>参考: <a href="https://mag.osdn.jp/07/09/02/130237">OSDN八田氏によるAGPL v3の日本語訳</a></small>

## ソースコードの公開・表示方法（推奨）
特に拘りがない場合、GitHubにてフォークリポジトリを公開することをお勧めする。  

1. [GitHubにサインアップ](https://github.com/)する。  
  （ここではアカウント名を`you`とする）
2. [syuilo/misskey](https://github.com/syuilo/misskey)にアクセスし、右上の`Fork`をクリック。  
  ページをリロードし、フォークが作成されたことを確認しよう。
3. [about-misskey.vue](https://github.com/syuilo/misskey/blob/develop/src/client/pages/about-misskey.vue)および`package.json`の`syuilo/misskey`の部分を`自分のユーザー名/misskey`に置き換える。
4. `package.json`の`version`をと変更し、Misskeyをビルドしてデプロイする。  
  バージョンは[セマンティックバージョニングのプレリリースバージョンの表し方](https://semver.org/lang/ja/#spec-item-9)で指定するとよい（例: `11.36.0-myedition.1`）。 
5. 作業環境に移動し、  
  `git remote add you https://github.com/you/misskey.git`  
  `git fetch you`  
  `git push you`
