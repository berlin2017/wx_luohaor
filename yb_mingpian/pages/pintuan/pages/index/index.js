var app = getApp(), a = app.requirejs("core");

Page({
    data: {
        route: "pintuan",
        cid: 0,
        show: !1,
        scrollLeft: 0,
        scrollTop: 0,
        page: 1,
        goodsList: [],
        loading: !0,
        suspension: []
    },
    menu_url: function(t) {
        a.menu_url(t, 2);
    },
    onLoad: function(t) {
        a.setting(), null != t && null != t && this.setData({
            tabbar_index: t.tabbar_index ? t.tabbar_index : -1
        }), this.setData({
            menu: getApp().tabBar
        }), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        }), this.systemInfo = wx.getSystemInfoSync(), this.setIndexData(), this.setGoodsData();
    },
    onShow: function() {},
    onPullDownRefresh: function() {
        this.setData({
            goodsList: [],
            page: 1,
            loaded: !1
        }), this.setIndexData(), this.setGoodsData(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("加载更多"), this.data.loaded || this.setGoodsData();
    },
    setIndexData: function() {
        var s = this;
        a.get("Pintuan/ptIndex", {}, function(t) {
            0 == t.code ? s.setData({
                windowHeight: s.systemInfo.windowHeight,
                advert: t.info.advert,
                category: t.info.cate
            }) : a.alert(t.msg);
        });
    },
    setGoodsData: function() {
        if (!this.data.loading) return !1;
        var e = this;
        a.get("Pintuan/ptGoodsList", {
            page: e.data.page,
            cate_id: e.data.cid
        }, function(t) {
            if (console.log(t), 0 == t.code) {
                var s = {
                    loading: !1
                };
                0 < t.info.length && (s.page = e.data.page + 1, s.goodsList = e.data.goodsList.concat(t.info)), 
                t.info.length < 10 && (s.loaded = !0), e.setData(s);
            } else a.alert(t.msg);
        });
    },
    showList: function(t) {
        var a = t.currentTarget.dataset.id;
        app.redirect("index/list", "cid=" + a);
    },
    showGoodsDetial: function(t) {
        var a = t.currentTarget.dataset.id;
        a && app.redirect("goods/detail", "gid=" + a);
    },
    switchNav: function(t) {
        if (this.data.cid != t.currentTarget.dataset.cid || 0 == t.currentTarget.dataset.cid) {
            this.data.cid = t.currentTarget.dataset.cid, this.data.page = 0, this.data.loading = !0, 
            this.data.goodsList = [];
            var a = this.systemInfo.windowWidth, s = t.currentTarget.offsetLeft, e = this.data.scrollLeft;
            e = a / 2 < s ? s : 0, this.setData({
                goodsList: [],
                childCate: [],
                loading: !0,
                scrollLeft: e,
                scrollTop: 0,
                cid: this.data.cid
            }), this.setGoodsData();
        }
    },
    scrolltolower: function(t) {
        console.log("加载更多"), this.data.loaded || this.setGoodsData();
    },
    consultation: function(t) {
        suspension.call();
    }
});