var app = getApp(), a = app.requirejs("core"), b = app.requirejs("api/kjb");

Page({
    data: {
        status: [ "正在进行", "即将开始", "全部活动" ],
        kj_type: 1,
        cate_info: [],
        page: 1,
        cate_index: 0,
        show: !1,
        loaded: !1,
        list: []
    },
    onLoad: function(e) {
        a.setting();
        var i = this;
        i.setData(e), i.getList(), b.BarIndex(function(t) {
            t.cate_info.forEach(function(t, a) {
                t.id == e.cate_id && i.setData({
                    cate_index: a
                });
            }), i.setData(t);
        });
    },
    getList: function() {
        var a = this, t = a.data.page, e = a.data.kj_type, i = a.data.cate_id;
        wx.setNavigationBarTitle({
            title: a.data.class_name || "活动列表"
        }), b.kj_list(i, e, t, a, function(t) {
            a.setData(t);
        });
    },
    status: function(t) {
        var a = parseInt(t.detail.value) + 1;
        this.setData({
            kj_type: a,
            list: [],
            page: 1,
            loaded: !1
        }), this.getList();
    },
    cate: function(t) {
        var e = this, i = t.detail.value;
        e.data.cate_info.forEach(function(t, a) {
            a == i && (e.setData({
                cate_index: i,
                cate_id: t.id,
                list: [],
                page: 1,
                loaded: !1,
                class_name: t.class_name
            }), e.getList());
        });
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
    },
    onShareAppMessage: function() {}
});