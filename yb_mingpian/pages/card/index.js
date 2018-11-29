var t = getApp(), a = t.requirejs("core"), c = t.requirejs("api/index"), loading = !1;

Page({
    data: {
        route: "card",
        menu: t.tabBar,
        menu_show: !1,
        page: 1,
        list: [],
        loaded: !1,
        loading: !0,
        show: !0,
        display: !1,
        showtabbar: !1,
        tabbar_index: 0,
        config: t.config
    },
    menu_url: function(t) {
        a.menu_url(t, 2);
    },
    onGotUserInfo: function(a) {
        var e = this, i = t.getCache("userinfo");
        e.setData({
            display: !1
        }), i || t.getUserInfo(a.detail.userInfo, function(a) {
            1e3 != a ? e.getlist() : e.setData({
                display: !0
            });
        });
        e.setData({
          display:!1
        })
    },
    onLoad: function() {
        var a = this;
        t.set_caidan(), getApp().getExtC(function() {
            t.getCache("userinfo") ? (a.getlist(), a.setData({
                display: !1
            })) : a.setData({
                display: !0
            });
        });
    },
    getlist: function() {
        if (!loading) {
            loading = !0;
            var e = this, t = e.data.page;
            e.setData({
                loading: !1
            }), a.get("Card/CardList", {
                page: t,
                uid: getApp().getCache("userinfo").uid
            }, function(t) {
                e.setData({
                    loading: !0
                }), loading = !1, 0 == t.code ? e.setData({
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
    to_detail: function(e) {
        var i = a.pdata(e);
        t.globalData.card_id = i.id, a.jump("/yb_mingpian/pages/cardinfo/index", 4);
    },
    bindconfirm: function(e) {
        console.log(e);
        var i = {};
        i.formid = e.detail.formId, i.openid = getApp().getCache("userinfo").openid, i.username = getApp().getCache("userinfo").nickName, 
        a.get("Market/getFormid", i, function(a) {
            console.log(a);
        });
        var n = e.detail.value.id;
        t.globalData.card_id = n, a.jump("/yb_mingpian/pages/cardinfo/index", 4);
    },
    to_index: function() {
        a.jump("/yb_mingpian/pages/index/index", 4);
    },
    onPullDownRefresh: function() {
        t.getCache("userinfo") && (this.setData({
            list: [],
            page: 1,
            loaded: !1
        }), this.getlist(), wx.stopPullDownRefresh());
    },
    onReachBottom: function() {
        t.getCache("userinfo") && (console.log("加载更多"), this.data.loaded || this.getlist());
    },
    onShareAppMessage: function() {}
});