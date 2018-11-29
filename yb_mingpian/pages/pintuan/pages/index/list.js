var app = getApp(), a = app.requirejs("core");

Page({
    data: {
        cid: 0,
        show: !1,
        scrollLeft: 0,
        scrollTop: 0,
        page: 1,
        goodsList: [],
        loading: !0,
        suspension: []
    },
    onLoad: function(t) {
        this.setData({
            cid: t.cid ? t.cid : 0
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
        var o = this;
        a.get("Pintuan/ptIndex", {}, function(t) {
            0 == t.code ? o.setData({
                windowHeight: o.systemInfo.windowHeight,
                advert: t.info.advert,
                category: t.info.cate
            }) : a.alert(t.msg);
        });
    },
    setGoodsData: function() {
        if (!this.data.loading) return !1;
        var s = this;
        a.get("Pintuan/ptGoodsList", {
            page: s.data.page,
            cate_id: s.data.cid
        }, function(t) {
            if (console.log(t), 0 == t.code) {
                var o = {
                    loading: !1
                };
                0 < t.info.length && (o.page = s.data.page + 1, o.goodsList = s.data.goodsList.concat(t.info)), 
                t.info.length < 10 && (o.loaded = !0), s.setData(o);
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
            var a = this.systemInfo.windowWidth, o = t.currentTarget.offsetLeft, s = this.data.scrollLeft;
            s = a / 2 < o ? o : 0, this.setData({
                goodsList: [],
                childCate: [],
                loading: !0,
                scrollLeft: s,
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