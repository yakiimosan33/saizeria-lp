# サイゼリヤマーケティングLP

「サイゼで学ぶマーケティング」記事を紹介するランディングページです。

## 📁 ファイル構成

```
サイゼLP/
├── index.html          # メインHTMLファイル
├── styles.css          # CSSスタイルシート
├── script.js           # JavaScript（アニメーション）
├── sample/             # 参考デザインサンプル
└── README.md           # このファイル
```

## 🚀 使い方

1. **ローカル環境での確認**
   ```bash
   # ブラウザでindex.htmlを開く
   open index.html
   ```

2. **ライブサーバーでの確認（推奨）**
   ```bash
   # Live Server（VSCode拡張）またはPythonサーバー
   python -m http.server 8000
   # http://localhost:8000 でアクセス
   ```

## 🎨 デザインの特徴

### カラーパレット
- **プライマリ緑**: `#2D5017` (サイゼリヤの企業カラー)
- **プライマリ赤**: `#DC143C` (アクセントカラー)
- **クリーム**: `#F4E7B7` (温かみのあるアクセント)
- **ダークテキスト**: `#333333`

### フォント
- **メイン**: Noto Sans JP (読みやすさ重視)
- **アクセント**: M PLUS Rounded 1c (親しみやすさ)

### アニメーション
- **GSAP**: 滑らかなスクロールアニメーション
- **ScrollTrigger**: スクロール連動エフェクト
- **ホバーエフェクト**: ボタンとカードの動き

## 📱 レスポンシブ対応

- **デスクトップ**: 1200px以上
- **タブレット**: 768px〜1199px
- **モバイル**: 767px以下
- **モバイル固定CTA**: スマホ用の固定ボタン

## ⚡ パフォーマンス最適化

- **遅延読み込み**: 画像の最適化読み込み
- **スクロール最適化**: requestAnimationFrame使用
- **アクセシビリティ**: キーボードナビゲーション対応

## 🔧 カスタマイズ方法

### 1. 記事URLの変更
```javascript
// script.js の openArticle() 関数内
window.open('実際の記事URL', '_blank');
```

### 2. カラーの変更
```css
/* styles.css の :root 内 */
--primary-green: #新しい色;
--primary-red: #新しい色;
```

### 3. コンテンツの変更
```html
<!-- index.html の各セクション内容を編集 -->
```

## 📋 セクション構成

1. **ヒーロー**: インパクトのあるメインビジュアル
2. **問題提起**: ターゲットの悩みを明確化
3. **解決策**: サイゼの公式による解決提示
4. **機能紹介**: 記事で学べる内容
5. **著者紹介**: 星乃チェスコの紹介
6. **特典**: GPTsツールの紹介
7. **最終CTA**: 記事への最終誘導

## 🎯 CTAボタン配置

- **ヒーロー**: メインCTA
- **問題提起後**: 解決策への誘導
- **解決策後**: 詳細学習への誘導
- **特典後**: 特典付き読了への誘導
- **最終**: 決定的なCTA
- **モバイル固定**: スマホ用固定ボタン

## 🔗 依存関係

- **GSAP**: 3.12.2（CDN経由）
- **ScrollTrigger**: 3.12.2（CDN経由）
- **Google Fonts**: Noto Sans JP, M PLUS Rounded 1c

## 📞 サポート

実装に関する質問やカスタマイズの相談は、開発者までお気軽にお問い合わせください。

---

**© 2025 星乃チェスコ. All rights reserved.**