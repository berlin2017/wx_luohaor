var t = getApp(), e = t.requirejs("api/index"), core = t.requirejs("core");

Page({
    data: {
        route: "find_info",
        menu: t.tabBar,
        menu_show: !1,
        show: !1
    },
    menu_url: function(t) {
        core.menu_url(t, 2);
    },
    onLoad: function(a) {
        null != a && null != a && this.setData({
            tabbar_index: a.tabbar_index ? a.tabbar_index : -1
        }), core.setting(), this.setData({
            menu: getApp().tabBar
        }), t.isInArray(getApp().tabBar.list, this.data.route) && this.setData({
            menu_show: !0
        }), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        });
        this.setData({
            id: a.id
        });
    },
    onShow: function() {
        var a = this, t = a.data.id;
        e.ArticleInfo("", t, a, function(t) {
            a.setData(t);
        });
    },
    onPullDownRefresh: function() {
        this.onShow(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {
        return {
            title: this.data.detail.title,
            path: "/yb_mingpian/pages/find_info/index?id=" + this.data.detail.article_id
        };
    }
});