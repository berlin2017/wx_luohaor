var t = getApp(), core = t.requirejs("core"), e = t.requirejs("check");

Page({
    data: {
        route: "product",
        menu: t.tabBar,
        menu_show: !1,
        icons: t.requirejs("icons"),
        page: 1,
        loaded: !1,
        list: [],
        cate_id: "",
        cate_id1: "",
        cate_index: "",
        cate_id2: "",
        cate_id3: "",
        category: [],
        cate2: [],
        cate3: []
    },
    menu_url: function(t) {
        core.menu_url(t, 2);
    },
    onLoad: function(t) {
        null != t && null != t && this.setData({
            tabbar_index: t.tabbar_index ? t.tabbar_index : -1
        }), core.setting(), this.setData({
            menu: getApp().tabBar
        }), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        });
        var e = t.id || "";
        this.setData({
            cate_id: e
        }), this.initCategory(), this.getList();
    },
    onShow: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            loaded: !1,
            list: []
        }), this.initCategory(), this.getList(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.loaded || this.getList();
    },
    initCategory: function() {
        var e = this;
        core.get("goods/GetCate", {}, function(t) {
            e.setData({
                category: t.info
            });
        });
    },
    getList: function() {
        var a = this;
        core.get("goods/GoodsList", {
            page: a.data.page,
            cate_id: a.data.cate_id
        }, function(t) {
            if (0 == t.code) {
                if (0 == t.info.length) return a.setData({
                    loaded: !0
                }), !1;
                var e = {};
                0 < t.info.length && (e.page = a.data.page + 1, e.list = a.data.list.concat(t.info), 
                t.info.length < 10 && (e.loaded = !0)), a.setData(e);
            } else core.alert(t.msg);
        }, !0);
    },
    selected: function(t) {
        var e = core.pdata(t).index, a = core.pdata(t).type;
        this.setData({
            list: [],
            page: 1,
            loaded: !1,
            cate_id: a,
            scroll_left: 20 * e
        }), this.getList();
    },
    cate_select: function(t) {
        var e = this, a = e.data.category, i = core.pdata(t), s = {};
        console.log(i), 1 == i.level && (s.cate_index = i.index, s.cate_id2 = "", s.cate_id3 = "", 
        s.cate3 = [], "" == i.id ? s.cate2 = [] : s.cate2 = a[i.index].cate), 2 == i.level && (s.cate3 = a[e.data.cate_index].cate[i.index].cate), 
        s.cate_id = i.id, s["cate_id" + i.level] = i.id, e.setData(s);
    },
    confirm: function() {
        this.setData({
            list: [],
            page: 1,
            loaded: !1,
            isFilterShow: !1
        }), this.getList();
    },
    showFilter: function() {
        this.setData({
            isFilterShow: !this.data.isFilterShow
        });
    },
    onShareAppMessage: function() {
        return e.onShareAppMessage();
    }
});