# 张雅书个人创意作品集 V10

基于原 React + TypeScript + Vite 项目完成的改版，保留原作品结构、双排横向作品预览、独立 About、Work Index、四个作品分类、真实媒体和有效外链。

## 本地运行

需要 Node.js 20+。项目锁文件使用 pnpm 9：

```bash
pnpm install --frozen-lockfile
pnpm dev
```

生产构建与本地预览：

```bash
pnpm build
pnpm preview
```

构建文件位于 `dist/`。Vite `base` 为 `./`，可部署到 GitHub Pages 的仓库子路径。自动部署步骤见 `GITHUB_PAGES_DEPLOY.md`。

## 内容维护

- 作品名称、顺序、说明、链接与联系方式：`src/data/portfolio.ts`
- V10 视觉与响应式样式：`src/v10.css`
- 原有基础样式：`src/index.css`
- 网站媒体：`public/assets/`
- 原始未压缩素材：`source-media/`（不进入线上构建）
- 资源替换映射：`V10_ASSET_MAP.md`
- 实际测试记录：`QA_REPORT.md`

## V10 交互结构

- 首次访问显示约 0.8–1.5 秒的 `Hello` 圆形笑脸开屏；同一会话不重复播放，并支持 `prefers-reduced-motion`。
- 首页只保留中文“张雅书”为姓名主视觉，人物 H.264 MP4 贴合 Hero 底边，提供同源视频封面。
- 点击首页入口、目录、导航或返回链接时，使用全屏幕布与章节标题转场；正常滚动不会触发幕布。
- 移动端导航向下滚动自动隐藏、向上滚动恢复；菜单展开后使用全屏半透明模糊背景并保持导航可见。
- 四个作品章节与联系页使用黑白交替圆角面板，以滚动进度驱动面板从下方进入；内部仍是自然文档流，没有全局滚轮拦截、整屏吸附或长内容固定。
- 启动视觉为两排独立横向滑动，支持鼠标拖拽、触控板、箭头、触摸与 Scroll Snap。
- 互动网页先显示真实截图，访客主动选择后才创建 iframe；外链仍可直接打开。
- 动态作品初始显示前四项，第五项以后可展开；作品视频为 `preload="none"`，隐藏或离开视口时暂停。
- 电话和邮箱点击复制，Clipboard API 被拒绝时尝试兼容复制，并提供非阻塞反馈。

## 性能说明

- 首页人物使用 H.264 MP4 与真实 Poster；其余作品视频不自动下载完整文件。
- 新增启动视觉同时保留高清原图和缩小的展示图，灯箱才使用高清版本。
- 本项目不依赖 Google Fonts 或其他外部字体服务。
- 页面使用的静态图片已统一为 WebP；旧 PNG/JPG 原图保存在 `source-media/original-images/`，不会进入线上构建。
- 人物与动态作品继续使用 MP4/H.264，因为 WebP 是图片格式，不能替代需要播放、暂停和进度控制的视频资源。

## 部署提醒

GitHub 网页端请上传“解压后的项目文件”，不要直接把完整 ZIP 作为仓库内容。源码包内不含 `node_modules`、原始 MOV 或 QA 截图；推送到 `main` 后 GitHub Actions 会自动安装、构建并发布。
