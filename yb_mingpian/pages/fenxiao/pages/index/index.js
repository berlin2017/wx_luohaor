var app = getApp(), a = app.requirejs("core");

Page({
    data: {
        show: !1,
        total_price: 0,
        price: 0,
        cash_price: 0,
        total_cash: 0,
        team_count: 0,
        order_money: 0
    },
    onLoad: function(e) {
        a.ReName(e.title);
        this.getInfo();
    },
    getInfo: function() {
        var t = this;
        a.get("Distribe/shareSetting", {}, function(e) {
            0 == e.code && (app.setCache("shareSetting", e.info), t.setData({
                shareSetting: e.info
            }));
        }), a.get("Distribe/userinfo", {
            uid: app.getCache("userinfo").uid
        }, function(e) {
            0 == e.code ? (app.setCache("share_userinfo", e.info), t.setData({
                user_info: e.info,
                show: !0
            })) : a.alert(e.msg, function() {
                a.jump("", 5);
            });
        }, !0);
    },
    onReady: function() {},
    onShow: function() {},
    onPullDownRefresh: function() {
        this.getInfo(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    apply: function(e) {
        a.jump("../add-share/index?title=申请" + this.data.shareSetting.other[13]);
    },
    home: function(e) {
        a.jump("/yb_mingpian/pages/shop/index", 4);
    }
});