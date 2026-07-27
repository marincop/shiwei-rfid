# 世瑋RFID 系統整合電腦股份有限公司 — RFID 解決方案網站

這是一個專為「世瑋RFID 系統整合電腦股份有限公司」設計的現代化、高質感單頁式網站（Single Page Application）。主要用於展示公司的核心優勢、應用場景、導入流程，並配備一個**互動式 RFID 解決方案設計器（Solution Designer Wizard）**，幫助客戶在線上評估合適的解決方案，並一鍵填寫諮詢表單。

## 技術堆疊

- **HTML5**：語意化結構設計、嵌入式 SVG 動態架構圖。
- **Vanilla CSS3**：現代 CSS 變數（Variables）、Glassmorphism 玻璃擬物風格、自適應響應式排版（Grid & Flexbox）、微交互與關鍵幀動畫。
- **ES6+ Javascript**：響應式選單、實時 RFID 讀寫終端模擬器、線上多步驟規劃邏輯、即時 SVG 圖表渲染、表單送出狀態通知。

## 專案結構

```bash
shiwei-rfid/
├── index.html   # 主網頁結構與 SEO 中繼資料
├── style.css    # 品牌視覺與動畫樣式表 (包含深色科技主題與橘色標誌色)
├── app.js       # 互動控制與線上方案推薦引擎邏輯
└── README.md    # 本說明文件
```

## 本地開發與預覽

由於專案採用純前端靜態技術，您可以使用任何本地 HTTP 伺服器來啟動。例如使用 Node.js 的 `http-server`：

1. 開啟終端機並切換至此目錄：
   ```bash
   cd /Users/albert/.gemini/antigravity/scratch/shiwei-rfid
   ```
2. 啟動伺服器：
   ```bash
   npx -y http-server
   ```
3. 在瀏覽器中開啟回傳的網址（通常為 `http://localhost:8080` 或 `http://127.0.0.1:8080`）進行預覽。
