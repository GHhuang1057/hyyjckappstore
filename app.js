const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// 静态文件目录
app.use(express.static('public'));
app.use(express.json());

// 连接数据库
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('数据库连接错误:', err.message);
  } else {
    console.log('成功连接到SQLite数据库');
  }
});

// 初始化应用表
(db.run(`\n  CREATE TABLE IF NOT EXISTS apps (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    name TEXT NOT NULL,\n    description TEXT,\n    version TEXT,\n    download_url TEXT NOT NULL,\n    icon_url TEXT\n  )\n`));

// 首页路由
app.get('/', (req, res) => {
  res.send('应用商店首页');
});

// 启动服务器
app.listen(port, () => {
  console.log(`应用商店运行在 http://localhost:${port}`);
});