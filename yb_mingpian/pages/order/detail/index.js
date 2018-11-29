var t = getApp(), e = t.requirejs("core");

Page({
    data: {
        code: !1,
        consume: !1,
        store: !1,
        cancelindex: 0,
        diyshow: {}
    },
    onLoad: function(o) {
        e.setting(), this.setData({
            options: o,
            config: getApp().config
        });
    },
    onShow: function() {
        this.get_list();
    },
    onPullDownRefresh: function() {
        this.onShow(), wx.stopPullDownRefresh();
    },
    get_list: function() {
        var t = this;
        e.get("Order/GetOrder", {
            buyer_id: getApp().getCache("userinfo").uid,
            order_id: t.data.options.order_id
        }, function(o) {
            console.log(o), 0 == o.code ? (o.show = !0, t.setData(o)) : (e.alert(o.msg), wx.redirectTo({
                url: "/yb_mingpian/pages/order/index"
            }));
        });
    },
    goods_like: function() {
        var o = this;
        e.get("index/index", {}, function(e) {
            o.setData({
                goods_like: e.info.goods_list
            });
        });
    },
    phone: function(o) {
        e.phone(o);
    },
    onShareAppMessage: function() {
        return e.onShareAppMessage();
    }
});