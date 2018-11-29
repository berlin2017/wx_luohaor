var t = getApp(), c = t.requirejs("api/index"), a = t.requirejs("core");

Page({
    data: {
        route: "find",
        menu: t.tabBar,
        menu_show: !1,
        loaded: !1,
        list: [],
        page: 1,
        class_id: "",
        class_id1: "",
        class_id2: "",
        cate_index: "",
        cate: [],
        class_style: 2
    },
    menu_url: function(t) {
        a.menu_url(t, 2);
    },
    onLoad: function(t) {
        a.setting(), null != t && null != t && this.setData({
            tabbar_index: t.tabbar_index ? t.tabbar_index : -1
        }), this.setData({
            menu: getApp().tabBar,
            class_id: t.id ? t.id : "",
            class_id1: t.id ? t.id : "",
            class_style: t.class_style ? t.class_style : 2
        }), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        }), this.getlist(), this.initCategory();
    },
    cate_select: function(t) {
        var e = this, s = e.data.cate, i = a.pdata(t), n = {};
        console.log(i), 1 == i.level && (n.cate_index = i.index, (n.class_id2 = "") == i.id ? n.cate2 = [] : n.cate2 = s[i.index].cate), 
        n.class_style = i.class_style ? i.class_style : 2, n.class_id = i.id, n["class_id" + i.level] = i.id, 
        n.list = [], n.page = 1, n.loaded = !1, e.setData(n), e.getlist();
    },
    initCategory: function() {
        var e = this;
        a.get("Article/ArticleClass", {}, function(t) {
            e.setData({
                cate: t.info
            });
        });
    },
    getlist: function() {
        var a = this, t = a.data.class_id, e = a.data.page;
        c.article_list("", e, t, a, function(t) {
            a.setData(t);
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            list: [],
            page: 1,
            loaded: !1
        }), this.getlist(), this.initCategory(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("加载更多"), this.data.loaded || this.getlist();
    },
    to_url: function(t) {
        var e = a.pdata(t), s = "";
        s = e.link ? "/yb_mingpian/pages/web/index?url=" + escape(e.link) + "&name=" + e.name : "/yb_mingpian/pages/find_info/index?id=" + e.id, 
        a.jump(s);
    },
    onShareAppMessage: function() {}
});