# 🚀 OKONS Vercel 部署检查清单

## 📋 部署前准备

### ✅ 必需步骤
- [ ] 获取 WalletConnect Project ID
  - 访问 [https://cloud.walletconnect.com](https://cloud.walletconnect.com)
  - 创建项目并复制 Project ID
- [ ] 确认合约地址正确
- [ ] 代码推送到 GitHub

### ✅ 文件检查
- [x] `vercel.json` - Vercel 配置文件
- [x] `DEPLOYMENT.md` - 详细部署指南
- [x] `env.example` - 环境变量模板
- [x] `package.json` - 构建脚本已优化

## 🔧 Vercel 配置

### 1. 创建项目
```bash
# 访问 vercel.com
# 点击 "New Project"
# 连接 GitHub 仓库
# 选择 OKONS 项目
```

### 2. 环境变量设置
在 Vercel 项目设置中添加：
```
REACT_APP_WALLETCONNECT_PROJECT_ID=你的项目ID
```

### 3. 构建设置（自动检测）
- Framework: Create React App
- Build Command: `npm run build`
- Output Directory: `build`

## 🎯 部署后验证

### 功能测试
- [ ] 首页正常加载
- [ ] Logo 和品牌显示正确
- [ ] 语言切换功能正常
- [ ] 钱包连接功能正常
- [ ] 域名搜索功能正常
- [ ] "我的名称"页面正常

### 性能检查
- [ ] 页面加载速度 < 3 秒
- [ ] 移动端响应式正常
- [ ] 所有图片和资源正常加载

### SEO 检查
- [ ] 页面标题显示 "OKONS - 注册.okb域名"
- [ ] Meta 描述正确
- [ ] Favicon 正常显示
- [ ] Open Graph 标签正常

## 🔗 快速部署链接

1. **一键部署到 Vercel**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/你的用户名/OKONS)

2. **手动部署步骤**
   - 访问 [vercel.com](https://vercel.com)
   - 导入 GitHub 项目
   - 配置环境变量
   - 点击部署

## ⚡ 常见问题

### 构建失败
- 检查 Node.js 版本 (推荐 18+)
- 清理依赖: `rm -rf node_modules && npm install`

### 钱包连接失败
- 确认 WalletConnect Project ID 正确
- 检查项目域名是否添加到 WalletConnect 配置

### 页面空白
- 检查浏览器控制台错误
- 确认所有环境变量已设置

## 🎉 部署成功！

部署成功后你会得到：
- 生产环境 URL: `https://你的项目名.vercel.app`
- 自动 HTTPS 证书
- 全球 CDN 加速
- 自动构建和部署

## 📞 支持

如需帮助：
1. 查看 `DEPLOYMENT.md` 详细指南
2. 检查 Vercel 部署日志
3. 查看浏览器控制台错误

---

**记住**: 每次推送到 `main` 分支都会自动触发新的部署！
