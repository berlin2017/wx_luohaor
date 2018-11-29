var app = getApp(), a = app.requirejs("core"), b = app.requirejs("api/kjb");

Page({
    data: {
        show: !1,
        loaded: !1,
        page: 1,
        list: []
    },
    onLoad: function(t) {
        a.setting(), this.setData(t), this.getList();
    },
    getList: function() {
        var a = this, t = a.data.page;
        b.MyBargain(t, a, function(t) {
            a.setData(t);
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            list: [],
            page: 1,
            loaded: !1
        }), this.getList(), wx.stopPullDownRefresh();
    },
    url: function(t) {
        var i = a.pdata(t);
        1 == i.goods_type ? wx.navigateTo({
            url: "/yb_mingpian/pages/kanjia/discount_info/index?id=" + i.id + "&kj_stu=1"
        }) : a.alert("活动已结束");
    },
    onReachBottom: function() {
        this.data.loaded || this.getList();
    }
});