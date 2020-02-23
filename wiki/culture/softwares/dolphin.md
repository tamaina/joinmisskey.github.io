---
title: Dolphin
description: syuiloによるMisskeyの派生ソフトウェア
layout: wiki
---
**Dolphin**は、2019年10月から[syuilo](../users/syuilo)により開発されているオープンソースの[分散マイクロブログソフトウェア](../words/decentralized-social-networking-service#%E5%88%86%E6%95%A3%E3%83%9E%E3%82%A4%E3%82%AF%E3%83%AD%E3%83%96%E3%83%AD%E3%82%B0%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2)である。  
1人もしくは少人数インスタンス用途向けであり、[Misskey](misskey)の派生ソフトウェアである。

![スクショ](files/images/imports/2019/11/dolphin-ss.jpg)

**[syuilo/dolphin on GitHub](https://github.com/syuilo/dolphin)**

## 概要
1人もしくは数人で利用するために作られており、Misskeyからは多くの機能が削られている。

リアクション等の機能はMisskeyと変わらない。

他のユーザーが居ることが前提のローカル・ソーシャル・グローバル各TLはなく、タイムラインは1つだけだ。また、グループ、ゲーム、ページそしてグループもない。

adminやモデレーターといった概念はなく、すべてのユーザーがインスタンスの設定を操作できる。

## 機能の比較
|                 | Misskey | Dolphin |
|----------------:|:-------:|:-------:|
| リアクション    | ✔️      | ✔️      |
| 引用RN          | ✔️      | ✔️      |
| MFM             | ✔️      | ❌      |
| お気に入り      | ✔️      | ✔️      |
| LTL             | ✔️      | ❌      |
| STL             | ✔️      | ❌      |
| GTL             | ✔️      | ❌      |
| チャット          | ✔️      | ❌      |
| ゲーム          | ✔️      | ❌      |
| ページ          | ✔️      | ❌      |
| リスト          | ✔️      | ✔️      |
| グループ        | ✔️      | ❌      |

## インスタンスの構築方法
インスタンスの構築方法はMisskeyとほぼ同じであるが、特にビルドに要する要求スペックはMisskeyより低くなっている。

ホスティングサービスを展開し易いように**オブジェクトストレージ等の設定を[`default.yml`](https://github.com/syuilo/dolphin/blob/develop/.config/example.yml)でするように**なっている点には注意されたい。

基本的な構築方法については[DolphinリポジトリのREADME.md#install](https://github.com/syuilo/dolphin#-install)を、また当Wikiの[Misskeyの構築方法詳説](../../developers/installation)も合わせて参照されたい。

![SSH](files/images/imports/2019/11/dolphin-bash.png)
