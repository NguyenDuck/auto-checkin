"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_webhook_1 = require("@vermaysha/discord-webhook");
var michos_api_1 = require("michos_api");
var pngjs_1 = require("pngjs");
var process_1 = require("process");
var globalCodes;
function main(cookie) {
    return __awaiter(this, void 0, void 0, function () {
        var hoyolab, record_cards, record_card, genshin, daily_info, claim_info, giftCodes, _a, _loop_1, _b, giftCodes_1, giftCodes_1_1, e_1_1;
        var _this = this;
        var _c, e_1, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    hoyolab = new michos_api_1.Hoyolab({
                        cookie: cookie,
                        lang: michos_api_1.LanguageEnum.VIETNAMESE,
                    });
                    return [4 /*yield*/, hoyolab.gameRecordCard()];
                case 1:
                    record_cards = _f.sent();
                    record_card = record_cards.find(function (v) { return v.game_id == 2; });
                    genshin = new michos_api_1.GenshinImpact({
                        cookie: cookie,
                        lang: michos_api_1.LanguageEnum.VIETNAMESE,
                        uid: Number(record_card.game_role_id),
                    });
                    return [4 /*yield*/, genshin.daily.info()];
                case 2:
                    daily_info = _f.sent();
                    if (!(daily_info && !daily_info.is_sign)) return [3 /*break*/, 5];
                    return [4 /*yield*/, genshin.daily.claim()];
                case 3:
                    claim_info = _f.sent();
                    if (!record_card) return [3 /*break*/, 5];
                    return [4 /*yield*/, sendCheckinSuccess(record_card, claim_info.reward)];
                case 4:
                    _f.sent();
                    _f.label = 5;
                case 5:
                    _a = globalCodes;
                    if (_a) return [3 /*break*/, 7];
                    return [4 /*yield*/, getGiftCodes()];
                case 6:
                    _a = (_f.sent());
                    _f.label = 7;
                case 7:
                    giftCodes = _a;
                    _f.label = 8;
                case 8:
                    _f.trys.push([8, 14, 15, 20]);
                    _loop_1 = function () {
                        var giftcode;
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    _e = giftCodes_1_1.value;
                                    _b = false;
                                    giftcode = _e;
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var response;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, genshin.redeem.claim(giftcode.code)];
                                                        case 1:
                                                            response = _a.sent();
                                                            if (response.retcode == 0) {
                                                                resolve(giftcode);
                                                            }
                                                            else {
                                                                reject(response);
                                                            }
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); }, 6000);
                                        })
                                            .then(function (v) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, sendRedeemedCodeSuccess(record_card, v)];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })
                                            .catch(function (e) {
                                            console.error(e);
                                        })];
                                case 1:
                                    _g.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _b = true, giftCodes_1 = __asyncValues(giftCodes);
                    _f.label = 9;
                case 9: return [4 /*yield*/, giftCodes_1.next()];
                case 10:
                    if (!(giftCodes_1_1 = _f.sent(), _c = giftCodes_1_1.done, !_c)) return [3 /*break*/, 13];
                    return [5 /*yield**/, _loop_1()];
                case 11:
                    _f.sent();
                    _f.label = 12;
                case 12:
                    _b = true;
                    return [3 /*break*/, 9];
                case 13: return [3 /*break*/, 20];
                case 14:
                    e_1_1 = _f.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 20];
                case 15:
                    _f.trys.push([15, , 18, 19]);
                    if (!(!_b && !_c && (_d = giftCodes_1.return))) return [3 /*break*/, 17];
                    return [4 /*yield*/, _d.call(giftCodes_1)];
                case 16:
                    _f.sent();
                    _f.label = 17;
                case 17: return [3 /*break*/, 19];
                case 18:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 19: return [7 /*endfinally*/];
                case 20: return [2 /*return*/];
            }
        });
    });
}
var DISCORD_WEBHOOK_URL = undefined;
function sendCheckinSuccess(record_card, reward) {
    return __awaiter(this, void 0, void 0, function () {
        var hook, reward_icon_url, reward_icon_img, _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    hook = new discord_webhook_1.Webhook(DISCORD_WEBHOOK_URL !== null && DISCORD_WEBHOOK_URL !== void 0 ? DISCORD_WEBHOOK_URL : process_1.env.DISCORD_WEBHOOK_URL);
                    reward_icon_url = reward.award.icon;
                    return [4 /*yield*/, fetch(reward_icon_url)];
                case 1:
                    reward_icon_img = _f.sent();
                    _b = (_a = hook.setAvatarUrl(record_card.logo)
                        .setUsername("Paimon"))
                        .addEmbed;
                    _d = (_c = new discord_webhook_1.Embed())
                        .setColor;
                    _e = getAverageColorHex;
                    return [4 /*yield*/, reward_icon_img.arrayBuffer()];
                case 2: return [4 /*yield*/, _e.apply(void 0, [_f.sent()])];
                case 3:
                    _b.apply(_a, [_d.apply(_c, [_f.sent()])
                            .setTitle("Điểm Danh Hàng Ngày Genshin Impact")
                            .setAuthor({
                            name: "".concat(record_card.nickname, " - ").concat(record_card.game_role_id, " - AR ").concat(record_card.level),
                            icon_url: record_card.logo,
                        })
                            .addField({ name: "Phần thưởng", value: "".concat(reward.award.name, " x").concat(reward.award.cnt), inline: true })
                            .setThumbnail({ url: reward.award.icon })
                            .setTimestamp()]);
                    return [4 /*yield*/, hook.send()];
                case 4:
                    _f.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function sendRedeemedCodeSuccess(record_card, data) {
    return __awaiter(this, void 0, void 0, function () {
        var hook;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hook = new discord_webhook_1.Webhook(DISCORD_WEBHOOK_URL !== null && DISCORD_WEBHOOK_URL !== void 0 ? DISCORD_WEBHOOK_URL : process_1.env.DISCORD_WEBHOOK_URL);
                    hook.setAvatarUrl(record_card.logo)
                        .setUsername("Paimon")
                        .addEmbed(new discord_webhook_1.Embed()
                        .setColor("#AEFF9C")
                        .setTitle("Đã Đổi Giftcode" + data.code)
                        .setAuthor({
                        name: "".concat(record_card.nickname, " - ").concat(record_card.game_role_id, " - AR ").concat(record_card.level),
                        icon_url: record_card.logo,
                    })
                        .addField({ name: data.code, value: data.rewards.join(", "), inline: true })
                        .setTimestamp());
                    return [4 /*yield*/, hook.send()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function rgbToHex(r, g, b) {
    var toHex = function (num) { return num.toString(16).padStart(2, "0").toUpperCase(); };
    return "#".concat(toHex(r)).concat(toHex(g)).concat(toHex(b));
}
function getAverageColorHex(arrayBuffer) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var png = new pngjs_1.PNG({ filterType: 4 });
                    png.parse(Buffer.from(arrayBuffer), function (err, data) {
                        if (err)
                            reject(err);
                        var r = 0, g = 0, b = 0, pixelCount = 0;
                        for (var y = 0; y < data.height; y++) {
                            for (var x = 0; x < data.width; x++) {
                                var idx = (data.width * y + x) << 2;
                                var alpha = data.data[idx + 3];
                                if (alpha > 0) {
                                    r += data.data[idx];
                                    g += data.data[idx + 1];
                                    b += data.data[idx + 2];
                                    pixelCount++;
                                }
                            }
                        }
                        var avgColor = {
                            r: Math.min(Math.round((r / pixelCount) * 1.5), 255),
                            g: Math.min(Math.round((g / pixelCount) * 1.5), 255),
                            b: Math.min(Math.round((b / pixelCount) * 1.5), 255),
                        };
                        resolve(rgbToHex(avgColor.r, avgColor.g, avgColor.b));
                    });
                })];
        });
    });
}
function getGiftCodes() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.ennead.cc/mihoyo/genshin/codes")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.active];
            }
        });
    });
}
var COOKIES = undefined;
(COOKIES !== null && COOKIES !== void 0 ? COOKIES : JSON.parse(process_1.env.COOKIES)).forEach(function (cookie) {
    main(michos_api_1.Cookie.parseCookieString(cookie)).catch(function (e) {
        console.error(e, e.stack);
    });
});
