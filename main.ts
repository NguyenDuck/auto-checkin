import { Embed, Webhook } from "@vermaysha/discord-webhook";
import { Cookie, GenshinImpact, Hoyolab, ICookie, IDailyReward, LanguageEnum } from "michos_api";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { PNG } from "pngjs";

let globalCodes: { code: string; rewards: string[] }[];

const secrets_f = "./secrets.json";
const user_data_f = "./user_data.json";

const secrets = JSON.parse(readFileSync(secrets_f, { encoding: "utf8" }));
const user_data = JSON.parse(existsSync(user_data_f) ? readFileSync(user_data_f, { encoding: "utf8" }) || "{}" : "{}");

async function main(cookie: ICookie) {
    const hoyolab = new Hoyolab({
        cookie,
        lang: LanguageEnum.VIETNAMESE,
    });
    const record_cards = await hoyolab.gameRecordCard();
    const record_card = record_cards.find((v) => v.game_id == 2);

    const genshin = new GenshinImpact({
        cookie,
        lang: LanguageEnum.VIETNAMESE,
        uid: Number(record_card.game_role_id),
    });

    const daily_info = await genshin.daily.info();
    if (daily_info && !daily_info.is_sign) {
        const claim_info = await genshin.daily.claim();
        if (record_card) await sendCheckinSuccess(record_card, claim_info.reward);
    }

    globalCodes = globalCodes || (await getGiftCodes()).active;

    let redeemed_codes: string[] = user_data[record_card.game_role_id] || [];

    for await (const giftcode of globalCodes) {
        if (redeemed_codes.includes(giftcode.code)) continue;
        await new Promise((resolve, reject) => {
            setTimeout(async () => {
                const response = await genshin.redeem.claim(giftcode.code);
                if (response.retcode == 0) {
                    resolve(giftcode);
                } else {
                    reject(response);
                }
            }, 6000);
        })
            .then(async (v: any) => {
                await sendRedeemedCodeSuccess(record_card, v);
            })
            .catch((e: any) => {
                console.error(e);
            })
            .finally(() => {
                redeemed_codes.push(giftcode.code);
            });
    }

    if (redeemed_codes.length > globalCodes.length) {
        redeemed_codes = redeemed_codes.filter((v) => globalCodes.find((v2) => v2.code == v));
    }

    user_data[record_card.game_role_id] = redeemed_codes;

    writeFileSync(user_data_f, JSON.stringify(user_data));
}

async function sendCheckinSuccess(record_card: any, reward: IDailyReward) {
    const hook = new Webhook(secrets.DISCORD_WEBHOOK_URL);

    const reward_icon_url = reward.award.icon;
    const reward_icon_img = await fetch(reward_icon_url);

    hook.setAvatarUrl(record_card.logo)
        .setUsername("Paimon")
        .addEmbed(
            new Embed()
                .setColor(await getAverageColorHex(await reward_icon_img.arrayBuffer()))
                .setTitle("Điểm Danh Hàng Ngày Genshin Impact")
                .setAuthor({
                    name: `${record_card.nickname} - ${record_card.game_role_id} - AR ${record_card.level}`,
                    icon_url: record_card.logo,
                })
                .addField({ name: "Phần thưởng", value: `${reward.award.name} x${reward.award.cnt}`, inline: true })
                .setThumbnail({ url: reward.award.icon })
                .setTimestamp()
        );
    await hook.send();
}

async function sendRedeemedCodeSuccess(record_card: any, data: any) {
    const hook = new Webhook(secrets.DISCORD_WEBHOOK_URL);

    hook.setAvatarUrl(record_card.logo)
        .setUsername("Paimon")
        .addEmbed(
            new Embed()
                .setColor("#AEFF9C")
                .setTitle("Đã Đổi Giftcode")
                .setAuthor({
                    name: `${record_card.nickname} - ${record_card.game_role_id} - AR ${record_card.level}`,
                    icon_url: record_card.logo,
                })
                .addField({ name: data.code, value: data.rewards.join(", "), inline: true })
                .setTimestamp()
        );
    await hook.send();
}

function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (num: number) => num.toString(16).padStart(2, "0").toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

async function getAverageColorHex(arrayBuffer: ArrayBuffer): Promise<string> {
    return new Promise((resolve, reject) => {
        const png = new PNG({ filterType: 4 });
        png.parse(Buffer.from(arrayBuffer), (err, data) => {
            if (err) reject(err);

            let r = 0,
                g = 0,
                b = 0,
                pixelCount = 0;
            for (let y = 0; y < data.height; y++) {
                for (let x = 0; x < data.width; x++) {
                    const idx = (data.width * y + x) << 2;
                    const alpha = data.data[idx + 3];
                    if (alpha > 0) {
                        r += data.data[idx];
                        g += data.data[idx + 1];
                        b += data.data[idx + 2];
                        pixelCount++;
                    }
                }
            }

            const avgColor = {
                r: Math.min(Math.round((r / pixelCount) * 1.5), 255),
                g: Math.min(Math.round((g / pixelCount) * 1.5), 255),
                b: Math.min(Math.round((b / pixelCount) * 1.5), 255),
            };

            resolve(rgbToHex(avgColor.r, avgColor.g, avgColor.b));
        });
    });
}

async function getGiftCodes() {
    const response = await fetch("https://api.ennead.cc/mihoyo/genshin/codes");
    return await response.json();
}

secrets.COOKIES.forEach((cookie: string) => {
    main(Cookie.parseCookieString(cookie)).catch((e) => {
        console.error(e, e.stack);
    });
});
