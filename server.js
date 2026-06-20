const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;
const distDir = 'D:/ClaudeProject/D4_simulator2.0/dist';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0];

  // 去除末尾的斜杠（除了根路径）
  if (url.length > 1 && url.endsWith('/')) {
    url = url.slice(0, -1);
  }

  let filePath = path.join(distDir, url === '' ? '/index.html' : url);

  // 如果是目录，查找目录下的index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // 如果文件不存在，尝试处理子目录路由
  if (!fs.existsSync(filePath)) {
    const parts = url.split('/').filter(Boolean);

    // 检查是否是已知的子模块
    const knownModules = ['paragon', 'skills', 'equipment', 'calculator', 'database', 'simulator'];
    if (parts.length > 0 && knownModules.includes(parts[0])) {
      const moduleDir = path.join(distDir, parts[0], 'index.html');
      if (fs.existsSync(moduleDir)) {
        filePath = moduleDir;
      }
    }
  }

  // 如果还是不存在，返回主index.html
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'text/plain';

  try {
    const content = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(content);
  } catch (err) {
    res.writeHead(500);
    res.end('Server error');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
