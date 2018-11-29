var t = getApp(), a = t.requirejs("core");

Page({
    data: {},
    menu_url: function(e) {
        a.menu_url(e, 2);
    },
    onLoad: function(e) {
        a.setting(), e.url ? (wx.setNavigationBarTitle({
            title: e.name ? decodeURIComponent(e.name) : "网页"
        }), e.web_url = unescape(e.url), e.show = !0, this.setData(e)) : (a.toast("外链不能为空"), 
        setTimeout(function() {
            a.jump("", 5);
        }, 1e3));
    },
    onShareAppMessage: function(e) {
        var t = this.data;
        return {
            title: t.name,
            path: "/yb_mingpian/pages/web/index?name=" + t.name + "&url=" + t.url,
            success: function(e) {},
            fail: function(e) {}
        };
    }
});