var app = getApp(), a = app.requirejs("core");

Page({
    data: {
        qrcode: "",
        show: !1
    },
    onLoad: function(e) {
        a.ReName(e.title);
        var o = this, t = app.getCache("qrcode");
        t ? o.setData({
            qrcode: t,
            show: !0
        }) : a.get("Distribe/getShareCode", {
            uid: app.getCache("userinfo").uid
        }, function(e) {
            0 == e.code ? (app.setCache("qrcode", e.info, 300), o.setData({
                qrcode: e.info,
                show: !0
            })) : a.alert(e.msg, function() {
                a.jump("", 5);
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    click: function() {
        wx.previewImage({
            current: this.data.qrcode,
            urls: [ this.data.qrcode ]
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});