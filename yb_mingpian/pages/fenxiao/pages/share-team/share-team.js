var app = getApp(), a = app.requirejs("core"), loading = !1;

Page({
    data: {
        show: !1,
        status: 1,
        first_count: 0,
        second_count: 0,
        third_count: 0,
        list: [],
        loaded: !1,
        page: 1
    },
    onLoad: function(t) {
        a.ReName(t.title), this.setData({
            share_setting: app.getCache("shareSetting")
        }), this.getlist();
    },
    getlist: function() {
        if (!loading) {
            loading = !0;
            var s = this;
            s.data.page;
            a.get("Distribe/myteam", {
                uid: app.getCache("userinfo").uid,
                status: s.data.status
            }, function(t) {
                loading = !1, 0 == t.code ? s.setData({
                    list: s.data.list.concat(t.info.list),
                    first_count: t.info.first,
                    second_count: t.info.second,
                    third_count: t.info.third,
                    page: 0 == t.info.list.length ? s.data.page : s.data.page + 1,
                    loaded: t.info.list.length < 10,
                    show: !0
                }) : a.alert(t.msg);
            });
        }
    },
    select: function(t) {
        var s = a.pdata(t).status;
        this.setData({
            page: 1,
            list: [],
            loaded: !1,
            status: s
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