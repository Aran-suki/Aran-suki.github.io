/**
 * 设备展示页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/devicesConfig.ts 控制。
 */
import type { DeviceItem } from "@/types/devicesConfig";

export const devicesData: DeviceItem[] = [
	{
		id: "oneplus-13t",
		name: "一加 13T",
		brand: "OnePlus",
		category: "mobile",
		status: "active",
		specs: "骁龙 8 至尊版 · 16GB+512GB · 6.32″ 1.5K · 6260mAh",
		description: "主力机，小屏旗舰，性能与手感兼顾。",
		icon: "material-symbols:phone-android",
		featured: true,
		year: "2025",
		link: "https://www.oneplus.com/cn/13t",
	},
	{
		id: "xiaomi-pad-5-pro",
		name: "小米平板 5 Pro",
		brand: "Xiaomi",
		category: "mobile",
		status: "active",
		specs: "骁龙 870 · 11″ 2.5K 120Hz · 已 Root",
		description: "纯打音游用，Root 后调延迟、装模块都方便。",
		icon: "material-symbols:tablet-android",
		year: "2021",
		link: "https://www.gsmarena.com/xiaomi_pad_5_pro-11043.php",
	},
	{
		id: "oppo-reno11",
		name: "OPPO Reno11",
		brand: "OPPO",
		category: "mobile",
		status: "backup",
		specs: "天玑 8200 · 6.7″ 120Hz",
		description: "一台平平无奇的备用机。",
		icon: "material-symbols:phone-android",
		year: "2023",
		link: "https://www.oppo.com/cn/smartphones/series-reno/reno11/",
	},
	{
		id: "main-pc",
		name: "主力 PC",
		brand: "Custom",
		category: "desk",
		status: "active",
		specs: "Ryzen 5 5500 · RTX 3070 · 32GB DDR4-3600 · 2×1TB",
		description: "自组c4，用着不烧心",
		icon: "material-symbols:desktop-windows-rounded",
		featured: true,
	},
	{
		id: "truthear-pure",
		name: "初耳声学 PURE",
		brand: "Truthear",
		category: "audio",
		status: "active",
		specs: "入耳式 · 有线",
		description: "均衡还原向风格，温和耐听。",
		icon: "material-symbols:earbuds-rounded",
		link: "https://truthear.com/products/pure",
	},
	{
		id: "moondrop-bangdream",
		name: "水月雨 × BanG Dream! 联动",
		brand: "Moondrop",
		category: "audio",
		status: "active",
		specs: "入耳式 · 有线 · 联名款",
		description: "听邦多利有加成",
		icon: "material-symbols:headphones-rounded",
		link: "https://www.bilibili.com/video/BV1fcxR6nELr/",
	},
];

/** 获取所有设备数据列表 */
export function getDevicesList(): DeviceItem[] {
	return devicesData;
}
