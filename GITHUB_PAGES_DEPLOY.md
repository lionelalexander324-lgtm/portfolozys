# GitHub Pages 部署说明

这个版本已包含 `.github/workflows/deploy-pages.yml`，推送到 `main` 分支后会自动构建并部署。

1. 解压 GitHub 轻量部署包。
2. 把解压后的文件上传到一个新的 GitHub 仓库根目录，不要把 ZIP 文件本身直接上传。
3. 打开仓库 `Settings → Pages`，将 `Build and deployment / Source` 设为 `GitHub Actions`。
4. 打开 `Actions`，等待 `Deploy portfolio to GitHub Pages` 完成。
5. 部署地址会显示在工作流结果以及 `Settings → Pages` 中。

网页上传时请上传“解压后的项目文件”，不要上传 ZIP 本身。当前部署源码包内最大单文件约 10.75 MB；如果浏览器批量上传仍失败，优先使用 GitHub Desktop 或本地 Git 提交解压后的整个文件夹。

首屏只部署 H.264 MP4 与封面；原始 MOV 和未上线播放的原始视频仅保留在完整版源码的 `source-media/`。动态作品使用点击后加载，避免初次访问同时下载全部视频。
