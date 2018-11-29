var t = getApp(), s = t.requirejs("wxParse/wxParse"), core = t.requirejs("core");

Page({
    data: {
        route: "",
        show: !1
    },
    onLoad: function(o) {
        this.setData({
            id: o.id
        });
    },
    onShow: function() {
        var e = this, o = e.data.id;
        core.get("Card/zhaopin", {
            id: o
        }, function(o) {
            0 == o.code ? (s.wxParse("wxParseData", "html", o.info.content, e, "0"), e.setData({
                info: o.info,
                show: !0
            })) : (core.warning("该招聘不存在"), setTimeout(function() {
                core.jump("", 5);
            }, 1e3));
        });
    },
    phone: function(o) {
        core.phone(o);
    },
    onPullDownRefresh: function() {
        this.onShow(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {}
});