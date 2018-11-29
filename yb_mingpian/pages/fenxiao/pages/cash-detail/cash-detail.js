var app = getApp(), a = app.requirejs("core"), loading = !1;

Page({
    data: {
        show: !1,
        status: -1,
        list: [],
        loaded: !1,
        page: 1
    },
    onLoad: function(t) {
        a.ReName(t.title), this.getlist();
    },
    getlist: function() {
        if (!loading) {
            loading = !0;
            var e = this;
            e.data.page;
            a.get("Distribe/CashList", {
                uid: app.getCache("userinfo").uid,
                status: e.data.status
            }, function(t) {
                console.log(t), loading = !1, 0 == t.code ? e.setData({
                    list: e.data.list.concat(t.info),
                    page: 0 == t.info.length ? e.data.page : e.data.page + 1,
                    loaded: t.info.length < 10,
                    show: !0
                }) : a.alert(t.msg);
            }, !0);
        }
    },
    click: function(t) {
        var e = a.pdata(t).index;
        this.setData({
            hidden: e != this.data.hidden ? e : -1
        });
    },
    select: function(t) {
        var e = a.pdata(t).status;
        this.setData({
            page: 1,
            list: [],
            loaded: !1,
            status: e
        }), this.getlist();
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
    }
});