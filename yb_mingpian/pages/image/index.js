var t = getApp(), c = t.requirejs("api/index"), a = t.requirejs("core");

Page({
    data: {
        route: "image",
        menu: t.tabBar,
        menu_show: !1,
        loaded: !1,
        show: !1,
        list: [],
        page: 1
    },
    menu_url: function(t) {
        a.menu_url(t, 2);
    },
    onLoad: function(t) {
        null != t && null != t && this.setData({
            tabbar_index: t.tabbar_index ? t.tabbar_index : -1
        }), a.setting(), console.log(t), this.setData({
            menu: getApp().tabBar
        }), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        }), t.id ? (this.setData({
            group_id: t.id
        }), this.getlist()) : a.error("未获取相册类别");
    },
    getlist: function() {
        var a = this, t = a.data.group_id, e = a.data.page;
        c.ImageInfo("", e, t, a, function(t) {
            a.setData(t);
        });
    },
    previewImage: function(t) {
        var e = [];
        this.data.list.forEach(function(t, a) {
            e[a] = t.img_cover;
        }), wx.previewImage({
            current: a.pdata(t).url,
            urls: e
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            list: [],
            page: 1,
            loaded: !1
        }), this.getlist(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("加载更多"), this.data.loaded || this.getlist();
    },
    onShow: function() {},
    onShareAppMessage: function() {}
});