var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        icons: t.requirejs("icons"),
        status: "",
        list: [],
        page: 1,
        cancel: [ "我不想买了", "信息填写错误，重新拍", "其他原因" ],
        cancelindex: 0,
        alert_color: t.config.alert_color,
        button_color: t.config.button_color
    },
    onLoad: function(e) {
        a.setting(), "" == t.getCache("userinfo") && wx.redirectTo({
            url: "/pages/error/index"
        }), this.setData({
            options: e,
            status: e.status || "",
            alert_color: getApp().config.alert_color,
            button_color: getApp().config.button_color
        }), this.get_list();
    },
    get_list: function() {
        var e = this;
        e.setData({
            loading: !0
        }), a.get("Bargain/OrderList", {
            page: e.data.page,
            status: e.data.status,
            uid: getApp().getCache("userinfo").uid
        }, function(t) {
            0 == t.code ? (e.setData({
                loading: !1,
                show: !0,
                total: t.info.length
            }), 0 < t.info.length && e.setData({
                page: e.data.page + 1,
                list: e.data.list.concat(t.info)
            }), t.info.length < 10 && e.setData({
                loaded: !0
            })) : a.alert(t.msg);
        }, this.data.show);
    },
    selected: function(t) {
        var e = a.data(t).type;
        this.setData({
            list: [],
            page: 1,
            status: e
        }), this.get_list();
    },
    onPullDownRefresh: function() {
        this.setData({
            list: [],
            page: 1
        }), this.get_list(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.loaded || this.get_list();
    },
    cancel: function(t) {
        var e = this, i = this.data.cancel[t.detail.value], o = a.data(t).orderid;
        a.get("Bargain/CancelOrder", {
            order_id: o,
            cancel_text: i,
            buyer_id: getApp().getCache("userinfo").uid
        }, function(t) {
            0 == t.code ? (e.setData({
                page: 1,
                list: []
            }), e.get_list(), a.alert("取消订单成功！")) : a.alert(t.msg);
        });
    },
    delete: function(t) {
        var e = this, i = a.data(t).orderid;
        a.get("Bargain/DelOrder", {
            order_id: i,
            buyer_id: getApp().getCache("userinfo").uid
        }, function(t) {
            0 == t.code ? (e.setData({
                page: 1,
                list: []
            }), e.get_list(), a.alert("删除订单成功！")) : a.alert(t.msg);
        });
    },
    refund: function(t) {
        var e = this, i = a.data(t).orderid;
        a.confirm("申请退款后请联系客服", function() {
            a.get("Bargain/RefundOrder", {
                order_id: i,
                buyer_id: getApp().getCache("userinfo").uid
            }, function(t) {
                0 == t.code ? (e.setData({
                    page: 1,
                    list: []
                }), e.get_list(), a.toast("申请成功")) : a.alert(t.msg);
            });
        });
    },
    finish: function(t) {
        var e = this, i = a.data(t).orderid;
        a.get("Bargain/SignOrder", {
            order_id: i,
            buyer_id: getApp().getCache("userinfo").uid
        }, function(t) {
            0 == t.code ? (e.setData({
                page: 1,
                list: []
            }), e.get_list(), a.alert("使用成功！")) : a.alert(t.msg);
        });
    }
});