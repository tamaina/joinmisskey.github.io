---
title: AWS版Misskeyインストール方法詳説
title-breadcrumb: AWS
description: Amazon Web Service (AWS)でMisskeyを動作させる方法の一例を紹介。
layout: wiki
rank: 3
next: /wiki/developers/email
---
## はじめに
この記事では、[リポジトリに同梱されている『Misskey構築の手引き』 (setup.md)](https://github.com/syuilo/misskey/blob/master/docs/setup.ja.md)を基に、AWSでMisskeyをインストールし公開する方法の一挙手一投足を解説する。

大まかな流れは上の**目次**をクリックし展開することで確認できる。

この記事では、具体性を重視し、特定の環境に特化した記述をしている。  
OSの違い、Misskey本体や依存するソフトウェアのバージョンアップで変わってしまった部分等あるかもしれないが、ご容赦願いたい。

わからない単語については、[『「分かりそう」で「分からない」でも「分かった」気になれるIT用語辞典』](https://wa3.i-3-i.info/)で調べて分かった気になってほしい。

なお、今回の記事にあたっては、AWSの無料利用枠でできる範囲で検証を行った。

## 構成と条件
- EC2、RDS、ElastiCache、S3およびCloudFrontを利用する。
- アベイラビリティゾーンは`ap-northeast-1a`とする。
- 独自のドメインを購入する。
  * ドメインは[Google Domains](https://domains.google/intl/ja_jp/)などで予め用意しておくこと。
  * ここではドメインを`example.tld`として解説を進めるので、自分が買ったドメインに適宜置き換えて読むこと。

## nanoの使い方
今回はテキストエディターにnanoを使う。次のように起動する。

```bash
nano /path/to/file
```

一般的な矢印ボタンや<kbd>Home</kbd>/<kbd>End</kbd>などを利用してカーソルを移動できる。

終了は<kbd>Ctrl+X</kbd>で、変更を保存するか聞かれた場合<kbd>Y</kbd>(Yes)を入力し<kbd>Enter</kbd>すると保存できる。

下部にコマンド一覧が表示されるので、`^`を<kbd>Ctrl</kbd>、`M-`を<kbd>Alt</kbd>と読み替えて参考にしよう。

## AWSにサインアップ
まずは[AWSのサイト](https://aws.amazon.com/jp/)にアクセスし、サインアップしよう。

サインアップが完了したら、[**ここを開いてサインインする**](https://ap-northeast-1.console.aws.amazon.com/console/)。

## セキュリティグループの作成
ローカルネットワークのみでアクセスできるようなセキュリティグループを作成する。

1. [セキュリティグループの設定を開く](https://console.aws.amazon.com/ec2/home#SecurityGroups)
2. [セキュリティグループの作成]を選択
3. 以下のように記入
  * [セキュリティグループ名]、[説明]ともに`local`
  * [ルールの追加]を選択し、
    * [タイプ]を`全てのトラフィック`に
    * [CIDR、IP]に`172.0.0.0/6`

## VPCをIPv6に対応させる
AWSは標準ではIPv6に対応しないので、IPv6を設定する。

### IPv6 CIDR ブロックを VPC およびサブネットと関連付ける
#### VPC
1. [VPC一覧](https://console.aws.amazon.com/vpc/home#vpcs)を開く。
3. VPCを選択し、[アクション] - [CIDR の編集]と選択。
4. [IPv6 CIDR の追加]を選択。IPv6 CIDRブロックが追加されたら[閉じる]を選択。

**ここでVPCのID（vpc-...）をメモしておくこと。**

#### サブネット
1. 画面左側のナビゲーションペインで[サブネット]を選択。
2. サブネットを選択し、[アクション] - [IPv6 CIDR の編集]と選択。
3. [IPv6 CIDR の追加]を選択。16進法2文字でサブネットのCIDRブロックを割り当て（記入例: 00, 01)。
4. [保存]を選択。VPC内の他のサブネットにも同様に繰り返す。

### Egress Only インターネットゲートウェイの作成
1. ナビゲーションペインで[Egress Only インターネットゲートウェイ]を選択。
2. [Egress Only インターネットゲートウェイの作成]を選択。
3. VPCを選択し[作成]を選択、さらに[閉じる]を選択。

### ルートテーブルを更新
- ナビゲーションペインで[ルートテーブル]を選択し、ルートテーブルを選択。
- [ルート]タブで[ルートの編集]を選択。
- [ルートの追加]を選択。
  * [送信先]に`::/0`を指定
  * [ターゲット]を選択し、[Egress Only Internet Gateway] - `eigw-（英数字）`と選択。
- [ルートの保存]を選択、さらに[閉じる]を選択。

<small>https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/vpc-migrate-ipv6.html#vpc-migrate-ipv6-cidr</small>

## RDSインスタンスの作成
[RDSコンソール（https://console.aws.amazon.com/rds/）](https://console.aws.amazon.com/rds/)を開き、[データベースの作成]を選択。  
以下の設定で進める。

| 説明 | 値 |
|:--|:--|
|エンジン|PostgreSQL *2|
|バージョン|11.5以上 *2|
|テンプレート|無料利用枠|
|DB インスタンス識別子|pg|
|マスターユーザー名|postgres|
|マスターパスワード<br>パスワードを確認|password *3|
|ストレージの自動スケーリングを有効にする|チェックを外す|
|接続の**追加の接続設定**|（開く）|
|VPC セキュリティグループ|localを選択 （あればdefaultを削除）|
|アベイラビリティーゾーン|ap-northeast-1a|
|**追加設定**|（開く）|
|最初のデータベース名|mk1|
|バックアップ保持期間|3日間|

*1: Aurora PostgreSQLでの動作は確認していないが、11.4以上であれば恐らく動くと思われる  
*2: 無料利用枠で利用したい場合、エンジンをPostgreSQLにすると無料利用枠を選択できる  
*3: 当然ながら自分で考えて設定すること

[データベースの作成]を選択。

`pg`を選択し、データベースを起動するまで待つ。

起動したら、エンドポイントをメモする。ここでは`pg.xxxxxxxx.ap-northeast-1.rds.amazonaws.com`として説明する。

## ElastiCacheインスタンスの作成
[ElastiCacheコンソール（https://console.aws.amazon.com/elasticache/）](https://console.aws.amazon.com/elasticache/)を開き、[作成]を選択。

以下のように値を設定する。

| 説明 | 値 |
|:--|:--|
|クラスターエンジン|Redis<br>クラスターモード無効|
|名前|redis|
|ポート|6379|
|ノードのタイプ|cache.t3.micro|
|レプリケーション数|0|

#### サブネットグループ
（新規作成）

| 説明 | 値 |
|:--|:--|
|名前|subnet|
|サブネット|全てにチェック|
|優先アベイラビリティーゾーン|ゾーンの選択 - ap-northeast-1a|

[作成]を選択。

`▶ redis`を選択し、`プライマリエンドポイント`を確認。ここでは`redis.xxxxxx.0001.apne0.cache.amazonaws.com:6379`であったものとして説明する。

#### セキュリティグループ
✏を選択し、`local`にする。

## S3バケットの準備
### IAMユーザーの作成
[IAM/ユーザーを追加](https://console.aws.amazon.com/iam/home#/users$new)を開く。  
以下のように設定する。

| 説明 | 値 |
|:--|:--|
|ユーザー名|mks3|
|アクセスの種類|プログラムによるアクセスにチェック|

[次のステップ]を選択。

[既存のポリシーを直接アタッチ]を選択し、`AmazonS3FullAccess`にチェック。  
[次のステップ]へ。さらに[次のステップ]を選択。そして[ユーザーの作成]を選択。

**アクセスキー ID**、および**シークレットアクセスキー**を表示し、メモしておく。

### バケットの作成
[S3コンソール](https://s3.console.aws.amazon.com/s3/home)を開き、[+バケットを作成する]を選択。

#### 名前とリージョン
以下のように設定する。

| 説明 | 値 |
|:--|:--|
|バケット名|example.tld|
|リージョン|アジアパシフィック（東京）|

[次へ]を選択。

#### オプションの設定
何もすることはないので[次へ]を選択。

#### アクセス許可の設定
何もすることはないので[次へ]を選択。

#### 確認
[バケットを作成]を選択。

### アクセスポイントの作成
example.tld を選択。[アクセスポイント]タブを開き、[+アクセスポイントを作成]を選択。  
以下のように設定する。

| 説明 | 値 |
|:--|:--|
|アクセスポイント名|s3ap|
|リージョン|アジアパシフィック（東京）|
|VPC ID|メモしておいたVPC IDを貼り付け|

[アクセスポイントを作成]を選択。

## CloudFrontディストリビューションの作成
1. [CloudFrontディストリビューションの作成ウィザードを開始](https://console.aws.amazon.com/cloudfront/home?region=ap-northeast-1#create-distribution)する。
2. Webの[Get Started]を選択
3. 次のように設定する

| 説明 | 値 |
|:--|:--|
|Origin Domain Name|example.tld.s3.amazonaws.com|
|Restrict Bucket Access|Yes|
|Origin Access Identity|Create a New Identity|
|Grant Read Permissions on Bucket|Yes, Update Bucket Policy|
|Viewer Protocol Policy|Redirect HTTP to HTTPS|
|Object Caching|Customize|
|Minimum TTL|31536000|
|Maximum TTL|315360000|
|Default TTL|315360000|
|Compress Objects Automatically|Yes|
|Price Class|Use U.S., Canada, Europe, Asia, Middle East and Africa|

ナビゲーションペインでDistributionsを選択し、作成されたディストリビューションの**Domain name**をメモしておく。ここでは`xxxxxxxxxx.cloudfront.net`であるとする。

## EC2インスタンスの準備
EC2インスタンスを作成しよう。

1. [インスタンスウィザードを開始](https://console.aws.amazon.com/ec2/v2/home#LaunchInstanceWizard)する。
2. 右上の青い[選択]ボタンを選択。
3. 無料枠ならデフォルトのt2.microを選択し、[次のステップ]を選択。
4. サブネットを`ap-northeast-1a`のに選択。
5. [起動]を選択。
6. [既存のキーペアの選択]のところを[新しいキーペアの選択]に変更し、キーペア名を入力。ここでは`key`とする。  
7. [キーペアのダウンロード]を選択。`key.pem`がダウンロードされるので確認する。
8. [インスタンスの作成]を選択。
9. `key.pem`を`%USERPROFILE%\.ssh`内に移動。
10. ブラウザに戻り、`次のインスタンスの作成が開始されました: `に続くリンクを選択。

### IPv6に対応させる
1. [アクション]を選択し、[ネットワーキング]-[IP アドレスの管理]を選択。  
2. ダイアログが出てきたら、**IPv6 アドレス**の[新しい IP の割り当て]を選択し、[更新する]を選択
3. [更新する]を選択し、さらに[キャンセル]を選択。

### ロードバランサーの作成
[ロードバランサーの作成ウィザード](https://console.aws.amazon.com/ec2/v2/home#V2CreateELBWizard)を開く。

#### 1: ロードバランサーの設定
以下のように設定する。

| 説明 | 値 |
|:--|:--|
|名前|misskey|
|IPアドレスタイプ|dualstack|
|ロードバランサーのプロトコル|HTTP, HTTPS|
|VPC|（プルダウンから選択）|
|アベイラビリティーゾーン|全てチェックをつける|

[次の手順]を選択

#### 2: セキュリティ設定の構成
1. [ACM　から新しい証明書をリクエスト]を選択
2. 新しいタブが開くので、`example.tld`（ドメイン）を入力、また[この証明書に別の名前を追加]を選択し`*.example.tld`を入力
3. **DNS の検証**を選択し[次へ]を選択
4. [確認]を選択
5. [確定とリクエスト]を選択
6. **▶ example.tld**を選択し、使っているDNSに表示された設定を追加する
7. [続行]を選択
8. 5分程度待つ
9. 状況が`発行済み`になったら、タブを閉じる
10. 証明書の名前に先ほど発行した証明書が設定されているのを確認し、[次の手順]を選択

#### 3: セキュリティグループの設定
**新しい**セキュリティグループを作成するを選択。

- セキュリティグループ名は`public`とする
- タイプを変更する
  * 1つ目はHTTP
  * 2つ目はHTTPS

[次の手順]を選択。

#### 4: ルーティングの設定
名前を`misskey`にし、[次の手順]を選択。

#### 5: ターゲットの登録
ポートを`3000`とし、**インスタンス**から作成したインスタンスを選択し[登録済みに追加]を選択。  
[次の手順]を選択。

#### 6: 確認
[作成]を選択。成功したら[閉じる]を選択。

#### DNSを設定
お使いのDNSで、`example.tld`に**CNAME**として作成したロードバランサーの**DNS 名**を指定する。

### SSHで接続する
ナビゲーションペインで[インスタンス]を選択し、作成したインスタンスの状態がrunningかつステータスチェックが「チェックに合格しました」となっていることを確認。なっていなければ待つ。

インスタンスのパブリックDNS（IPv4）をメモしよう。ここでは`ec2-13-xxx-xxx-xxx.ap-northeast-1.compute.amazonaws.com`とする。

sshでEC2インスタンスに接続する。

```bash
ssh ec2-user@ec2-13-xxx-xxx-xxx.ap-northeast-1.compute.amazonaws.com -i %USERPROFILE%\.ssh\key.pem
```

Misskeyはrootで実行しない方がよいため、専用のユーザーを作成する。

```bash
sudo adduser misskey
```

### Node.js
Node.jsは、サーバーサイドJavaScript環境であり、Misskeyの基本的な実行環境である。

```bash
curl -sL https://rpm.nodesource.com/setup_13.x | sudo bash -
sudo yum update
sudo yum install -y nodejs
```

Node.jsがインストールされたので、バージョンを確認する。

```bash
node -v
```

`v13.3.0`などと表示されればOK。

### Gitその他
Git（バージョン管理ソフト）などをインストールする。

```bash
sudo yum install -y git
sudo yum groupinstall "Development Tools"
```

### ffmpeg
シェルスクリプトを用意したので、それを実行する。  
この作業には**だいぶ時間がかかる**ので、この間に[ローカルでMisskeyのビルド](#Misskeyのビルド)をしておこう。

```bash
wget https://gist.githubusercontent.com/tamaina/05c9119260e55ceed36a87c6415935d3/raw/ecdb4862f4ad1426cf317baba508ce6cdf43e87f/installFFmpegIntoAmazonLinux.sh
sh installFFmpegIntoAmazonLinux.sh
```

## Misskeyのインストール
引き続きMisskeyのインストールを行う。

`misskey`ユーザーに変更。

```bash
sudo su - misskey
```

Gitでファイル類を展開。

```bash
git clone -b master git://github.com/syuilo/misskey.git
cd misskey
git checkout master
```

### npmパッケージのインストール
必要なnpmパッケージをインストール。

```bash
npx yarn install
```

### default.ymlを作成
設定ファイル`.config/default.yml`を作成。

```bash
nano .config/default.yml
```

次の内容を貼り付け、適宜置き換える。設定値の変更が必要な箇所は`●`で、これまでの流れの中で設定した値を用いる箇所は`〇`で示した。  
この設定ファイルはYAML形式で書かれており、行頭のスペースの数などを間違えるとMisskeyが動かないので、特に注意すること。

設定できる値と記述方法は[`.config/example.yml`](https://github.com/syuilo/misskey/blob/develop/.config/example.yml)に書かれている。

```yaml
# ● Misskeyを公開するURL
url: https://example.tld/

# 　 ポートを3000とする。
port: 3000

# ● RDSの設定。
db:
  # ●: RDSのエンドポイント
  host: pg.xxxxxxxx.ap-northeast-1.rds.amazonaws.com
  port: 5432
  db  : mk1      # 〇 RDSの最初のデータベース名
  user: postgres # 〇 RDSのマスターユーザー名
  pass: password # ● RDSのマスターパスワード

# ● ElastiCacheの設定。
redis:
  # ●: ElastiCacheのエンドポイント
  host: redis.xxxxxx.0001.apne0.cache.amazonaws.com
  port: 6379

# 　 IDタイプの設定。
id: 'aid'
```

指定できたら保存する。

### Misskeyのビルド
t2.microではMisskeyはビルドできないため、**ローカルで**ビルドしたものを転送しよう。  
Node.jsなので、Windowsでビルドしたものを適用できる。

1. サーバーと同じバージョンのNode.jsをインストール
2. Gitでclone（`git clone -b master git://github.com/syuilo/misskey.git`）、もしくはGitHubからMisskeyのソースをダウンロードする
3. サーバーと同様の`.config/default.yml`を作成
4. `npx yarn install`
5. `NODE_ENV=production npx yarn build`  
  * PowerShellでは変数指定がこの方法でできないので、以下のようにする:  
    `$env:NODE_ENV="production"`  
    `npx yarn build`
6. sftpでコピーする。

builtディレクトリを準備

```bash
# SSH
exit
mkdir built
```

ローカル環境からsftpでビルドしたファイルを転送

```bash
# ローカル
sftp -i %USERPROFILE%\.ssh\key.pem ec2-user@ec2-13-xxx-xxx-xxx.ap-northeast-1.compute.amazonaws.com:built
sftp> put -rf path/to/built
sftp> bye
```

サーバー内でコピー（一瞬で終わるが問題ない）

```bash
# SSH
sudo cp -rf built /home/misskey/misskey/
sudo chown -R misskey /home/misskey/misskey/built
```

### データベースの初期化
```bash
sudo su - misskey
cd misskey
npm run init
```

### Misskeyを起動する
```bash
NODE_ENV=production npm start
```

**Now listening on port 3000 on http://example.tld** と表示されたら、設定したURLにアクセスする。

Misskeyのウェルカムページが表示されるはずだ。

アカウントの作成、ノートの作成やファイルのアップロードといった一通りの操作が正しく行えるか確認しよう。

### S3を設定する
`インスタンス` > `設定` > `オブジェクトストレージ`で、`オブジェクトストレージを使用`を有効にする。

以下の設定を行う。

| 説明 | 値 |
|:--|:--|
|URL|xxxxxxxxxx.cloudfront.net|
|バケット名|example.tld|
|プレフィックス|m|
|エンドポイント|s3.ap-northeast-1.amazonaws.com|
|リージョン|ap-northeast-1|
|ポート|（空白）|
|アクセスキー|（ユーザー作成時にメモしたキー）|
|シークレットキー|（ユーザー作成時にメモしたキー）|

無料利用枠で収めようとするなら、リモートのファイルをキャッシュするトグルはオフにしておこう。

[保存]を選択し、設定を保存する。

### Misskeyのデーモンを作成
いったん<kbd>Ctrl+C</kbd>でプロセスをキルし、Misskeyをデーモンで起動する設定をしよう。

```bash
exit
sudo nano /etc/systemd/system/misskey.service
```

次の内容を貼り付け、保存する。

```ini
[Unit]
Description=Misskey daemon

[Service]
Type=simple
User=misskey
ExecStart=/usr/bin/npm start
WorkingDirectory=/home/misskey/misskey
Environment="NODE_ENV=production"
TimeoutSec=60
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=misskey
Restart=always

[Install]
WantedBy=multi-user.target
```

systemdを設定し、misskeyデーモンを開始。

```bash
sudo systemctl daemon-reload
sudo systemctl enable misskey
sudo systemctl start misskey
```

systemctlでデーモンの状態を確認。

```bash
sudo systemctl status misskey
```

activeならOK。

**これでMisskeyのインストールはおおよそ完了だ。**

## インスタンスの種々の設定
その他様々なインスタンスの設定があるが、インスタンス設定（`/instance/settings`）にて設定できる内容とその方法を確認できる。

また、このサイトにもいくつかの記事があるので参考にしてほしい。  
[→ **開発者・運営者向け情報#その他の個別記事**](./#その他の個別記事)
