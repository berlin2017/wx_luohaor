var app = getApp(), a = app.requirejs("core"), info = app.getCache("userinfo"), s = app.requirejs("wxParse/wxParse");

module.exports = {
    BarIndex: function(o) {
        var e = {};
        a.get("Bargain/BarIndex", {}, function(n) {
            console.log(n), 0 == n.code ? (e.cate_info = n.info.cate_info, e.carousel = n.info.carousel, 
            "function" == typeof o && o(e)) : a.alert(n.msg);
        });
    },
    kj_list: function(n, o, e, i, t) {
        var r = {};
        a.get("Bargain/Bargain", {
            type: o,
            class_id: n,
            page: e
        }, function(n) {
            console.log(n), 0 == n.code ? (n.info.forEach(function(n) {
                var o = n.star_time - Date.parse(new Date()) / 1e3;
                n.goods_type = 0 < o ? 1 : 2, n.user_num = n.user.length;
            }), 0 < n.info.length && (r.page = e + 1, r.list = i.data.list.concat(n.info), n.info.length < 10 && (r.loaded = !0)), 
            0 == n.info.length && (r.loaded = !0), r.show = !0, t(r)) : a.alert(n.msg, function() {});
        }, !0);
    },
    kj_detail: function(n, o, e) {
        var i = {};
        a.get("Bargain/GoodsInfo", {
            id: n
        }, function(n) {
            console.log(n), 0 == n.code && null != n.info ? (s.wxParse("wxParseData", "html", n.info.bargain_info.activity_rules, o, "0"), 
            i.bargain_info = n.info.bargain_info, i.about_info = n.info.about_info, i.show = !0, 
            "function" == typeof e && e(i)) : a.alert(n.msg);
        }, !0);
    },
    kj_info: function(n, o, e, i) {
        var t = {};
        a.get("Bargain/BargainInfo", {
            id: n,
            user_id: o
        }, function(n) {
            0 == n.code && null != n.info ? (s.wxParse("wxParseData", "html", n.info.bargain_info.activity_rules, e, "0"), 
            t.bargain_info = n.info.bargain_info, t.bargain_info.cons_time = a.time_format(n.info.bargain_info.consumption_time), 
            t.user_info = n.info.user_info, t.show = !0, Date.parse(new Date()) / 1e3 > n.info.bargain_info.consumption_time ? t.overtime = 1 : t.overtime = 2, 
            wx.setNavigationBarTitle({
                title: n.info.bargain_info.bargain_name || "砍价详情"
            }), "function" == typeof i && i(t)) : (a.alert(n.msg), setTimeout(function() {
                wx.navigateBack();
            }, 1e3));
        }, !0);
    },
    BargainCreate: function(n, o, e) {
        a.get("Bargain/BargainCreate", {
            bargain_id: n,
            user_id: getApp().getCache("userinfo").uid
        }, function(n) {
            console.log(n), 0 == n.code ? n.popup = !0 : e || a.alert(n.msg), "function" == typeof o && o(n);
        });
    },
    BargainHelp: function(n, o, e) {
        a.get("Bargain/BargainHelp", {
            iInitiated_id: n,
            user_id: getApp().getCache("userinfo").uid,
            uid: o
        }, function(n) {
            0 == n.code ? (n.popup = !0, "function" == typeof e && e(n)) : a.alert(n.msg);
        });
    },
    BargainRecord: function(n, o) {
        var e = {};
        a.get("Bargain/BargainRecord", {
            iInitiated_id: n
        }, function(n) {
            0 == n.code ? (n.info.forEach(function(n) {
                n.create_time = a.time_format(n.create_time), n.user_id == getApp().getCache("userinfo").uid && (n.nick_name = "系统", 
                n.user_headimg = "/yb_mingpian/static/images/icon/kj_info.png");
            }), e.list = n.info, e.show = !0, "function" == typeof o && o(e)) : a.alert(n.msg);
        }, !0);
    },
    MyBargain: function(o, e, i) {
        var t = {};
        a.get("Bargain/MyBargain", {
            page: o,
            user_id: getApp().getCache("userinfo").uid
        }, function(n) {
            0 == n.code ? (n.info.forEach(function(n) {
                var o = Date.parse(new Date()) / 1e3;
                o > n.consumption_time ? n.overtime = 1 : n.overtime = 2, n.end_time > o ? n.goods_type = 1 : n.goods_type = 2, 
                n.current_price - n.lowest_price <= 0 ? n.kj_type = 1 : n.kj_type = 2;
            }), 0 < n.info.length && (t.page = o + 1, t.list = e.data.list.concat(n.info), n.info.length < 10 && (t.loaded = !0)), 
            0 == n.info.length && (t.loaded = !0), t.show = !0, "function" == typeof i && i(t)) : a.alert(n.msg);
        }, !0);
    },
    Countdown: function(n, c) {
        var g = {}, u = n - Date.parse(new Date()) / 1e3;
        u <= 0 && (g.show_time = !1, c(g));
        var s = setInterval(function() {
            var n = u, o = Math.floor(n / 3600 / 24), e = o.toString();
            1 == e.length && (e = "0" + e);
            var a = Math.floor((n - 3600 * o * 24) / 3600), i = a.toString();
            1 == i.length && (i = "0" + i);
            var t = Math.floor((n - 3600 * o * 24 - 3600 * a) / 60), r = t.toString();
            1 == r.length && (r = "0" + r);
            var f = (n - 3600 * o * 24 - 3600 * a - 60 * t).toString();
            1 == f.length && (f = "0" + f), g.countDownDay = e, g.countDownHour = i, g.countDownMinute = r, 
            g.countDownSecond = f, "function" == typeof c && c(g), --u < 0 && (clearInterval(s), 
            wx.showToast({
                title: "活动已结束"
            }), g.countDownDay = "0", g.countDownHour = "0", g.countDownMinute = "0", g.countDownSecond = "0", 
            g.show_time = !1, "function" == typeof c && c(g));
        }.bind(this), 1e3);
    },
    removeByValue: function(n, o, e) {
        for (var a = -1, i = 0; i < n.length; i++) if (console.log(n[i]), n[i] == o) {
            a = i;
            break;
        }
        n.splice(a, 1), "function" == typeof e && e(n);
    }
};