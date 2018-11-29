var t = getApp(), s = t.requirejs("wxParse/wxParse"), e = t.requirejs("core");

Page({
    data: {
        route: "member_about",
        menu: t.tabBar,
        menu_show: !1,
        icons: t.requirejs("icons")
    },
    menu_url: function(t) {
        e.menu_url(t, 2);
    },
    calling: function(t) {
        e.phone(t);
    },
    onLoad: function(t) {
        null != t && null != t && this.setData({
            tabbar_index: t.tabbar_index ? t.tabbar_index : -1
        }), e.setting(), this.setData({
            menu: getApp().tabBar
        }), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        }), this.About();
    },
    onPullDownRefresh: function() {
        this.About(), wx.stopPullDownRefresh();
    },
    About: function() {
        var a = this;
        e.get("User/About", {
            user_id: 0
        }, function(t) {
            console.log(t), 0 == t.code ? (t.info.desc && s.wxParse("wxParseData", "html", t.info.desc, a, "0"), 
            a.setData({
                info: t.info,
                show: !0
            })) : e.alert(t.msg);
        });
    },
    navigate: function() {
        var t = this.data.info;
        t.name && t.lat && t.lng ? e.tx_map(t.lat, t.lng, t.name) : e.toast("不能获取到该位置");
    }
});