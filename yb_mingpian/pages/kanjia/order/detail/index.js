var t = getApp(), b = t.requirejs("api/kjb"), e = t.requirejs("core");

Page({
    data: {
        code: !1,
        consume: !1,
        store: !1,
        cancelindex: 0,
        diyshow: {},
        list: []
    },
    onLoad: function(t) {
        e.setting(), this.setData({
            options: t,
            config: getApp().config
        }), this.get_list();
    },
    onShow: function() {},
    onPullDownRefresh: function() {
        this.get_list(), wx.stopPullDownRefresh();
    },
    get_list: function() {
        var i = this;
        e.get("Bargain/GetOrder", {
            buyer_id: getApp().getCache("userinfo").uid,
            order_id: i.data.options.order_id
        }, function(t) {
            console.log(t), 0 == t.code ? (t.show = !0, i.setData(t)) : (e.alert(t.msg), wx.redirectTo({
                url: "/yb_mingpian/pages/kanjia/order/index"
            }));
        });
    },
    goods_like: function() {
        var t = this;
        b.kj_list("", 1, 1, t, function(e) {
            t.setData(e);
        });
    },
    phone: function(t) {
        e.phone(t);
    },
    url: function(t) {
        var i = e.pdata(t);
        wx.navigateTo({
            url: "/yb_mingpian/pages/kanjia/goods_info/index?id=" + i.id
        });
    }
});