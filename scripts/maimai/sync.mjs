#!/usr/bin/env node
/**
 * 水鱼查分器（Diving-Fish）成绩同步。
 *
 * 用法：
 *   DF_TOKEN=<水鱼 Import-Token> node scripts/maimai/sync.mjs
 *
 * 说明：
 * - 令牌只从环境变量读取，不落盘、不写进仓库。
 * - 拉取全部游玩记录与曲目元数据，按官方规则计算 B50：
 *   当前版本（PRiSM PLUS）取 RA 最高的 15 首，历史版本取 RA 最高的 35 首。
 * - 封面下载并压缩到 public/assets/maimai/covers/，页面不直接热链水鱼。
 * - 输出 src/data/maimai/player.json（公开数据，可提交）。
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const API = "https://www.diving-fish.com/api/maimaidxprober";
const CURRENT_VERSION = "maimai でらっくす PRiSM PLUS";
const OUT = path.resolve("src/data/maimai/player.json");
const COVER_DIR = path.resolve("public/assets/maimai/covers");

const token = process.env.DF_TOKEN;
if (!token) {
	console.error("缺少 DF_TOKEN 环境变量（水鱼查分器 Import-Token）。");
	process.exit(1);
}

async function getJson(url, init) {
	const res = await fetch(url, init);
	if (!res.ok) {
		const body = await res.text().catch(() => "");
		throw new Error(`${url} → HTTP ${res.status} ${body.slice(0, 200)}`);
	}
	return res.json();
}

const [player, music] = await Promise.all([
	getJson(`${API}/player/records`, { headers: { "Import-Token": token } }),
	getJson(`${API}/music_data`),
]);

const musicById = new Map(music.map((item) => [String(item.id), item]));
const records = player.records.map((record) => ({
	...record,
	from: musicById.get(String(record.song_id))?.basic_info?.from ?? "",
}));

const byRa = (a, b) => b.ra - a.ra;
const bestNew = records
	.filter((record) => record.from === CURRENT_VERSION)
	.sort(byRa)
	.slice(0, 15);
const bestOld = records
	.filter((record) => record.from !== CURRENT_VERSION)
	.sort(byRa)
	.slice(0, 35);

const toEntry = (record) => ({
	songId: record.song_id,
	title: record.title,
	type: record.type,
	level: record.level,
	levelIndex: record.level_index,
	levelLabel: record.level_label,
	ds: record.ds,
	achievement: record.achievements,
	rate: record.rate,
	fc: record.fc,
	fs: record.fs,
	ra: record.ra,
	dxScore: record.dxScore,
	from: record.from,
	cover: "",
});

const b50 = {
	new: bestNew.map(toEntry),
	old: bestOld.map(toEntry),
};

const coverName = (id) => `${String(id).padStart(5, "0")}.webp`;

await mkdir(COVER_DIR, { recursive: true });
const allEntries = [...b50.new, ...b50.old];
const queue = allEntries.map((entry) => async () => {
	const remote = `${API.replace("/api/maimaidxprober", "")}/covers/${String(entry.songId).padStart(5, "0")}.png`;
	try {
		const res = await fetch(remote);
		if (!res.ok) return;
		const buffer = Buffer.from(await res.arrayBuffer());
		await sharp(buffer)
			.resize(112, 112, { fit: "cover" })
			.webp({ quality: 82 })
			.toFile(path.join(COVER_DIR, coverName(entry.songId)));
		entry.cover = `/assets/maimai/covers/${coverName(entry.songId)}`;
	} catch (error) {
		console.warn(`封面下载失败 ${entry.songId} ${entry.title}: ${error.message}`);
	}
});

// 并发 6 个下载任务。
const workers = Array.from({ length: 6 }, async () => {
	for (;;) {
		const task = queue.shift();
		if (!task) return;
		await task();
	}
});
await Promise.all(workers);

const ratingSum =
	b50.new.reduce((sum, entry) => sum + entry.ra, 0) +
	b50.old.reduce((sum, entry) => sum + entry.ra, 0);

const payload = {
	username: player.username,
	nickname: player.nickname,
	rating: player.rating,
	dan: player.additional_rating,
	plate: player.plate,
	currentVersion: CURRENT_VERSION,
	ratingSum,
	b50,
	updatedAt: new Date().toISOString(),
};

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, `${JSON.stringify(payload, null, "\t")}\n`, "utf8");
console.log(
	`已写入 ${path.relative(process.cwd(), OUT)}：${payload.nickname} / Rating ${payload.rating} / B50 ${allEntries.length} 首（封面 ${allEntries.filter((entry) => entry.cover).length} 张）`,
);
