---
title: Hello World
published: 2026-11-09
publishedAt: 2026-11-09T23:39:27+08:00
description: "每一个博客都从一篇Hello World开始"
image: ''
tags: [Shirone, Astro, 博客]
category: 随笔
draft: false
lang: ''
---

这里是 Shinaki 的第一篇文章。其实我并不知道写什么所以就让AI给我填充一篇了（

## 关于 Shirone

Shirone 是一个基于 Astro 的博客主题，使用 Svelte 5 编写交互组件、Tailwind CSS 4 与 Stylus 组织样式，整体遵循 **Material 3 Expressive** 设计语言。它不只是一个排版外壳：侧边栏、顶栏、文章页、数据页面都由同一套 M3E 组件与设计令牌驱动。

页面切换使用 Swup：顶栏、侧边栏这些持久外壳不会重新渲染，只有内容区域被替换，所以站内跳转没有整页刷新的闪烁。

## 设计上的几个选择

- **设计令牌优先**：颜色、圆角、字号、动效统一走 `--shape-corner-*`、`--m3e-type-*`、`--m3e-duration-*` 这类变量，亮色与暗色主题共用一套结构。
- **组件分层**：atoms → molecules → organisms → templates，跨层依赖有明确方向，页面只负责编排。
- **可选功能零负担**：评论、统计、各种小部件都遵循同一条规则——关闭时不产生网络请求、不占布局、不进入首屏包体。
- **图标服务端渲染**：所有图标在构建期从图标集中生成 SVG，浏览器不会去请求图标接口。

## 内容能力

文章用 Markdown 或 MDX 编写，支持草稿、置顶、系列、标签分类、封面与摘要，也可以在 frontmatter 里单独开关评论、覆写版权声明，甚至给单篇文章加密。

主题还扩展了一套作者可直接使用的 Markdown 语法，用来写更“像页面”的内容：

- 提示框、标签页、分步步骤、字段参数卡片
- 代码树、图片网格与图片尺寸控制
- 数学公式、Mermaid 图表
- 剧透、注解、缩写、GitHub 卡片、include 片段

这些语法不需要额外开关，写在文章里就会按需加载对应的样式与运行时。

## 数据驱动的页面

除了文章，站点还有一些由数据文件生成的页面：

| 页面 | 数据来源 |
| --- | --- |
| 追番 | Bangumi 收藏快照 |
| 游戏 / 设备 | `src/data/games.ts`、`src/data/devices.ts` |
| 友链 / 项目 / 技能 / 时间线 | `src/data/*.ts` |
| 动态 | `src/content/moments/` |

每个页面都可以在 `src/config/` 里单独启用或关闭；关掉之后，页面与导航入口会一起消失。

## 工程实现

- 静态构建：`pnpm build` 生成页面，再用 Pagefind 建立全文搜索索引。
- 内容分离：内容可以留在仓库里，也可以用 `CONTENT_DIR` 指向另一个内容仓库，构建时再同步进来。
- 可复用：主题本身也发布为 npm 包 `shirones`，可以安装到任意 Astro 项目里作为博客层。