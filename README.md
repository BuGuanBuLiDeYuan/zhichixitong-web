# 支持系统 - 个人成长理论与实践

这是一个基于Next.js的网站项目，专注于支持系统理论的传播与应用。

## 项目简介

支持系统理论是一种指导个人成长和突破的实用框架，本网站提供了相关的理论知识、实践方法和案例分析。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看网站。

## Vercel部署说明

本项目已针对Vercel部署进行了优化，请按照以下步骤进行部署：

1. 在[Vercel](https://vercel.com)上创建账号并登录
2. 点击"New Project"按钮
3. 导入该Git仓库
4. 在"Environment Variables"部分配置以下环境变量（如果需要）:
   - `MONGODB_URI`: MongoDB连接字符串（如果使用MongoDB）
   - `ALGOLIA_APP_ID`: Algolia应用ID（如果使用Algolia搜索）
   - `ALGOLIA_SEARCH_API_KEY`: Algolia搜索API密钥
   - `ALGOLIA_INDEX_NAME`: Algolia索引名称

5. 点击"Deploy"按钮开始部署

部署完成后，Vercel会提供一个可访问的URL。

## 项目结构

- `app/`: Next.js应用目录，包含页面和路由
- `components/`: UI组件
- `lib/`: 工具函数和数据处理
- `public/`: 静态资源和数据文件

## 技术栈

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion（动画效果）

## 注意事项

- 确保.env.local文件中包含必要的环境变量
- 大型JSON数据文件可能需要优化加载方式
- MongoDB连接需要在Vercel环境变量中配置

## 查看更多

- [Next.js文档](https://nextjs.org/docs)
- [Vercel部署文档](https://nextjs.org/docs/app/building-your-application/deploying)
