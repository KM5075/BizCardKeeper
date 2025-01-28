# BizCardKeeper

名刺の管理を行う。

## Feature

- [x] React+TypeScript の開発環境を Vite で作成
- [ ] Azure App Service にデプロイする
  - [ ] API から文字列を取得できることを確認
  - [ ] API 経由で DB アクセスができることを確認
- [ ] Jest と react-testing-library を導入する
- [ ] MSTest を導入する
  - [ ] TempAPI のテスト
  - [ ] テスト DB の構築
- [ ] SQL Server 環境を用意する
  - [ ] ローカル環境
  - [ ] Azure SQL database 環境
  - [ ] ローカルテスト用
- [ ] Github Actions(Push)で CI/CD できる
  - [x] 自動でデプロイできる
  - [ ] デプロイ時に Azure SQL database に自動でマイグレーションが適用される
  - [ ] 自動でテストが実行される
  - [ ] テスト用 DB がパイプライン上で構築されて実行される
- [ ] ChakuraUI を導入する
- [ ] users テーブルを作成する

table: users

| Name        | Type    | option   |
| ----------- | ------- | -------- |
| user_id     | varchar | non-null |
| name        | varchar | non-null |
| description | text    | non-null |
| github_id   | varchar | null     |
| qiita_id    | varchar | null     |
| x_id        | varchar | null     |

- [ ] テストデータを 1 件用意する

| Name        | Value                           |
| ----------- | ------------------------------- |
| user_id     | sample_id                       |
| name        | テスト太郎                      |
| description | \<h1>テスト太郎の自己紹介\</h1> |
| github_id   | あなたの github の ID           |
| qiita_id    | あなたの Qiita の ID            |
| x_id        | あなたの X の ID                |

- [ ] user_skill テーブルを作成する
      ユーザー ID とスキル ID を結ぶ中間テーブル
      table: user_skill

| Name     | Type    | Option   |
| -------- | ------- | -------- |
| id       | int8    |          |
| user_id  | varchar | non null |
| skill_id | int8    | non null |

- [ ] テストデータを 1 件追加する

| Name     | Type      | Option |
| -------- | --------- | ------ |
| user_id  | sample-id |
| skill_id | 1         |

- [ ] skills テーブルを作成する
      table: skills
      プログラミングの技術を保存しておくテーブル

| Name | Type    | Option   |
| ---- | ------- | -------- |
| id   | int8    |          |
| name | varchar | non null |

- [ ] テストデータを追加する
      Name を React,TypeScript,Github で 3 つ作る

- [ ] Router を設定する
      localhost:5132/cards/:id で id に入力した文字列を画面に表示できる
- [ ] Supabase のセットアップ
- [ ] 登録した情報を表示する(/cards/sample-id) でアクセスしたらその ID に紐づくユーザーデータを表示する

  - [ ] ユーザーデータ取得中はローディング画面を出す
  - [ ] ユーザー情報を取得する
  - [ ] ユーザー ID から user_skill テーブルの user_id と一致するレコードをみつけてそのレコードの skill_id で skills テーブルを検索する
  - [ ] ユーザーとスキルをあわせて User として表示

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/810513/cfa45e42-3565-d96b-4a7c-420e788c989c.png)

- [ ] Github, Qiita, X はクリックすると飛べるようにする
- [ ] ChakuraUI でスタイルを整える
- [ ] 紹介文は HTML で表示する

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/810513/9b0c2541-2912-1173-ba4b-465054f378bd.png)

- [ ] 新規登録ページ
  - [ ] router に登録のパス/cards/register を登録してページが表示できるようにする
  - [ ] タイトルをつける
  - [ ] レイアウトを当てながら ID、名前、自己紹介、好きな技術、GithubId、QiitaId, TwitterId の入力欄を作る
  - [ ] 登録ボタンがある
  - [ ] 必須項目にバリデーションエラーを設定する
  - [ ] 項目を登録することができる
  - [ ] 登録に成功したら localhost:5173/にページ遷移する

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/810513/d7fc362c-3d85-33a7-f51a-3881fa76b584.png)

- [ ] ユーザーは名刺をみることができる
  - [ ] タイトルがある
  - [ ] ID の入力フォームがある
  - [ ] ボタンをクリックすると/cards/入力した ID ページに遷移する
  - [ ] ID がないときにバリデーションエラーが出る(項目が少ないので hook-form を使わなくても良い)
  - [ ] /cards/id のページに戻るボタンを追加する
  - [ ] 戻るをクリックするとホームにページ遷移する

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/810513/70221721-36a7-b4cd-4c52-ba4366ce09bf.png)

- [ ] 自動テストを実装する
  - [ ] フロント側
    - [ ] 名刺カードのテストを書く
      - [ ] 名前が表示されている
      - [ ] 自己紹介が表示されている
      - [ ] 技術が表示されている
      - [ ] Github アイコンが表示されている
      - [ ] Qiita のアイコンが表示されている
      - [ ] Twitter のアイコンが表示されている
      - [ ] 戻るボタンをクリックすると/に遷移する
      - [ ] react-router のモックをすると検証できる
    - [ ] 名刺登録ページのテストを書く
      - [ ] タイトルが表示されている
      - [ ] 全項目入力して登録ボタンを押すと/に遷移する
      - [ ] ID がないときにエラーメッセージがでる
      - [ ] 名前がないときにエラーメッセージがでる
      - [ ] 紹介分がないときにエラーメッセージがでる
      - [ ] オプションを入力しなくても登録ができる
    - [ ] トップページのテストを書く
      - [ ] タイトルが表示されている
      - [ ] ID を入力してボタンを押すと/cards/:id に遷移する
      - [ ] ID を入力しないでボタンを押すとエラーメッセージが表示される
      - [ ] 新規登録はこちらを押すと/cards/register に遷移する
  - [ ] バックエンド側
    - [ ] API テスト
  - [ ] E2E テスト(Playright)を書く
