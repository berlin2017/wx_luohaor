var t = getApp(), e = t.requirejs("core");

Page({
    data: {
        route: "shop_coupon",
        menu: t.tabBar,
        menu_show: !1,
        show: !1,
        loaded: !1,
        display: !1,
        list: [],
        page: 1
    },
    menu_url: function(t) {
        e.menu_url(t, 2);
    },
    onLoad: function(e) {
        null != e && null != e && this.setData({
            tabbar_index: e.tabbar_index ? e.tabbar_index : -1
        }), this.getList();
    },
    getList: function() {
        var n = this;
        e.get("Market/BusCoupon", {
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
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            list: [],
            loaded: !1
        }), this.getList(), wx.stopPullDownRefresh();
    },
    getCoupon: function(t) {
        var a = this, n = e.pdata(t);
        e.get("Market/GetCoupon", {
            coupon_id: n.id,
            end_time: n.endtime,
            user_id: getApp().getCache("userinfo").uid
        }, function(t) {
            0 == t.code ? e.alert("领券成功", function() {
                a.setData({
                    page: 1,
                    list: []
                }), a.getList();
            }) : e.alert(t.msg);
        });
    },
    onShareAppMessage: function() {}
});