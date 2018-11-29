var app = getApp(), a = app.requirejs("core");

Page({
    data: {
        block: !1,
        active: "",
        share_userinfo: {
            today_price: 0,
            price: 0,
            un_pay: 0,
            get_price: 0
        }
    },
    onLoad: function(e) {
        a.ReName(e.title);
    },
    onShow: function() {
        this.setData({
            share_setting: app.getCache("shareSetting"),
            share_userinfo: app.getCache("share_userinfo")
        });
    },
    tapName: function(a) {
        var e = this, t = "";
        e.data.block || (t = "active"), e.setData({
            block: !e.data.block,
            active: t
        });
    }
});