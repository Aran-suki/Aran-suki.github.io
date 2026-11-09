/**
 * 游戏展示页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/gamesConfig.ts 控制。
 *
 * 封面支持三种写法：
 * - src/assets 相对路径（如本文件所用，走 Astro 图片管线自动优化为 webp/avif）；
 * - /public 绝对路径（如 "/assets/games/xxx.webp"，原样输出）；
 * - 远程 URL（https://…）。
 *
 * 注：本页只展示「正在玩的游戏」，不记录评分与游玩时长；
 * description 写游戏本身的客观描述，不是个人简评。
 * 封面取自各游戏官方商店页或官网主视觉。
 */
import type { GameItem } from "@/types/gamesConfig";

export const gamesData: GameItem[] = [
	{
		id: "djmax-respect-v",
		name: "DJMAX RESPECT V",
		developer: "NEOWIZ",
		category: "casual",
		status: "playing",
		cover: "assets/games/djmax.jpg",
		icon: "material-symbols:music-note-rounded",
		platform: "PC",
		year: "2020",
		description:
			"NEOWIZ 的下落式音乐游戏，收录大量原创曲目与联名 DLC，支持在线对战与排行榜。",
		link: "https://store.steampowered.com/app/960170/",
	},
	{
		id: "bang-dream-girls-band-party",
		name: "BanG Dream! 少女乐团派对！",
		developer: "Craft Egg",
		category: "casual",
		status: "playing",
		cover: "assets/games/bangdream.jpg",
		icon: "material-symbols:music-note-rounded",
		platform: "Mobile",
		year: "2019",
		description:
			"以少女乐队为主题的节奏手游。通过演奏曲目推进各乐队剧情，收集与培养成员组建自己的乐队。",
		link: "https://game.bilibili.com/bangdream/",
	},
	{
		id: "paradigm-reboot",
		name: "范式：起源",
		developer: "Tuner Games",
		category: "casual",
		status: "playing",
		cover: "assets/games/paradigm.jpg",
		icon: "material-symbols:music-note-rounded",
		platform: "Mobile",
		description:
			"移动端音乐游戏。以原创曲目与剧情章节为核心，配合多档难度与判定设置。",
		link: "https://paradigm.tunergames.com/",
	},
	{
		id: "maimai-dx",
		name: "maimai DX",
		developer: "SEGA",
		category: "casual",
		status: "playing",
		cover: "assets/games/maimai-dx.jpg",
		icon: "material-symbols:music-note-rounded",
		platform: "Arcade",
		year: "2019",
		description:
			"世嘉的街机音乐游戏。以圆形触屏配合按键与滑条演奏曲目，支持多人联机与段位认定。",
		link: "https://maimai.sega.jp/",
	},
	{
		id: "dead-by-daylight",
		name: "Dead by Daylight",
		developer: "Behaviour Interactive",
		category: "action",
		status: "playing",
		cover: "assets/games/dbd.jpg",
		icon: "material-symbols:skull-outline",
		platform: "PC",
		year: "2016",
		description:
			"非对称多人恐怖游戏。一名杀手对抗四名逃生者，在迷雾笼罩的场所中追逐、躲藏并启动发电机开启逃生大门。",
		link: "https://store.steampowered.com/app/381210/",
	},
	{
		id: "neverness-to-everness",
		name: "异环",
		developer: "Hotta Studio",
		category: "open-world",
		status: "playing",
		cover: "assets/games/yihuan-hero.jpg",
		icon: "material-symbols:explore-outline-rounded",
		platform: "PC",
		year: "2026",
		description:
			"超自然都市开放世界 RPG。玩家以「鉴定师」身份在虚构都市海特洛市调查异常事件，与同伴一起解开都市背后的谜团。",
		link: "https://yh.wanmei.com/main.html",
	},
	{
		id: "wuthering-waves",
		name: "鸣潮",
		developer: "Kuro Games",
		category: "open-world",
		status: "playing",
		cover: "assets/games/wuwa.jpg",
		icon: "material-symbols:explore-outline-rounded",
		platform: "PC",
		year: "2024",
		description:
			"开放世界动作 RPG。以高速战斗与「声骸」收集为核心，在末世废土「索拉里斯」探索，追寻失落的过去。",
		link: "https://mc.kurogames.com/",
	},
	{
		id: "street-fighter-6",
		name: "Street Fighter 6",
		developer: "Capcom",
		category: "action",
		status: "playing",
		cover: "assets/games/sf6.jpg",
		icon: "material-symbols:sports-martial-arts-rounded",
		platform: "PC",
		year: "2023",
		description:
			"卡普空格斗游戏系列正统续作。提供经典、现代与动态三种操作方式，并加入开放世界「世界巡游」模式。",
		link: "https://www.streetfighter.com/6/",
	},
	{
		id: "counter-strike-2",
		name: "Counter-Strike 2",
		developer: "Valve",
		category: "action",
		status: "playing",
		cover: "assets/games/cs2.jpg",
		icon: "material-symbols:sports-esports-outline-rounded",
		platform: "PC",
		year: "2023",
		description:
			"5v5 战术射击游戏，由 Valve 基于 Source 2 引擎重制，作为 CS:GO 的免费升级推出。",
		link: "https://www.counter-strike.net/",
	},
	{
		id: "minecraft",
		name: "我的世界",
		developer: "Mojang Studios",
		category: "sandbox",
		status: "playing",
		cover: "assets/games/minecraft-hero.jpg",
		icon: "material-symbols:widgets-rounded",
		platform: "PC",
		year: "2011",
		description:
			"沙盒建造游戏。在程序生成的世界中采集资源、合成物品、建造建筑，并在夜晚的怪物袭击中生存。",
		link: "https://www.minecraft.net/zh-hans",
	},
	{
		id: "alice-in-cradle",
		name: "Alice in Cradle",
		developer: "NanameHacha",
		category: "action",
		status: "playing",
		cover: "assets/games/alice-in-cradle.jpg",
		icon: "material-symbols:forest-rounded",
		platform: "PC",
		description:
			"横版类银河恶魔城动作游戏。操控精灵少女在遗迹中探索、战斗，用魔法与道具开辟新的路线。",
		link: "https://aliceincradle.com/",
	},
	{
		id: "uma-musume-pretty-derby",
		name: "赛马娘 Pretty Derby",
		developer: "Cygames",
		category: "casual",
		status: "playing",
		cover: "assets/games/uma.jpg",
		icon: "material-symbols:directions-run-rounded",
		platform: "Mobile",
		description:
			"Cygames 的赛马拟人养成游戏。培育拥有名马之名的「赛马娘」，通过训练与比赛争夺冠军。",
		link: "https://umamusume.jp/",
	},
];
