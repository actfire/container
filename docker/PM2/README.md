# 執行 node.js 的 pm2 容器

## 適用情境

- Node.js 應用程式, 非 Node.js 應用請根據 pm2.json 調整(exec_mode: fork)
- 程式請放置於 apps 資料夾內, 個別專案請以 app1、app2 資料夾命名, 資料夾名稱請同步 pm2.json 裡的設定

## 說明

- pm2.json 設定參照官網說明: [Ecosystem File](https://pm2.keymetrics.io/docs/usage/application-declaration/)
