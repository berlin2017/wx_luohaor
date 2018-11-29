var app = getApp(), a = app.requirejs("core"), b = app.requirejs("api/kjb");

Page({
    data: {
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        popup: !1,
        countDownDay: 0,
        countDownHour: 0,
        countDownMinute: 0,
        countDownSecond: 0,
        show_time: !0,
        display: !0
    },
    onGotUserInfo: function(a) {
        var t = this, n = app.getCache("userinfo");
        t.setData({
            display: !1
        }), n || app.getUserInfo(a.detail.userInfo, function(a) {
            1e3 != a || t.setData({
                display: !0
            });
        });
    },
    onLoad: function(a) {
        console.log(a);
        a.bargain_id;
        app.getCache("userinfo") && this.setData({
            display: !1
        }), this.setData(a), this.detail();
    },
    detail: function() {
        var n = this, a = n.data.uid, t = n.data.bargain_id;
        b.kj_info(t, a, n, function(a) {
            if (n.setData(a), a.bargain_info.end_time) {
                var t = a.bargain_info.end_time;
                b.Countdown(t, function(a) {
                    n.setData(a);
                });
            }
        });
    },
    tankuang: function() {
        this.setData({
            popup: !1
        });
    },
    bargain_help: function(t) {
        var n = this, i = n.data.id, o = n.data.uid;
        n.data.show_time ? n.data.bargain_info.bargain_inventory < 1 ? a.alert("库存不足") : b.BargainHelp(i, o, function(a) {
            console.log(a), n.setData(a), n.detail();
        }) : a.alert("该活动已经结束");
    },
    shoping: function(t) {
        var n = a.pdata(t).id;
        return this.data.show_time ? this.data.bargain_info.bargain_inventory < 1 ? (a.alert("库存不足"), 
        !1) : void wx.navigateTo({
            url: "/yb_mingpian/pages/kanjia/discount_info/index?id=" + n
        }) : (a.alert("该活动已经结束"), !1);
    },
    onPullDownRefresh: function() {
        this.detail(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});