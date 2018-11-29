var t = getApp(), core = t.requirejs("core"), e = t.requirejs("check");

Page({
    data: {
        route: "goods_index",
        menu: t.tabBar,
        menu_show: !1,
        icons: t.requirejs("icons"),
        page: 1,
        list: [],
        defaults: {
            keywords: "",
            isrecommand: "",
            ishot: "",
            isnew: "",
            cate_id: "",
            order: "",
            by: "desc"
        },
        listmode: "block",
        fromsearch: !1,
        isFilterShow: !1,
        params: []
    },
    menu_url: function(t) {
        core.menu_url(t, 2);
    },
    onLoad: function(e) {
        e.pid && t.setCache("pid", e.pid);
        var a = this.data.defaults;
        a.keywords = e.key || "", a.cate_id = e.cate || "", this.setData({
            filterBtns: e,
            fromsearch: e.fromsearch || !1,
            defaults: e
        }), this.initCategory(), this.data.fromsearch || this.getList();
    },
    onShow: function() {},
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
    initCategory: function() {
        var e = this;
        core.get("goods/GetCate", {}, function(t) {
            console.log(t), e.setData({
                category: t.info
            });
        });
    },
    getList: function() {
        var a = this;
        a.setData({
            loading: !0
        }), a.data.defaults.page = a.data.page, core.get("goods/GoodsList", a.data.defaults, function(t) {
            if (0 == t.code) {
                if (0 == t.info.length) return a.setData({
                    loading: !1
                }), !1;
                var e = {
                    loading: !1
                };
                0 < t.info.length && (e.page = a.data.page + 1, e.list = a.data.list.concat(t.info), 
                t.info.length < 10 && (e.loaded = !0)), a.setData(e);
            } else core.alert(t.msg);
        });
    },
    bindSearch: function(t) {
        this.setData({
            list: [],
            loading: !0
        });
        var a = e.trim(t.detail.value), s = this.data.defaults;
        s.keywords = "" != a ? a : "", this.setData({
            page: 1,
            defaults: s,
            fromsearch: !1
        }), this.getList();
    },
    bindFilterSubmit: function() {
        var t = this.data.params, a = this.data.filterBtns;
        for (var s in a) t[s] = a[s];
        e.isEmptyObject(a) && (t = this.data.defaults), t.cate = this.data.category_selected, 
        this.setData({
            page: 1,
            params: t,
            isFilterShow: !1,
            filterBtns: a,
            list: [],
            loading: !0
        }), this.getList();
    },
    bindSort: function(t) {
        var e = core.pdata(t).order, a = this.data.defaults;
        if ("" == e) {
            if (a.order == e) return;
            a.order = "";
        } else if ("price" == e) a.order == e ? "desc" == a.by ? a.by = "asc" : a.by = "desc" : a.by = "asc", 
        a.order = e; else if ("sales" == e) {
            if (a.order == e) return;
            a.order = "sales", a.by = "desc";
        }
        this.setData({
            defaults: a,
            page: 1,
            list: [],
            loading: !0
        }), this.getList();
    },
    bindCategoryEvents: function(t) {
        var e = t.target.dataset.id;
        this.setData({
            "defaults.cate_id": e
        });
    },
    btnFilterBtns: function(t) {
        var e = t.target.dataset.type, a = this.data.defaults;
        e && (a.hasOwnProperty(e) || (a[e] = ""), a[e] ? a[e] = "" : a[e] = 1, this.setData({
            defaults: a
        }));
    },
    bindFilterCancel: function() {
        this.setData({
            isFilterShow: !1
        });
    },
    showFilter: function() {
        this.setData({
            isFilterShow: !this.data.isFilterShow
        });
    },
    bindback: function() {
        wx.navigateBack();
    }
});