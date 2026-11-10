---
title: 命令速查
published: 2026-11-10
publishedAt: 2026-11-10T14:20:39+08:00
description: '记录了一些常用的命令'
image: ''
tags: [命令,Astro,Shirone]
category: '笔记'
draft: false 
lang: ''
---

## 一、日常改完 → 推送（最常用）

```bash
# 本地校验（改过代码/配置建议跑；只改文章也建议跑一次 build）
pnpm exec astro check
pnpm build

# 提交
git add -A
git commit -m "post: 新增文章 xxx"     # 或 feat: / fix: / docs: / chore:

# 推送
git push origin main
```

推送后 GitHub Actions 会自动构建并发布；Cloudflare（如果已连仓库）也会自动构建 `*.pages.dev`。

---

## 二、只改文章内容时

文章在 `src/content/posts/`，新建一篇：

```bash
pnpm new-post my-post-name
# 编辑 src/content/posts/my-post-name.md
pnpm build
git add -A
git commit -m "post: my-post-name"
git push origin main
```

---

## 三、更新追番数据（需要走代理时）

```bash
NODE_USE_ENV_PROXY=1 HTTPS_PROXY=http://127.0.0.1:2080 node scripts/anime/sync.mjs --provider bangumi

# 确认 src/data/anime-snapshots/bangumi.json 有变化后
git add src/data/anime-snapshots/bangumi.json
git commit -m "chore: sync bangumi snapshot"
git push origin main
```

> 说明：快照文件现在已提交进仓库，Cloudflare 和 GitHub Pages 构建时都会读它；本地 sync 后记得把 json 一起提交。

---

## 四、常见情况

### push 被拒（远端有新提交）

```bash
git pull --rebase origin main
git push origin main
```

### `git status` 突然冒出一大堆没动过的文件

多半是 Windows 换行（CRLF）差异。先看真实改动再决定：

```bash
git diff -w --stat          # 忽略空白后的真实改动
git diff --ignore-cr-at-eol --name-only
```

确认是纯换行的话，可以 `git checkout -- <那些文件>` 还原，别直接 `git add -A` 把噪声提交进去。

### 只想本地预览，不发布

```bash
pnpm dev          # http://localhost:4321
```

### Cloudflare 没更新

去 CF 项目 → Deployments，看最新一次是不是对应刚推的 commit；没有就点 Retry，或者推一个空提交：

```bash
git commit --allow-empty -m "chore: trigger deploy"
git push origin main
```

---

## 五、整合命令

```bash
cd /d/Shirone && pnpm build && git add -A && git commit -m "chore: update site" && git push origin main
```

把 `chore: update site` 换成实际做的事就行。

---