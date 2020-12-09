! function(e) {
    var t = {};

    function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }
    r.m = e, r.c = t, r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 20)
}({
    2: function(e, t, r) {
        "use strict";
        var n = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(t, r, n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.url = t, this.user = r, this.password = n
            }
            return n(e, [{
                key: "call",
                value: function(e, t) {
                    var r = {
                        jsonrpc: "2.0",
                        id: "1",
                        auth: this.auth,
                        method: e,
                        params: t
                    };
                    return this._postJsonRpc(this.url, JSON.stringify(r)).then(function(e) {
                        return JSON.parse(e)
                    })
                }
            }, {
                key: "login",
                value: function() {
                    var e = this,
                        t = {
                            user: this.user,
                            password: this.password
                        };
                    return this.call("user.login", t).then(function(t) {
                        if (e.auth = t.result, void 0 === e.auth) throw new Error(JSON.stringify(t.error));
                        return t
                    })
                }
            }, {
                key: "logout",
                value: function() {
                    var e = this;
                    return this.call("user.logout", null).then(function(t) {
                        if (!0 !== t.result) throw new Error(JSON.stringify(t.error));
                        return e.auth = void 0, t
                    })
                }
            }, {
                key: "_postJsonRpc",
                value: function(e, t) {
                    return new Promise(function(r, n) {
                        var o = new XMLHttpRequest;
                        o.open("POST", e), o.setRequestHeader("Content-Type", "application/json-rpc"), o.send(t), o.onload = function() {
                            this.status >= 200 && this.status < 300 ? r(this.response) : n("HTTP status " + this.statusText + " was returned.")
                        }, o.onerror = function() {
                            n("XMLHTTP request error occurred.")
                        }
                    })
                }
            }]), e
        }();
        t.default = o
    },
    20: function(e, t, r) {
        "use strict";
        var n, o = r(2),
            s = (n = o) && n.__esModule ? n : {
                default: n
            };

        function i(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }
        r(3);
        var a = a || chrome,
            u = null,
            c = 60,
            l = {},
            g = {};

        function f() {
            cryptio.get("ZabbixServers", function(e, t) {
                if (e && (u = {}), (u = t) && u.servers)
                    for (var r = 0; r < u.servers.length; r++) null == u.servers[r].pagination && (u.servers[r].pagination = {
                        sortBy: "priority",
                        descending: !0,
                        rowsPerPage: -1
                    });
                u && null != u.global || ((u = {}).global = {}), null == u.global.notify && (u.global.notify = !0), null == u.global.sound && (u.global.sound = !1), null == u.global.displayName && (u.global.displayName = "host")
            });
            try {
                c = u.global.interval
            } catch (e) {
                c = 60
            }
            d()
        }

        function d() {
            var e = 0;
            if (u && 0 !== u.length && u.servers && 0 != u.servers.length) {
                var t = [],
                    r = 0;
                ! function n() {
                    if (r < u.servers.length) {
                        var o = u.servers[r].alias,
                            c = u.servers[r].url,
                            f = u.servers[r].user,
                            d = u.servers[r].pass,
                            p = u.servers[r].hostGroups,
                            v = u.servers[r].hide,
                            h = u.servers[r].maintenance,
                            y = u.servers[r].minSeverity;
                        t.push(o), console.log("Found server: " + o),
                            function(e, t, r, n, o, u, c, l) {
                                var f;
                                delete g.error, delete g.errorMessage;
                                var d = (i(f = {
                                    output: "extend",
                                    expandDescription: 1,
                                    skipDependent: 1,
                                    selectHosts: ["host", "name", "hostid", "maintenance_status"],
                                    selectLastEvent: ["eventid", "acknowledged"],
                                    monitored: 1,
                                    min_severity: c,
                                    active: 1,
                                    filter: {
                                        value: 1,
                                        status: 0
                                    }
                                }, "output", ["triggerid", "description", "priority", "lastchange"]), i(f, "sortfield", "priority"), i(f, "sortorder", "DESC"), f);
                                o && (d.withLastEventUnacknowledged = 1), u && (d.maintenance = !1);
                                var p = new s.default(e + "/api_jsonrpc.php", t, r);
                                n.length > 0 && (d.groupids = n), p.login().then(function() {
                                    return p.call("trigger.get", d)
                                }).then(function(e) {
                                    l(e.result)
                                }).catch(function(t) {
                                    var r = "Error communicating with: " + e.toString();
                                    console.log(r), g.servers = [], g.error = !0, g.errorMessage = r, a.browserAction.setBadgeText({
                                        text: ""
                                    }), a.browserAction.setIcon({
                                        path: "images/unconfigured.png"
                                    })
                                })
                            }(c, f, d, p, v, h, y, function(t) {
                                var r, s = l[o] || [],
                                    i = t.filter(function(e) {
                                        return !s.some(function(t) {
                                            return e.triggerid == t.triggerid
                                        })
                                    });
                                if (u.global.notify) {
                                    var c = !0,
                                        g = !1,
                                        f = void 0;
                                    try {
                                        for (var d, p = i[Symbol.iterator](); !(c = (d = p.next()).done); c = !0) {
                                            var v = d.value;
                                            r = v, a.notifications.create("notification", {
                                                type: "basic",
                                                title: r.hosts[0][u.global.displayName],
                                                message: r.description,
                                                iconUrl: "images/sev_" + r.priority + ".png"
                                            }, function() {
                                                setTimeout(function() {
                                                    a.notifications.clear("notification", function() {})
                                                }, 5e3)
                                            })
                                        }
                                    } catch (e) {
                                        g = !0, f = e
                                    } finally {
                                        try {
                                            !c && p.return && p.return()
                                        } finally {
                                            if (g) throw f
                                        }
                                    }
                                }
                                i && i.length && u.global.sound && new Audio(chrome.runtime.getURL("sounds/drip.mp3")).play(), l[o] = t, e += l[o].length, n()
                            })
                    } else {
                        for (var m in l) t.includes(m) || (console.log("Removing old results for: " + m), delete l[m]);
                        e > 0 ? (a.browserAction.setBadgeBackgroundColor({
                                color: "#888888"
                            }), a.browserAction.setBadgeText({
                                text: e.toString()
                            })) : a.browserAction.setBadgeText({
                                text: ""
                            }),
                            function() {
                                var e, t = -1,
                                    r = [{
                                        text: a.i18n.getMessage("headerSystem"),
                                        value: "system"
                                    }, {
                                        text: a.i18n.getMessage("headerDescription"),
                                        value: "description"
                                    }, {
                                        text: a.i18n.getMessage("headerPriority"),
                                        value: "priority"
                                    }, {
                                        text: a.i18n.getMessage("headerAge"),
                                        value: "age"
                                    }];
                                if (0 === Object.keys(l).length && l.constructor === Object) console.log("No current triggers or servers");
                                else {
                                    g.servers = [], g.headers = r, g.loaded = !1;
                                    for (var n = Object.keys(l), o = 0; o < n.length; o++) {
                                        var s = {},
                                            i = [],
                                            c = n[o];
                                        console.log("Generating trigger table for server: " + JSON.stringify(c));
                                        for (var f = 0; f < l[c].length; f++) {
                                            var d = l[c][f].hosts[0][u.global.displayName],
                                                p = l[c][f].description,
                                                v = l[c][f].priority;
                                            v > t && (t = v);
                                            var h = l[c][f].lastchange,
                                                y = l[c][f].triggerid,
                                                m = l[c][f].hosts[0].hostid,
                                                b = l[c][f].lastEvent.eventid,
                                                w = Number(l[c][f].lastEvent.acknowledged),
                                                S = Number(l[c][f].hosts[0].maintenance_status);
                                            i.push({
                                                system: d,
                                                description: p,
                                                priority: v,
                                                age: h,
                                                triggerid: y,
                                                hostid: m,
                                                eventid: b,
                                                acknowledged: w,
                                                maintenance_status: S
                                            })
                                        }
                                        s.triggers = i, s.server = c, s.search = "";
                                        for (var x = "", O = {}, k = 0; k < u.servers.length; k++) u.servers[k].alias === c && (x = u.servers[k].url, O = u.servers[o].pagination);
                                        s.url = x, s.pagination = O, g.servers.push(s)
                                    }
                                    e = t, a.browserAction.setIcon({
                                        path: "images/sev_" + e + ".png"
                                    })
                                }
                            }()
                    }
                    r++
                }()
            } else l = {}, console.log("No servers defined.")
        }
        document.addEventListener("DOMContentLoaded", function() {
            f(),
                function e() {
                    d(), setTimeout(function() {
                        e()
                    }, 1e3 * c)
                }()
        }), a.runtime.onMessage.addListener(function(e, t, r) {
            switch (e.method) {
                case "refreshTriggers":
                    r(g);
                    break;
                case "reinitalize":
                    f();
                    break;
                case "submitPagination":
                    var n = !1;
                    u.servers[e.index].pagination.sortBy != e.sortBy && (u.servers[e.index].pagination.sortBy = e.sortBy, n = !0), u.servers[e.index].pagination.descending != e.descending && (u.servers[e.index].pagination.descending = e.descending, n = !0), n && cryptio.set("ZabbixServers", u, function(e, t) {
                        if (e) throw e
                    })
            }
            return !0
        })
    },
    3: function(e, t, r) {
        "use strict";
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        ! function(e, t) {
            var r = r || function() {
                var t = {
                        passphrase: "",
                        storage: "local"
                    },
                    o = o || {
                        init: function(e) {
                            e.passphrase = e.passphrase || i.key(e.passphrase) || i.key()
                        }
                    },
                    s = s || {
                        quota: function(e) {
                            return (/local|session/.test(e) ? 5248e3 : 4096) - a.total(e) > 0
                        },
                        set: function(e, t, r, n) {
                            if (s.quota(e.storage) || n("Browser storage quota has been exceeded."), e.passphrase) try {
                                r = sjcl.encrypt(e.passphrase, s.fromJSON(r))
                            } catch (e) {
                                return n(e)
                            }(this[e.storage] ? this[e.storage].set(t, r) : this.local.set(t, r)) ? n(null, "Successfully set data") : n("Error occured saving data")
                        },
                        get: function(e, t, r) {
                            var n = !1;
                            n = this[e.storage] ? this[e.storage].get(t) : this.local.get(t);
                            try {
                                n = sjcl.decrypt(e.passphrase, n)
                            } catch (e) {
                                r(e)
                            }(n = s.toJSON(n)) ? r(null, n): r("Error occured retrieving storage data")
                        },
                        fromJSON: function(e) {
                            var t;
                            try {
                                t = JSON.stringify(e)
                            } catch (r) {
                                t = e
                            }
                            return t
                        },
                        toJSON: function(e) {
                            var t;
                            try {
                                t = JSON.parse(e)
                            } catch (r) {
                                t = e
                            }
                            return t
                        },
                        cookie: {
                            set: function(e, t) {
                                var r = new Date;
                                return r.setTime(r.getTime() + 2592e6), document.cookie = e + "=" + t + ";expires=" + r.toGMTString() + ";path=/;domain=" + this.domain(), !0
                            },
                            get: function(e) {
                                var t, r, n, o = document.cookie.split(";");
                                for (t = 0; t < o.length; t++)
                                    if (r = o[t].substr(0, o[t].indexOf("=")), n = o[t].substr(o[t].indexOf("=") + 1), (r = r.replace(/^\s+|\s+$/g, "")) == e) return unescape(n);
                                return !1
                            },
                            domain: function() {
                                return location.hostname
                            }
                        },
                        local: {
                            set: function(t, r) {
                                try {
                                    return e.localStorage.setItem(t, r), !0
                                } catch (e) {
                                    return !1
                                }
                            },
                            get: function(t) {
                                return e.localStorage.getItem(t)
                            }
                        },
                        session: {
                            set: function(t, r) {
                                try {
                                    return e.sessionStorage.setItem(t, r), !0
                                } catch (e) {
                                    return !1
                                }
                            },
                            get: function(t) {
                                return e.sessionStorage.getItem(t)
                            }
                        }
                    },
                    i = i || {
                        key: function(e) {
                            e = e || this.muid();
                            var t = i.salt(e);
                            return sjcl.codec.hex.fromBits(sjcl.misc.pbkdf2(e, t))
                        },
                        muid: function() {
                            return e.navigator.appName + e.navigator.language + e.navigator.platform
                        },
                        salt: function(t) {
                            return sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(e.navigator.appName))
                        }
                    },
                    a = a || {
                        total: function(t) {
                            var r = "",
                                n = e.storage + "Storage";
                            for (var o in n) n.hasOwnProperty(o) && (r += n[o]);
                            return r ? 3 + 16 * r.length / 8192 : 0
                        },
                        size: function(e) {
                            var t = 0;
                            if (/object/.test(void 0 === e ? "undefined" : n(e)))
                                for (var r in e) e.hasOwnProperty(e[r]) && t++;
                            else /array/.test(void 0 === e ? "undefined" : n(e)) && (t = e.length);
                            return t
                        },
                        merge: function(e, t) {
                            for (var r in e = e || {}) e.hasOwnProperty(r) && (t[r] = /object/.test(n(e[r])) ? this.merge(t[r], e[r]) : e[r]), t[r] = e[r];
                            return t
                        }
                    };
                r.prototype.get = function(e, r, n) {
                    void 0 == n && (n = r, r = e, e = {});
                    var i = a.merge(e, t);
                    o.init(i), s.get(i, r, n)
                }, r.prototype.set = function(e, r, n, i) {
                    void 0 == i && (i = n, n = r, r = e, e = {});
                    var u = a.merge(e, t);
                    o.init(u), s.set(u, r, n, i)
                }
            };
            e.cryptio = new r
        }(window)
    }
});