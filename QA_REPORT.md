# V10 验收记录

验收日期：2026-11-24（Asia/Shanghai）

## 构建与资源

- 执行 `tsc -b --force && vite build`：通过，1997 个模块完成转换。
- 最终主 JS：约 319.33 kB（gzip 103.30 kB）；主 CSS：约 41.29 kB（gzip 10.16 kB）。
- `public/` 约 43 MB，`dist/` 约 48 MB；线上最大单文件为首页 H.264 MP4，约 10.75 MB。
- 本地生产预览及全部 `portfolio.ts` 媒体路径完成状态检查；V10 新 Logo、活动图、启动视觉缩略图/原图、Hero Poster/MP4 均可访问。
- 源码扫描未发现 Google Fonts、`fonts.googleapis.com`、`fonts.gstatic.com` 或正式页面中的 `TODO_ASSET`。
- Vite `base` 保持 `./`，适用于 `/portfolioz/` 等 GitHub Pages 子路径。

## Chrome 设备度量测试

使用本机 Chrome 无头模式与 DevTools Device Metrics，实际设置以下 CSS 视口并保存截图：

- 320 × 568
- 375 × 667
- 390 × 844
- 430 × 932
- 768 × 1024
- 1024 × 768
- 1366 × 768
- 1440 × 900
- 1920 × 1080

以上视口中 `documentElement.scrollWidth === clientWidth`，未发现页面级横向溢出；Logo 位于视口内且可见。代表截图位于 `QA_SCREENSHOTS/`。

视觉复核结果：

- 320/375/390/430：中文姓名完整；人物贴底且头部、眼睛、挥手区域未被二次裁切；职业与介绍文案不压住脸部；两个入口可见。
- 768/1024：新增独立平板布局档，人物缩小并右移，姓名与介绍不再被覆盖。
- 1366/1440/1920：大标题、人物、双入口和右侧 ZYS Logo 均保持完整。
- 390 活动企划：黑色圆角面板、标题、Banner、说明与按钮完整，图片使用 `contain`。
- 1440 启动视觉：白色圆角面板、两排横向作品和箭头控制显示正常，右侧保留下一项露出提示。
- 390 联系方式：标题自然换行，电话与邮箱复制入口完整；“发送邮件”按钮已按要求删除。

## 浏览器交互回归

通过 Chrome DevTools Protocol 实际触发并读取页面状态：

- 移动菜单：`aria-expanded` 从 false 变为 true，菜单打开。
- 全屏转场：点击活动企划后出现 `01 / CAMPAIGNS`；转场期间锁定页面，约 1.08 秒后 `#campaigns` 顶部定位完成并解除锁定。
- 动态创作：初始 4 项，展开后 7 项，收起后恢复 4 项。
- 启动视觉：点击第一排右箭头，`scrollLeft` 从约 2 变为 284。
- 联系复制：在授予测试页面剪贴板权限后，电话按钮反馈“已复制电话号码”。代码同时保留 API 拒绝时的 `execCommand` 兼容路径。
- 开屏：新会话加载时存在遮罩；约 2.1 秒后遮罩与 `intro-active` 滚动锁均清除。
- 回归过程中未捕获 `Runtime.exceptionThrown`、error 级别浏览器日志或非取消型网络失败。

## 已验证链接与媒体策略

- 8 个活动项目均保留真实素材；`Team Up for Love` 已使用补充提供的 CloudFront 地址。3 个互动网页继续沿用原有真实地址。
- 互动网页初次渲染只有真实截图，点击“载入实时预览”后才创建 iframe。
- 动态视频统一 `preload="none"`；展开区域收起时会暂停第五项之后的视频。
- 首页视频带 Poster、静音、循环、内联播放；其他视频不会在首页初次加载时同时下载。

## 未执行或受限项目

- 未进行 iPhone/Android 真机测试；移动端结果来自 Chrome 设备度量模拟。
- 未在 Safari、Edge、iOS Safari、Android Chrome 上做独立自动化运行。
- 当前项目未安装 Playwright，因此没有声称执行 Playwright 测试；本轮使用 Chrome DevTools Protocol 完成等价的核心流程回归。
- 未运行 Lighthouse，未提供虚构的 LCP/INP/CLS 数值。建议部署后在真实公网环境分别测试首次访问与缓存访问。
- 页面引用的静态图片已统一为 WebP；原 PNG/JPG 移至 `source-media/original-images/`，不进入线上构建。人物和动态作品仍使用 MP4/H.264 视频。

## 2026-11-24 追加修改回归

- 活动企划实际点击验证：初始 4 项 → 展开 8 项 → 收起 4 项，按钮文字与 `aria-expanded` 同步变化。
- `Team Up for Love` 按钮实际读取到 `https://d1m0okuba9ph2x.cloudfront.net/campaigns/team-up-for-love/`。
- 390px 页面检查：DOM 中不存在非 WebP 图片引用，Hero Poster 与导航 Logo 均为 WebP；视频源仍为 MP4。
- 删除“CREATIVE PORTFOLIO / 2026”和“发送邮件”后，浏览器文本与 DOM 均未残留。
- 320px、390px 和 1440px 截图复核通过；移动端人物增大后仍未覆盖职业介绍，Logo 使用 `contain` 并缩小显示。
- 本次回归未捕获运行时异常，390px 下仍满足 `scrollWidth === clientWidth`。

## 2026-11-25 移动导航回归

- 390 × 844 视口从顶部下滑至 1200px 后，导航添加 `is-hidden`，计算位移约为 `-61px`。
- 从 1200px 上滑至 850px 后，`is-hidden` 被移除，导航恢复显示。
- 菜单展开时导航保持可见，页面滚动锁定，菜单层尺寸为 390 × 844。
- 移动端菜单背景为 `rgba(4,4,4,0.7)`，使用 `blur(24px) saturate(.85)`；底层页面可辨识但不影响菜单文字可读性。
- 导航已从 Hero 内部移到 App 根层，避免被 Hero 的 `overflow: hidden` 裁切。
- 已补充 ZYS WebP favicon，最终回归未捕获控制台错误。
- 验收截图：`QA_SCREENSHOTS/mobile-nav-translucent-390.png`。
