# Cloudflare Web Analytics 集成指南

站点通过 Cloudflare Web Analytics 的官方 beacon 采集访问数据：无需 Cookie、无需自建服务，
脚本由 `static.cloudflareinsights.com` 提供，异步加载，不阻塞渲染。

## 1. 配置 Token

Token 在 Cloudflare 控制台获取：

1. 进入 **Web Analytics** → 选择站点；
2. 打开 **查看 JS 代码片段**；
3. 复制 `data-cf-beacon` 里的 `token` 值。

然后编辑 `src/config/cloudflareAnalyticsConfig.ts`：

```ts
import type { CloudflareAnalyticsConfig } from "@/types/cloudflareAnalyticsConfig";
import { withUserConfig } from "../utils/config-overlay.ts";

export const cloudflareAnalyticsConfig: CloudflareAnalyticsConfig =
  withUserConfig("cloudflareAnalytics", {
    enable: true,
    token: "你的 beacon token",
  });
```

启用内容分离（`external`）模式时无需改代码仓，在内容仓创建 `config/cloudflare-analytics.yaml`：

```yaml
# 内容仓/config/cloudflare-analytics.yaml
enable: true
token: 你的 beacon token
```

覆盖值会在 `content:sync` 时合并进主题默认配置，未填写的字段继续沿用默认值。

## 2. 注入位置

`src/layouts/Layout.astro` 在 `<head>` 内注入唯一的 beacon 标签：

```html
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "..."}'></script>
```

- 只注入一个脚本、一个属性，不生成任何统计 DOM；
- `enable: false` 或 `token` 为空时整段不输出，零外部请求、零包体积；
- Token 会公开出现在页面源码里，这是 Cloudflare beacon 的设计，不属于私密凭据。

## 3. 验证

1. `pnpm.cmd build` 后检查 `dist/**/index.html`，`<head>` 中应出现一次 `beacon.min.js`；
2. 浏览器 DevTools → Network 过滤 `cloudflareinsights`，页面加载后应看到 beacon 请求；
3. Cloudflare 控制台 → Web Analytics 的「实时」面板应在数十秒内出现访问记录。

## 4. 与 Umami 的关系

两者互不依赖：`umamiConfig` 负责站点内的公开统计展示（分享链接方式），
`cloudflareAnalyticsConfig` 只负责访问采集，可单独开启或同时开启。
