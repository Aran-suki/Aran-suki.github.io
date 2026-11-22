/**
 * Umami 统计配置类型（由 oddmisc 提供）。
 */
export type UmamiConfig = {
	/** 全局 Umami 统计总开关：false 时完全不加载 oddmisc 运行时脚本与 DOM */
	enable: boolean;
	/** Umami 分享链接（可选）：填写后启用前台公开统计读取；留空则只做后台访问采集。 */
	shareUrl: string;
	/** Umami Website ID；与 scriptUrl 同时配置时启用访问采集。 */
	websiteId?: string;
	/** Umami 采集脚本 URL；与 websiteId 同时配置时启用访问采集。 */
	scriptUrl?: string;
};

/**
 * 解析后的 Umami 配置选项。
 *
 * 分享统计与访问采集是两条独立链路：
 * - `shareUrl`：读取公开分享数据，驱动页脚/文章页的统计 UI；
 * - `websiteId` + `scriptUrl`：注入官方采集脚本，向 Umami 上报访问。
 *
 * 只配置采集而不需要前台展示时，`shareUrl` 可以缺省。
 */
export type ResolvedUmamiOptions = {
	shareUrl?: string;
	websiteId?: string;
	scriptUrl?: string;
} | null;
