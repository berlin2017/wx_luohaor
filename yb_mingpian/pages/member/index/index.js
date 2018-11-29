var e = getApp(), r = e.requirejs("core");

Page({
    data: {
        route: "member_index",
        menu: e.tabBar,
        menu_show: !1,
        icons: e.requirejs("icons"),
        member: {},
        show: !1,
        background: e.config.background
    },
    menu_url: function(e) {
        r.menu_url(e, 2);
    },
    onLoad: function(n) {
        null != n && null != n && this.setData({
            tabbar_index: n.tabbar_index ? n.tabbar_index : -1
        }), "" == e.getCache("userinfo") && (r.toast("您还没登录呢"), setTimeout(function() {
            wx.redirectTo({
                url: "/yb_mingpian/pages/index/index"
            });
        }, 2e3));
        var t = this;
        r.get("Distribe/shareSetting", {}, function(e) {
            0 == e.code && t.setData({
                shareSetting: e.info
            });
        }), t.get_candan();
    },
    get_candan: function() {
        var n = this;
        r.get("Index/ucenter", {}, function(e) {
            n.setData({
                list: e.all_data,
                show: !0
            }), n.getInfo();
        }, !0);
    },
    onPullDownRefresh: function() {},
    getInfo: function() {
        var n = this;
        n.setData({
            background: getApp().config.background,
            font_color: getApp().config.font_color
        }), r.get("user/Index", {
            uid: getApp().getCache("userinfo").uid
        }, function(e) {
            console.log(e), e.info.nickName = getApp().getCache("userinfo").nickName, e.info.avatarUrl = getApp().getCache("userinfo").avatarUrl, 
            console.log(e), n.setData({
                member: e.info
            });
        });
    },
    fail: function() {
        wx.redirectTo({
            url: "/yb_mingpian/pages/message/auth/index"
        });
    },
    onShow: function() {
        this.getInfo();
    },
    relogin: function() {
        var t = this;
        wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] || wx.openSetting({
                    success: function(n) {
                        n.authSetting["scope.userInfo"] && (e.getUserInfo(), setTimeout(function() {
                            t.getInfo();
                        }, 1e3));
                    }
                });
            }
        });
    }
});