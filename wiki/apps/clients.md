---
title: クライアント
description: 投稿したりタイムラインを表示したりできるアプリ・ソフトウェア一覧。
layout: wiki
rank: 1
---
Misskeyの機能をひととおり利用できる、いわゆる「クライアント」と呼ばれるアプリ・ソフトウェアの一覧。  

なお、Misskeyでは[公式Webクライアントをインストールする](#Misskey%20Web%E3%82%92%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%99%E3%82%8B)こともできる。

## iOS
### MissCat
[wada](https://misskey.io/@wada)氏が開発している無料のiPhone・iPad向けクライアント。2020年4月3日にβ版がリリースされた[*](https://misskey.io/notes/85nl8qgjsf)。

**[MissCatをApp Storeでインストール](https://apps.apple.com/app/id1505059993)**

**[MissCat公式サイト](https://yuiga.dev/misscat/)**  
[YuigaWada/MissCat on GitHub](https://github.com/YuigaWada/MissCat)

## Android
### MilkTea
[パン太](https://misskey.io/@Panta)氏が開発している無料のAndroid向けMisskeyクライアント。2020年3月27日にα版がリリースされた[*](https://github.com/Kinoshita0623/MisskeyAndroidClient/releases/tag/v1.0.0-alpha1)。

現在はβ版でストアにはリリースされていないため、インストール方法としてはGitHubからapkをダウンロードする形となる。

[MilkTeaをダウンロード](https://github.com/Kinoshita0623/MisskeyAndroidClient/releases)  
[Kinoshita0623/MisskeyAndroidClient on GitHub](https://github.com/Kinoshita0623/MisskeyAndroidClient)

### Subway Tooter
[tateisu](https://mastodon.juggler.jp/@tateisu)氏が開発している無料のAndroid向けMastodonクライアント。2.7.0よりMisskeyに対応。

**[Subway TooterをPlayストアでインストール](https://play.google.com/store/apps/details?id=jp.juggler.subwaytooter&hl=ja)**

[#SubwayTooter](https://mastodon.juggler.jp/tags/subwaytooter)  
[Subway Tooter Blog](http://subwaytooter.hatenadiary.jp/)  
[Subway Tooter (マストドン日本語Wiki)](https://ja.mstdn.wiki/Subway_Tooter)  
[Subway Tooter @SubwayTooter@mastodon.juggler.jp](https://mastodon.juggler.jp/@SubwayTooter)  
[tateisu/SubwayTooter on GitHub](https://github.com/tateisu/SubwayTooter)  
[tateisu @tateisu@mastodon.juggler.jp](https://mastodon.juggler.jp/@tateisu)

## デスクトップ（マルチOS）
### Whalebird
- OS: Windows, macOS, Linux  
- Node.js, Electron

[h3poteto](https://pleroma.io/users/h3poteto)氏による無料のMastodon/Pleroma/Misskeyクライアント。

**[Whalebird - whalebird.social](https://whalebird.social/ja)**

[h3poteto/whalebird-desktop on GitHub](https://github.com/h3poteto/whalebird-desktop)

### TheDesk
- OS: Windows, macOS, Linux  
- Node.js, Electron

[Cutls P](https://kirishima.cloud/@Cutls)氏による無料のマルチカラム対応Mastodon/Misskeyクライアント。  
GPL 3.0([GitHub:cutls/TheDesk](https://github.com/cutls/TheDesk))

**[TheDesk - thedesk.top](https://thedesk.top/)**  
**[TheDeskをMicrosoft Storeでインストール](https://www.microsoft.com/store/productId/9P2NDNZ0GWZF)**

## Misskey Webをインストールする
Misskey Webは、モバイルOSやブラウザの機能によってストアアプリのようにホーム画面に登録することができる。

### Chrome
Google Chromeを使うと、Android（かデスクトップOS）でネイティブアプリケーションのように端末へMisskeyをインストールできる。  
MisskeyをChromeからインストールすると、次のようになる。

- ホーム画面（デスクトップ）にMisskeyアイコンが表示され、直接起動できるようになる
  * ここから起動した場合、アドレスバーが表示されない。
- Androidの共有メニューにMisskeyが表示されるようになる

#### 追加方法
1. ChromeでMisskeyを開く
2. 右上の「︙」をタップ（クリック）しメニューを表示
3. 「ホーム画面に追加（Misskeyをインストール）」をタップ
4. ポップアップが出てくるので、「追加（インストール）」をタップ

以上の手順を踏むと、Misskeyがホーム画面（デスクトップ）に追加される。  
追加されたアイコンを選択してMisskeyを起動した場合、ブラウザのアドレスバーが表示されない。

ChromeでMisskeyを直接何度か開いていると、「ホーム画面に Misskey を追加」というバナーが現れることがあり、それをタップすることでも同様のことが行える。

### iOS Safari
1. SafariでMisskeyを開く
2. 下部中央の共有アイコンをタップ
3. 下段の「[+]ホームに追加」をタップ

以上の手順を踏むと、Misskeyがホーム画面に追加される。 
