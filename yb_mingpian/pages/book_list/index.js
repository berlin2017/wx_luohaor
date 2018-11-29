var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        route: "book_list",
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
        }), a.setting(), this.setData({
            menu: getApp().tabBar
        }), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        }), this.getlist();
    },
    to_url: function(t) {
        var e = this.data.list, i = a.pdata(t).index;
        a.jump("/yb_mingpian/pages/book_info/index?data=" + JSON.stringify(e[i]));
    },
    getlist: function() {
        var e = this;
        e.data.page;
        a.get("Market/booklist", {}, function(t) {
            0 == t.code ? e.setData({
                list: e.data.list.concat(t.info),
                show: !0
            }) : a.alert(t.msg);
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