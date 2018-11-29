var app = getApp(), a = app.requirejs("core"), b = app.requirejs("api/kjb");

Page({
    data: {
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        page: 1,
        kj_type: 1,
        show: !1,
        loaded: !1,
        list: [],
        route: "kanjia_index",
        menu: app.tabBar,
        menu_show: !1,
        config: app.config
    },
    menu_url: function(t) {
        a.menu_url(t, 2);
    },
    onLoad: function(t) {
        a.setting(), null != t && null != t && this.setData({
            tabbar_index: t.tabbar_index ? t.tabbar_index : -1
        }), this.setData({
            menu: getApp().tabBar
        }), wx.setNavigationBarTitle({
            title: getApp().tabBar.name ? decodeURIComponent(getApp().tabBar.name) : "砍价首页"
        }), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        });
        var e = this, i = app.isInArray(getApp().tabBar.list, e.data.route);
        t.key && 1 == t.key && i && e.setData({
            tabbar_index: i,
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        }), e.getList(), b.BarIndex(function(a) {
            e.setData(a);
        });
    },
    getList: function() {
        var t = this, a = t.data.page, e = t.data.kj_type;
        b.kj_list("", e, a, t, function(a) {
            console.log(a), t.setData(a);
        });
    },
    swichNav: function(t) {
        var e = a.pdata(t);
        e.list = [], e.page = 1, e.loaded = !1, this.setData(e), this.getList();
    },
    onPullDownRefresh: function() {
        this.setData({
            list: [],
            page: 1,
            loaded: !1
        }), this.getList(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.loaded || this.getList();
    },
    url: function(t) {
        var e = a.pdata(t);
        2 == e.goods_type && wx.navigateTo({
            url: "/yb_mingpian/pages/kanjia/goods_info/index?id=" + e.id
        });
    }
});