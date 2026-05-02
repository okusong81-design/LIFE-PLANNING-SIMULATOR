# 将来資産シミュレーター

Reactで作成した、スマホ対応の将来資産シミュレーションWebアプリです。

## 構成

- Nodeサーバー不要の静的サイトです。
- `index.html` を入口として、Reactはブラウザ上でES Modulesとして動作します。
- React / React DOMはimport mapでCDNから読み込みます。
- `npm run build` で `dist/` に公開用ファイルを出力します。
- Vercelでは `dist/` をそのまま静的配信します。

## 主な機能

- 現在年齢、想定寿命、年収、支出、資産、退職金、年金、利回り、インフレ率を入力
- 金融資産、自宅・車、年収詳細、イベント等の詳細入力
- 「将来予測」ボタンで資産推移と年齢別キャッシュフローを更新
- 資産推移グラフ、年齢別キャッシュフロー表、指定年齢時点の資産内訳を表示
- シナリオをブラウザのlocalStorageに保存
- シナリオをJSONファイルとして端末に保存
- 使い方、免責事項、プライバシーポリシーページを搭載

## ビルド

```powershell
npm run build
```

`dist/` に以下が出力されます。

- `dist/index.html`
- `dist/src/App.js`
- `dist/src/styles.css`
- `dist/standalone.html`

## Vercelデプロイ手順

1. このプロジェクトをGitHubリポジトリに保存します。
2. Vercelにログインします。
3. `Add New...` から `Project` を選択します。
4. GitHubリポジトリをImportします。
5. Build Commandは `npm run build` を指定します。
6. Output Directoryは `dist` を指定します。
7. `Deploy` を押します。

`vercel.json` にも以下を設定済みです。

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

## 保存データについて

シナリオ一覧はブラウザのlocalStorageに保存されます。localStorageは同じブラウザ・同じURLの中だけで利用される保存領域であり、別端末や別ブラウザには自動共有されません。

保存ボタンで出力するJSONファイルは、利用者が選択した端末上の場所に保存されます。

## 注意事項

本アプリの試算結果は参考値です。実際の税金、社会保険、手数料、制度変更、市場変動、個別事情を完全に反映するものではありません。重要な判断を行う場合は、専門家にご相談ください。
