/**
 * Cloudflare Web Analytics 配置类型。
 *
 * 使用 Cloudflare 官方 beacon 采集访问数据，无需自建统计服务；
 * Token 来自 Cloudflare 控制台「Web Analytics → 站点 → JS 代码片段」。
 */
export type CloudflareAnalyticsConfig = {
	/** 全局开关：false 时完全不注入 beacon 脚本，零外部请求、零额外 DOM */
	enable: boolean;
	/** Cloudflare Web Analytics 的 beacon Token（`data-cf-beacon` 中的 `token`） */
	token: string;
};

/**
 * 解析后的 Cloudflare Web Analytics 选项。
 */
export type ResolvedCloudflareAnalyticsOptions = {
	/** Cloudflare Web Analytics 的 beacon Token */
	token: string;
} | null;
