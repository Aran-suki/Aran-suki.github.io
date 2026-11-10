/**
 * 站点统计取数（SideBar stats widget 消费）。
 * 模块级备忘化：构建期多个页面渲染共享一次汇总（总字数需要对全部
 * 文章跑 render 提取 remark 字数，不做缓存会逐页重复开销）。
 */
import { render } from "astro:content";
import { seriesConfig } from "../config/seriesConfig.ts";
import { siteConfig } from "../config/siteConfig.ts";
import {
	getCategoryList,
	getSeriesCatalog,
	getSortedMoments,
	getSortedPosts,
	getTagList,
} from "./content-utils";

export interface SiteStats {
	posts: number;
	moments: number;
	categories: number;
	tags: number;
	/** 系列实体数 */
	series: number;
	/** 全部文章 remark 字数之和 */
	words: number;
	/** 运行天数：以最早一篇文章的发布日为起点（无文章则 0） */
	days: number;
	/** 最近更新：全站最新一篇的发布/更新日（ISO 字符串；无文章为 null） */
	lastActivity: string | null;
}

const DAY_MS = 86_400_000;

/** 某时刻在站点时区中的日历日（UTC 零点时间戳），用于按“自然日”计算天数。 */
function calendarDay(ms: number): number {
	const parts = new Intl.DateTimeFormat("en-CA", {
		timeZone: siteConfig.timeZone,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).formatToParts(new Date(ms));
	const get = (type: string) =>
		Number(parts.find((part) => part.type === type)?.value);
	return Date.UTC(get("year"), get("month") - 1, get("day"));
}

/** 配置的运行天数起算日（YYYY-MM-DD）→ 日历日时间戳；未配置返回 null。 */
function configuredStartDay(): number | null {
	if (!siteConfig.startDate) return null;
	const [year, month, day] = siteConfig.startDate.split("-").map(Number);
	if (!year || !month || !day) return null;
	return Date.UTC(year, month - 1, day);
}

let cache: SiteStats | null = null;

export async function getSiteStats(): Promise<SiteStats> {
	if (cache) return cache;

	const [posts, moments, categories, tags, seriesCatalog] = await Promise.all([
		getSortedPosts(),
		getSortedMoments(),
		getCategoryList(),
		getTagList(),
		// 功能关闭时不查集合（SiteStats 也不产出系列行）
		seriesConfig.enable ? getSeriesCatalog() : Promise.resolve(null),
	]);

	// 总字数、最早发布日与最近更新日来自同一批文章，一次遍历
	let words = 0;
	let earliest = Number.POSITIVE_INFINITY;
	let latestActivity = 0;
	for (const post of posts) {
		const { remarkPluginFrontmatter } = await render(post);
		words += remarkPluginFrontmatter.words ?? 0;
		const published = new Date(post.data.published).getTime();
		if (published < earliest) earliest = published;
		const updated = post.data.updated
			? new Date(post.data.updated).getTime()
			: 0;
		latestActivity = Math.max(latestActivity, published, updated);
	}

	cache = {
		posts: posts.length,
		moments: moments.length,
		categories: categories.length,
		tags: tags.length,
		/** 系列实体数（功能关闭时为 0，SiteStats 不产出该行） */
		series: seriesCatalog?.size ?? 0,
		words,
		days: (() => {
			const startDay =
				configuredStartDay() ??
				(Number.isFinite(earliest) ? calendarDay(earliest) : null);
			if (startDay === null) return 0;
			return Math.max(
				0,
				Math.floor((calendarDay(Date.now()) - startDay) / DAY_MS),
			);
		})(),
		lastActivity:
			latestActivity > 0 ? new Date(latestActivity).toISOString() : null,
	};
	return cache;
}
