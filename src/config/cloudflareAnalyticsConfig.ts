import type {
	CloudflareAnalyticsConfig,
	ResolvedCloudflareAnalyticsOptions,
} from "@/types/cloudflareAnalyticsConfig";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * Cloudflare Web Analytics 配置单一真源。
 *
 * 遵循「零额外负担」原则：`enable` 为 false 或 `token` 为空时，
 * 不注入任何脚本、不产生外部请求、零额外 DOM 占位。
 *
 * 详细用法见：`docs/cloudflare-analytics-guide.md`
 */
export const cloudflareAnalyticsConfig: CloudflareAnalyticsConfig =
	withUserConfig("cloudflareAnalytics", {
		/** 全局开关：false 时完全不注入 Cloudflare beacon 脚本 */
		enable: true,
		/**
		 * Cloudflare Web Analytics 的 beacon Token。
		 *
		 * 获取方式：Cloudflare 控制台 → Web Analytics → 选择站点 →
		 * 「查看 JS 代码片段」，取 `data-cf-beacon` 里的 `token` 值。
		 * 该 Token 会公开出现在页面源码中，不属于私密凭据。
		 */
		token: "1cc71926cdaf4f91a4455e1b15efc2ea",
	});

/**
 * 解析并校验 Cloudflare Web Analytics 配置。未启用或 token 缺失时返回 null。
 */
export function resolveCloudflareAnalyticsOptions(
	config: CloudflareAnalyticsConfig,
): ResolvedCloudflareAnalyticsOptions {
	if (!config.enable) {
		return null;
	}
	const token = config.token?.trim();
	if (!token) {
		return null;
	}
	return { token };
}

export type { ResolvedCloudflareAnalyticsOptions };
