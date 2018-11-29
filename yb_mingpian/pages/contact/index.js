var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        route: "contact",
        menu: t.tabBar,
        menu_show: !1,
        info: [],
        show: !1,
        config: t.config
    },
    menu_url: function(t) {
        a.menu_url(t, 2);
    },
    onLoad: function(t) {
        null != t && null != t && this.setData({
            tabbar_index: t.tabbar_index ? t.tabbar_index : -1
        }), a.setting(), this.setData({
            menu: getApp().tabBar,
            config: getApp().config
        }), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        }), this.getinfo();
    },
    getinfo: function() {
        var n = this;
        a.get("user/About", {
            user_id: 0
        }, function(t) {
            0 == t.code ? n.setData({
                info: t.info,
                show: !0
            }) : a.alert(t.msg);
        }, !0);
    },
    onReady: function() {},
    onShow: function() {},
    navigate: function() {
        var t = this.data.info;
        t.name && t.lat && t.lng && a.tx_map(t.lat, t.lng, t.name);
    },
    calling: function(t) {
        a.phone(t);
    },
    onPullDownRefresh: function() {
        this.getinfo(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        a.onShareAppMessage("pages/contact/index", "联系我们");
    }
});