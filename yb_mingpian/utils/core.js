var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, t = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : _typeof(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof(t);
}, e = require("check");

module.exports = {
    toQueryPair: function(t, e) {
        return void 0 === e ? t : t + "=" + encodeURIComponent(null === e ? "" : String(e));
    },
    getUrl: function(n, o) {
        n = n.replace(/\//gi, "/");
        var i = getApp().globalData.api + "api/" + n;
        return o && ("object" == (void 0 === o ? "undefined" : t(o)) ? i += "?app_id=" + getApp().globalData.appid + "&" + e.param(o) : "string" == typeof o && (i += "&" + o)), 
        i;
    },
    json: function(t, n, o, i, a, r) {
        var u = getApp(), s = (u.getCache("userinfo"), u.requirejs("core"));
        i && s.loading();
        var c = {
            url: a ? this.getUrl(t) : this.getUrl(t, n),
            method: a ? "POST" : "GET",
            header: {
                "Content-type": a ? "application/x-www-form-urlencoded" : "application/json"
            }
        };
        a && (c.data = e.param(n)), o && (c.success = function(t) {
            if (i && s.hideLoading(), "request:ok" == t.errMsg) {
                if ("string" == typeof t.data && 0 <= t.data.indexOf("html") && 0 <= t.data.indexOf("head") && 0 <= t.data.indexOf("body")) return void s.error("服务器错误！");
                o(t.data);
            } else this.alert(t.errMsg);
        }), c.fail = function(t) {
            that.alert(t.errMsg);
        }, wx.request(c), console.log(c);
    },
    post: function(t, e, n, o) {
        var i = this, a = t.split("/");
        a = a[0] + "_" + a[1], o && i.loading(), getApp().util.request({
            url: "entry/wxapp/" + a,
            data: e,
            method: "POST",
            success: function(t) {
                if (o && i.hideLoading(), "request:ok" == t.errMsg) {
                    if ("string" == typeof t.data && 0 <= t.data.indexOf("html") && 0 <= t.data.indexOf("head") && 0 <= t.data.indexOf("body")) return void i.error("请求异常");
                    if ("" == t.data) return void i.error("请求异常！");
                    var e = t.data;
                    "string" == typeof e && (console.log(void 0 === e ? "undefined" : _typeof(e)), e = i.json_parse(e)), 
                    n(e);
                } else i.alert(t.errMsg);
            },
            fail: function(t) {
                i.alert(t.errMsg);
            }
        });
    },
    get: function(t, e, n, o) {
        var i = this, a = t.split("/");
        a = a[0] + "_" + a[1], o && i.loading(), getApp().util.request({
            url: "entry/wxapp/" + a,
            data: e,
            success: function(t) {
                if (o && i.hideLoading(), "request:ok" == t.errMsg) {
                    if ("string" == typeof t.data && 0 <= t.data.indexOf("html") && 0 <= t.data.indexOf("head") && 0 <= t.data.indexOf("body")) return void i.error("请求异常");
                    if ("" == t.data) return void console.log("请求异常！");
                    var e = t.data;
                    "string" == typeof e && (console.log(void 0 === e ? "undefined" : _typeof(e)), e = i.json_parse(e)), 
                    n(e);
                } else i.alert(t.errMsg);
            },
            fail: function(t) {
                o && i.hideLoading(), i.alert(t.errMsg);
            }
        });
    },
    alert: function(e, n) {
        "object" === (void 0 === e ? "undefined" : t(e)) && (e = JSON.stringify(e)), wx.showModal({
            title: "提示",
            content: e,
            showCancel: !1,
            success: function(t) {
                t.confirm && "function" == typeof n && n();
            }
        });
    },
    confirm: function(e, n, o) {
        "object" === (void 0 === e ? "undefined" : t(e)) && (e = JSON.stringify(e)), wx.showModal({
            title: "提示",
            content: e,
            showCancel: !0,
            success: function(t) {
                t.confirm ? "function" == typeof n && n() : "function" == typeof o && o();
            }
        });
    },
    loading: function(t) {
        void 0 !== t && "" != t || (t = "加载中"), wx.showToast({
            title: t,
            icon: "loading",
            duration: 5e6
        });
    },
    hideLoading: function() {
        wx.hideToast();
    },
    toast: function(t, e) {
        e || (e = "loading"), wx.showToast({
            title: t,
            icon: e,
            duration: 1e3
        });
    },
    warning: function(t) {
        wx.showToast({
            title: t,
            image: "/yb_mingpian/static/images/icon-warning.png",
            duration: 2e3
        });
    },
    error: function(t) {
        wx.showToast({
            title: t,
            icon: "success",
            image: "/yb_mingpian/static/images/x.png",
            duration: 2e3
        });
    },
    success: function(t) {
        wx.showToast({
            title: t,
            icon: "success",
            duration: 1e3
        });
    },
    pdata: function(t) {
        return t.currentTarget.dataset;
    },
    data: function(t) {
        return t.target.dataset;
    },
    phone: function(t) {
        var e = this.pdata(t).phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    time_format: function(t) {
        var e = new Date(1e3 * t);
        return e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate() + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds();
    },
    time_str: function(t) {
        return t = (t = t.substring(0, 19)).replace(/-/g, "/"), new Date(t).getTime() / 1e3;
    },
    Countdown: function(t, s) {
        var c = {}, l = t - Date.parse(new Date()) / 1e3;
        l <= 0 && (c.show_time = !1, s(c));
        var f = setInterval(function() {
            var t = l, e = Math.floor(t / 3600 / 24), n = e.toString();
            1 == n.length && (n = "0" + n);
            var o = Math.floor((t - 3600 * e * 24) / 3600), i = o.toString();
            1 == i.length && (i = "0" + i);
            var a = Math.floor((t - 3600 * e * 24 - 3600 * o) / 60), r = a.toString();
            1 == r.length && (r = "0" + r);
            var u = (t - 3600 * e * 24 - 3600 * o - 60 * a).toString();
            1 == u.length && (u = "0" + u), c.countDownDay = n, c.countDownHour = i, c.countDownMinute = r, 
            c.countDownSecond = u, "function" == typeof s && s(c), --l < 0 && (clearInterval(f), 
            wx.showToast({
                title: "活动已结束"
            }), c.countDownDay = "0", c.countDownHour = "0", c.countDownMinute = "0", c.countDownSecond = "0", 
            c.show_time = !1, "function" == typeof s && s(c));
        }.bind(this), 1e3);
    },
    json_parse: function(t) {
        var e = t;
        if ("object" != (void 0 === (e = e.replace(" ", "")) ? "undefined" : _typeof(e))) return e = e.replace(/\ufeff/g, ""), 
        JSON.parse(e);
    },
    str: function(t) {
        return JSON.stringify(t);
    },
    tx_map: function(e, n, o) {
        e = parseFloat(e), n = parseFloat(n);
        var t = this;
        getApp().getCache("map") ? wx.openLocation({
            latitude: e,
            longitude: n,
            scale: 28,
            name: o
        }) : wx.getLocation({
            type: "wgs84",
            success: function(t) {
                console.log(t), getApp().setCache("map", t, 1200);
                t.latitude, t.longitude;
                wx.openLocation({
                    latitude: e,
                    longitude: n,
                    scale: 28,
                    name: o
                });
            },
            fail: function() {
                t.alert("未授权位置信息");
            }
        });
    },
    previewImage: function(t, e, n) {
        var o = [];
        (e = JSON.parse(e)).forEach(function(t, e) {
            o[e] = t[n];
        }), wx.previewImage({
            current: t,
            urls: o
        });
    },
    Clipboard: function(t) {
        wx.setClipboardData({
            data: t,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {}
                });
            }
        });
    },
    jump: function(t, e) {
        1 == (e = e && "" != e ? e : 1) ? wx.navigateTo({
            url: t
        }) : 2 == e ? wx.redirectTo({
            url: t
        }) : 3 == e ? wx.reLaunch({
            url: t
        }) : 4 == e ? wx.switchTab({
            url: t
        }) : 5 == e && wx.navigateBack();
    },
    ReName: function(t) {
        wx.setNavigationBarTitle({
            title: t || ""
        });
    },
    removeByValue: function(t, e, n) {
        for (var o = -1, i = 0; i < t.length; i++) if (console.log(t[i]), t[i] == e) {
            o = i;
            break;
        }
        t.splice(o, 1), "function" == typeof n && n(t);
    },
    setting: function() {},
    menu_url: function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1, n = this, o = n.pdata(t), i = (t = o.key, 
        o.url ? o.url : ""), a = o.appid ? o.appid : "", r = o.path ? o.path : "", u = o.title ? o.title : "", s = o.phone ? o.phone : "", c = o.lat ? o.lat : "", l = o.lng ? o.lng : "";
        if (console.log(o), 1 == t) i && 0 < i.length && n.jump(i, e); else if (2 == t) wx.navigateToMiniProgram({
            appId: a,
            path: r,
            extraData: {
                foo: "bar"
            },
            envVersion: "release",
            success: function(t) {
                console.log("打开成功");
            },
            fail: function(t) {
                n.alert("请绑定小程序");
            }
        }); else if (3 == t) n.jump("/yb_mingpian/pages/web/index?url=" + escape(r) + "&name=" + u); else if (4 == t) s ? wx.makePhoneCall({
            phoneNumber: s
        }) : n.alert("电话不能为空"); else {
            if (5 != t) return;
            c && l ? n.tx_map(c, l, u) : n.alert("请完善位置信息");
        }
    }
};