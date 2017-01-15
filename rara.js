(function() {
    var a = bb01bbbe9,
        b = a.moduleLogger("Farm-Bot", "farm_showmessages");
    var c = Timestamp.server(),
        d = ITowns.getTowns(),
        e = [],
        f = parseInt(a.sett.farm_pause, 10) * 1E3,
        g = [300, 1200, 5400, 14400];
    a.rand = function(a) {
        return Math.random() * 3000;
    };

    function h(b) {
        var c = a.sett.farm_time,
            d = g[0],
            e = a.custom.get(b.id);
        if (e) {
            if (e.farm_time === "disabled") return "disabled";
            c = e.farm_time === "global" ? a.sett.farm_time : e.farm_time;
        }
        c = parseInt(c, 10);
        for (var f = 0; f < g.length; f++) {
            if (c == g[f]) return c;
            if (c > g[f]) d = g[f];
        }
        var h = b.researches();
        if (!(h && h.attributes && h.attributes.booty)) c = d;
        return c;
    };
    (function() {
        a.farm.autoCave = function(b) {
            var c = 0,
                d = a.custom.get(b.id),
                e = 0,
                f = 0,
                g = b.buildings().get("hide"),
                h, i;
            if (g < 1) return;
            h = d.autocave === "global" ? a.sett.farm_autocave : d.autocave;
            if (h === "disabled") {
                a.farm.log("info", "(Auto-Cave) [town]{0}[/town]: Disabled", b.id);
                return;
            }
            h = Math.round(parseInt(h, 10) * b.getStorage() / 100);
            if (h > b.resources().iron) {
                a.farm.log("debug", "(Auto-Cave) [town]{0}[/town]: Ignore, not enough Silver in warehouse", b.id);
                return;
            }
            i = d.autocave_amount === "global" ? a.sett.farm_autocave_amount : d.autocave_amount;
            i = Math.round(parseInt(i, 10) * b.getStorage() / 100);
            i = Math.min(i, b.resources().iron);
            var j = b.getEspionageStorage(),
                k = (g == GameData.buildings.hide.max_level) ? -1 : g * 1000;
            if (k != -1 && j >= k) {
                a.farm.log("debug", "(Auto-Cave) [town]{0}[/town]: Ignore, hide is full", b.id);
                return;
            }
            var f = i,
                l = k != -1 ? Math.min(f, k - j) : f;
            c = a.scheduleTimeout(0, (Math.random() * 3 + 4) * 1E3, "farm");
            a.farm.timers["autocave_" + b.id] = setTimeout(function() {
                var c = Math.min(l, b.resources().iron);
                if (c > 0) {
                    var d = {
                        success: function(d) {
                            a.farm.log("info", "(Auto-Cave) [town]{0}[/town]: {1} ({2})", b.id, d.success, c).msg();
                        },
                        error: function(d) {
                            a.failRequests++;
                            a.farm.log("error", "(Auto-Cave) [town]{0}[/town]: {1} ({2})", b.id, d.error, c).msg().send();
                        }
                    };
                    if (b.hasConqueror()) return;
                    if (a.filters.checkModule("farm")) a.runAtTown(b.id, function() {
                        a.models.hide.execute("storeIron", {
                            iron_to_store: c
                        }, d);
                    });
                }
            }, c);
        };
    }());
    (function() {
        a.farm.autoMarket = function(b) {
            if (!GameModels.CreateOffers) return;
            if (b.buildings().get("market") < 5) return;
            var c = a.custom.get(b.id);
            if (c.automarket == "disabled") return;
            var d = [];
            if (a.sett.farm_fmarket_wood) d.push("wood");
            if (a.sett.farm_fmarket_stone) d.push("stone");
            if (a.sett.farm_fmarket_iron) d.push("iron");
            if (d.length < 1) return;
            var e = [],
                f = b.resources();
            angular.forEach(d, function(a) {
                var b = a,
                    c = a;
                if (f[a] < f.storage) return;
                c = ["wood", "stone", "iron"].reduce(function(a, b) {
                    return b != c ? b : a;
                }, "wood");
                if (c != b) e.push({
                    "offer_type": b,
                    "demand_type": c
                });
            });
            if (e.length < 1) return;
            angular.forEach(e, function(c) {
                var d = a.scheduleTimeout(0, (Math.random() * 3 + 4) * 1E3, "farm");
                a.farm.timers["market_" + b.id + "_" + c.offer] = setTimeout(function() {
                    var d = b.resources();
                    if (d[c.offer_type] < d.storage) return;
                    var e = b.getAvailableTradeCapacity();
                    if (e < 1) return;
                    var f = Math.round(d[c.offer_type] * (Math.random() * 0.2 + 0.1) / 100) * 100;
                    c.offer = Math.min(e, f);
                    c.demand = c.offer + Math.round(c.offer * (Math.random() * 0.3 + 0.1) / 100) * 100;
                    c.max_delivery_time = a.randomInt(1, 5);
                    c.visibility = "all";
                    if (c.offer < 100) return;
                    var g = {
                        success: function(d) {
                            a.farm.log("info", "(Auto-Marketplace) [town]{0}[/town]: Create offer {1}:{2} -> {3}:{4} ({5})", b.id, c.offer_type, c.offer, c.demand_type, c.demand, d.success).msg();
                        },
                        error: function(b) {
                            a.farm.log("error", "(Auto-Marketplace) {0}", b.error).msg(0).send();
                        }
                    };
                    var f = new GameModels.CreateOffers();
                    if (a.filters.checkModule("farm")) a.runAtTown(b.id, function() {
                        f.execute("createOffer", c, g);
                    });
                }, d);
            });
        };
    }());
    (function() {
        a.farm.autoCulture = function(c) {
            var d = a.custom.get(c.id);
            if (d.autoculture === "disabled" || (a.sett.farm_isautofestival === false && d.autoculture !== "enabled")) {
                b("debug", "auto-culture: disabled");
                return;
            }
            var e = a.towns[c.id].lastCulture,
                f = c.resources();
            if (!e || Timestamp.server() - e > 120 * 60 || (c.buildings().get("academy") >= 30 && f.wood >= 15000 && f.stone >= 18000 && f.iron >= 15000)) {
                var g = a.scheduleTimeout(0, (Math.random() * 3 + 4) * 1E3, "farm");
                a.towns[c.id].lastCulture = Timestamp.server();
                a.farm.timers["culture_" + c.id] = setTimeout(function() {
                    b("debug", "auto-culture: start detection");
                    a.ajaxRequestGet("building_place", "culture", {
                        town_id: c.id
                    }, function(d, e) {
                        var f = /<div class="btn_city_festival button_new" data-enabled="1"><\/div>/g.exec(e.html);
                        if (f) {
                            b("debug", "auto-culture: start city fesvival");
                            a.ajaxRequestPost("building_place", "start_celebration", {
                                town_id: c.id,
                                celebration_type: "party"
                            }, function(a, d) {
                                b("info", "(Auto-Culture) [town]{0}[/town]: City festival", c.id).msg();
                            }, "farm");
                        } else b("debug", "auto-culture: city festival not found");
                        var f = /<div class="btn_victory_procession button_new" data-enabled="1"><\/div>/g.exec(e.html);
                        if (f && false) {
                            b("debug", "auto-culture: start victory procession");
                            a.ajaxRequestPost("building_place", "start_celebration", {
                                town_id: c.id,
                                celebration_type: "triumph"
                            }, function(a, d) {
                                b("info", "(Auto-Culture) [town]{0}[/town]: Victory procession", c.id).msg();
                            }, "farm");
                        } else b("debug", "auto-culture: victory procession not found");
                    }, "farm");
                }, g);
            } else b("debug", "auto-culture: not enough resources/academy/interval");
        };
    }());
    (function() {
           
        var m = function() {
            if (d.hasConqueror()) return;
            a.ajaxRequestGet("island_info", "index", {
                island_id: a.towns[d.id].island,
                town_id: d.id
            }, function(c, f) {
                var h = a.farm.checkStorageFull(d, e);
                if (h !== -1) {
                    b("info", "(Farm) [town]{0}[/town]: Storage is full ({1})", d.id, e[h]).msg();
                    return;
                }
                var i = Timestamp.server(),
                    k = [],
                    l = [];
                angular.forEach(f.json.farm_town_list, function(b) {
                    if (b.rel != 1) return;
                    if (b.loot > i) return;
                    if (a.villages[b.id] && a.villages[b.id].blockFarm > i) return;
                    k.push(b.id);
                    l.push(b.name);
                });
                if (k.length < 1) {
                    b("debug", "(Farm) [town]{0}[/town]: No villages to farm", d.id);
                    return;
                }
                var m = {
                    farm_town_ids: k,
                    time_option: g,
                    claim_factor: j(d) ? "double" : "normal",
                    current_town_id: d.id
                };
                a.ajaxRequestPost("farm_town_overviews", "claim_loads", m, {
                    success: function(a, c) {
                        b("info", "(Farm) [town]{0}[/town]: {1} (force loyalty: {2})", d.id, c.success, m.claim_factor).msg();
                    },
                    error: function(c, e) {
                        var f = Timestamp.server() + 1 * 60 * 60;
                        angular.forEach(k, function(b) {
                            var c = a.villages[b];
                            if (!c) return;
                            c.blockFarm = f;
                        });
                        b("error", "(Farm) [town]{0}[/town]: Block farm in village(s) [{1}] until {2} ({3})", d.id, l.join(", "), a.timestampToLocalString(f), e.error).msg().send();
                    }
                }, "farm");
            });
        }; a.farm.timers["town_" + d.id] = setTimeout(m, l);
    };
    var l = function(c, d, g) {
        var h = Timestamp.server(),
            i = Math.max(c.loot - h, 0) + 1,
            k = new Date().getTime() + i * 1E3;
        i = a.scheduleTimeout(k, f + a.rand() + (a.sett.fast_farm === true ? 0 : 4000), "farm");
        a.farm.timers["village_" + c.id] = setTimeout(function() {
            var f = a.farm.checkStorageFull(d, e);
            if (f !== -1) {
                b("info", "(Farm) [town]{0}[/town]: Storage is full ({1})", d.id, e[f]).msg();
                return;
            }
            a.ajaxRequestGet("farm_town_info", "claim_info", {
                id: c.id,
                town_id: d.id
            }, function(e, f) {
                var h = (a.sett.fast_farm === true ? a.randomInt(300, 1500) : a.randomInt(1800, 3500));
                setTimeout(function() {
                    if (f.json && f.json.lootable_at > f.json.time_now) return;
                    var e = {
                        target_id: c.id,
                        claim_type: j(d) ? "double" : "normal",
                        time: g,
                        town_id: d.id
                    };
                    a.ajaxRequestPost("farm_town_info", "claim_load", e, {
                        success: function(a, e) {
                            b("info", "(Farm) [town]{0}[/town]: {1} ({2})", d.id, e.success, c.name).msg();
                        },
                        error: function() {
                            c.blockFarm = Timestamp.server() + 1 * 60 * 60;
                            b("info", "(Farm) [town]{0}[/town]: Block farm in village {1} until {2}", d.id, c.name, a.timestampToLocalString(c.blockFarm)).msg().send();
                        }
                    }, "farm");
                }, h);
            });
        }, i);
    };
    var m = function(c, d) {
        if (c.hasConqueror()) {
            b("debug", "Town under siege", c.name);
            return;
        };
        a.farm.postActions.push({
            townId: c.id,
            f: a.farm.autoCulture,
            params: [c]
        });
        a.farm.postActions.push({
            townId: c.id,
            f: a.farm.autoCave,
            params: [c]
        });
        a.farm.postActions.push({
            townId: c.id,
            f: a.farm.autoMarket,
            params: [c]
        });
        a.ajaxRequestGet("island_info", "index", {
            island_id: a.towns[c.id].island,
            town_id: c.id
        }, function(e, f) {
            var g = Timestamp.server();
            var h = [];
            angular.forEach(f.json.farm_town_list, function(b) {
                if (b.rel != 1) return;
                var c = a.villages[b.id];
                if (!c) c = a.villages[b.id] = {
                    id: b.id,
                    name: b.name,
                    blockFarm: 0
                };
                c.loot = b.loot;
                c.stage = b.stage;
                c.ratio = b.ratio;
                c.mood = b.mood;
                h.push(c);
            });
            if (Game.features.battlepoint_villages !== true) a.farm.postActions.push({
                townId: c.id,
                f: a.farm.autoVillage,
                params: [c, h]
            });
            h = h.filter(function(a) {
                return Timestamp.server() > a.blockFarm && a.loot < Timestamp.server() + 10 * 60;
            });
            if (h.length < 1) {
                b("debug", "(Farm) [town]{0}[/town]: No villages to farm", c.id);
                return;
            }
            h = h.filter(function(b) {
                if (a.farm.townVillages[b.id]) return false;
                else a.farm.townVillages[b.id] = c;
                return true;
            });
            if (h.length < 1) {
                b("info", "(Farm) [town]{0}[/town]: Two or more cities on one island, ignoring", c.id).msg();
                return;
            }
            if (f.json.captain === true) k(h, c, d);
            else {
                if (!a.farm.captainCheck) {
                    a.logger.info("Farm-Bot: Attention! You are playing the game without premium Captain. This considerably increases the risk of the ban!").msg(60);
                    a.farm.captainCheck = true;
                }
                for (var i = 0; i < h.length; i++) l(h[i], c, d);
            }
        }, "na");
    };
    angular.forEach(ITowns.getTowns(), function(c) {
        if (c.hasConqueror()) return;
        if (!(a.towns[c.id] && a.towns[c.id].island)) {
            var d = a.models.Town[c.id];
            a.towns[c.id] = {
                id: c.id,
                island: d.get("island_id"),
                x: c.getIslandCoordinateX(),
                y: c.getIslandCoordinateY(),
                name: c.name
            };
        }
        if (!a.towns[c.id].island) {
            b("error", "(Farm) [town]{0}[/town]: Invalid island", c.id);
            return;
        }
        var e = h(c);
        if (e == "disabled" || !(e > 0)) {
            b("debug", "Farm disabled for [town]{0}[/town]", c.id);
            return;
        }
        var f = a.scheduleTimeout(0, 2000 + a.rand(), "farm");
        a.farm.timers["farm_town_" + c.id] = setTimeout(function() {
            m(c, e);
        }, f);
    });
}());