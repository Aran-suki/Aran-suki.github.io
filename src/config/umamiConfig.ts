import type { ResolvedUmamiOptions, UmamiConfig } from "@/types/umamiConfig";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * Umami 统计配置单一真源（由 oddmisc 提供）。
 *
 * 遵循「零额外负担」原则：分享统计与访问采集都未配置时不产生任何外部网络请求、
 * 零额外 DOM 占位与零包体积膨胀。
 *
 * 详细用法见：`docs/umami-guide.md`
 */
export const umamiConfig: UmamiConfig = withUserConfig("umami", {
	/** 全局 Umami 统计总开关：false 时完全不加载 oddmisc 运行时脚本与 DOM */
	enable: true,
	/** Umami 分享链接（可选）：留空则只做后台采集，不渲染前台统计 UI */
	shareUrl: "",
	/** Umami Website ID（Umami 后台 Website Settings 里的 `data-website-id`） */
	websiteId: "0cf4656f-1696-4692-8c37-bfee3241acc3",
	/** Umami 采集脚本 URL */
	scriptUrl: "https://cloud.umami.is/script.js",
});

/**
 * 解析并校验 Umami 配置。未启用或分享统计与访问采集都未配置时返回 null。
 */
export function resolveUmamiOptions(config: UmamiConfig): ResolvedUmamiOptions {
	if (!config.enable) {
		return null;
	}
	const shareUrl = config.shareUrl?.trim() || undefined;
	const websiteId = config.websiteId?.trim() || undefined;
	const scriptUrl = config.scriptUrl?.trim() || undefined;
	// 分享统计（oddmisc 运行时 + 统计 UI）与访问采集（官方脚本）彼此独立，
	// 只开其中一条链路也算已配置。
	if (!shareUrl && !(websiteId && scriptUrl)) {
		return null;
	}
	return { shareUrl, websiteId, scriptUrl };
}

export type { ResolvedUmamiOptions };
