var t = getApp(), e = t.requirejs("core");

Page({
    data: {
        route: "member_coupon",
        menu: t.tabBar,
        menu_show: !1,
        now_time: Date.parse(new Date()) / 1e3,
        show: !1,
        loaded: !1,
        list: [],
        page: 1
    },
    menu_url: function(t) {
        e.menu_url(t, 2);
    },
    onLoad: function(t) {
        null != t && null != t && this.setData({
            tabbar_index: t.tabbar_index ? t.tabbar_index : -1
        }), e.setting(), this.setData({
            menu: getApp().tabBar
        }), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        }), this.getList();
    },
    getList: function() {
        var n = this;
        e.get("Market/UserCoupon", {
            page: n.data.page,
            user_id: getApp().getCache("userinfo").uid
        }, function(t) {
            if (console.log(t), 0 == t.code) {
                var a = {
                    show: !0
                };
                0 < t.info.length && (a.page = n.data.page + 1, a.list = n.data.list.concat(t.info), 
                t.info.length < 10 && (a.loaded = !0)), 0 == t.info.length && (a.loaded = !0), n.setData(a);
            } else e.alert(t.msg);
        }, !0);
    },
    onReachBottom: function() {
        this.data.loaded || this.getList();
    },
    url: function() {
        var a = "/yb_mingpian/pages/caregory/index";
        wx.navigateTo({
            url: a,
            fail: function(t) {
                0 <= t.errMsg.indexOf("tabbar") && e.jump(a, 4);
            }
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            list: [],
            loaded: !1
        }), this.getList(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {}
});