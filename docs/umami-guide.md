# Umami 统计集成指南

本项目使用 [oddmisc](https://www.npmjs.com/package/oddmisc) 集成 Umami 网站统计。

## 快速开始

### 1. 启用统计

只做后台采集（推荐，前台不显示任何统计 UI）时，填 `websiteId` + `scriptUrl`，`shareUrl` 留空即可：

```ts
import type { UmamiConfig } from "@/types/umamiConfig";
import { withUserConfig } from "../utils/config-overlay.ts";

export const umamiConfig: UmamiConfig = withUserConfig("umami", {
  enable: true,
  // 留空表示不读取公开分享统计、不渲染前台统计 UI
  shareUrl: "",
  // 同时配置以下两项后，页面会加载官方 Umami 脚本采集访问数据。
  websiteId: "your-website-id",
  scriptUrl: "https://cloud.umami.is/script.js",
});
```

需要前台展示访问量时，再填 `shareUrl`（见下文「获取分享链接」）。

启用内容分离（`external`）模式时，无需修改主题代码仓。在内容仓创建
`config/umami.yaml`，写入需要覆盖的字段即可：

```yaml
# 内容仓/config/umami.yaml
enable: true
websiteId: your-website-id
scriptUrl: https://cloud.umami.is/script.js
# 需要前台展示访问量时再填：
# shareUrl: https://your-umami-instance.com/share/<shareId>
```

配置覆盖会在 `content:sync` 时自动编译并合并到主题默认值；未填写的字段继续使用默认值。
`shareUrl` 与「`websiteId` + `scriptUrl`」是两条独立链路：前者只驱动前台公开统计，
后者负责访问上报；只配置其中一条时，另一条保持关闭。

### 2. 获取分享链接

在 Umami 后台：
1. 进入 **Settings** → **Share URL**
2. 创建新的分享链接
3. 复制生成的 URL（格式如下）

支持的 URL 格式：
- `https://umami.example.com/share/<shareId>`
- `https://cloud.umami.is/analytics/us/share/<shareId>`
- `https://umami.example.com/analytics/share/<shareId>`

### 3. 可选访问采集

`shareUrl` 只负责读取公开分享统计。需要让 Shirone 页面本身向 Umami 上报访问时，
再同时配置 `websiteId` 与 `scriptUrl`。只配置其中一项不会加载采集脚本。

## 零额外负担原则

- `enable: false`：零网络请求、零 DOM、零客户端脚本与样式
- 仅填 `websiteId` + `scriptUrl`（纯采集模式）：只注入一个异步 `script.js`，不加载 oddmisc 运行时、不渲染统计 UI
- 填了 `shareUrl` 才注入 oddmisc 运行时与统计 UI
- UI 由 SSR 直接输出稳定数值槽，异步数据只替换槽内文本，不改变布局
- 官方 Umami 采集脚本仅在 `websiteId` 与 `scriptUrl` 都有效时加载

## 客户端 API

启用后，浏览器控制台可用 `window.oddmisc`：

```js
// 站点整体统计
const site = await window.oddmisc.getSiteStats();

// 指定页面统计
const about = await window.oddmisc.getPageStats("/about");

// 实时在线访客
const live = await window.oddmisc.getActiveVisitors();

// 就绪事件
window.addEventListener("oddmisc-ready", (e) => {
  e.detail.client.getSiteStats().then(console.log);
});
```

## 返回结构

```ts
interface StatsResult {
  pageviews: number;
  visitors: number;
  visits: number;
  bounces?: number;
  totaltime?: number;
  comparison?: {
    pageviews?: number;
    visitors?: number;
    visits?: number;
    bounces?: number;
    totaltime?: number;
  };
  _fromCache?: boolean;
}
```

## 缓存机制

- 内存 + localStorage 双级缓存
- 默认 TTL：1 小时（由 oddmisc 管理）
- 缓存命中时返回值带 `_fromCache: true`
- `client.clearCache()` 可清空缓存

## 错误处理

所有错误继承自 `UmamiError`（带 `code` 与可选 `status`）：

- `UmamiUrlError` — `INVALID_URL`，无效分享链接
- `UmamiAuthError` — `AUTH_FAILED`，401，shareId 失效
- `UmamiNetworkError` — `NETWORK_ERROR`，非预期状态码
- `UmamiTimeoutError` — `TIMEOUT`，请求超时（默认 10s）

## Node 端使用

```ts
import { createUmamiClient } from "oddmisc";

const client = createUmamiClient({
  shareUrl: "https://your-umami-instance.com/share/<shareId>",
});

const page = await client.getPageStats("/about");
const site = await client.getSiteStats();
const series = await client.getPageviews({
  startAt: Date.now() - 24 * 3600_000,
  endAt: Date.now(),
  unit: "hour",
  timezone: "Asia/Shanghai",
});
const topPaths = await client.getMetrics("path", { limit: 10 });
```

## 浏览器兼容性

现代浏览器（Chrome 60+、Firefox 60+、Safari 12+）；需要 `fetch`、`URL`、`AbortController`、`localStorage`。
