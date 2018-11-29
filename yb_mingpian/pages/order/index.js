var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        route: "order",
        menu: t.tabBar,
        menu_show: !1,
        icons: t.requirejs("icons"),
        status: "",
        list: [],
        page: 1,
        cancel: [ "我不想买了", "信息填写错误，重新拍", "其他原因" ],
        cancelindex: 0
    },
    menu_url: function(t) {
        a.menu_url(t, 2);
    },
    onLoad: function(e) {
        null != e && null != e && this.setData({
            tabbar_index: e.tabbar_index ? e.tabbar_index : -1
        }), a.setting(), "" == t.getCache("userinfo") && wx.redirectTo({
            url: "/yb_mingpian/pages/index/index"
        }), this.setData({
            options: e,
            status: e.status || "",
            menu: getApp().tabBar,
            config: getApp().config
        }), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        }), this.get_list();
    },
    get_list: function() {
        var e = this;
        e.setData({
            loading: !0
        }), a.get("Order/OrderList", {
            page: e.data.page,
            status: e.data.status,
            uid: getApp().getCache("userinfo").uid
        }, function(t) {
            console.log(t), 0 == t.code ? (e.setData({
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
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.loaded || this.get_list();
    },
    cancel: function(t) {
        var e = this, i = this.data.cancel[t.detail.value], s = a.data(t).orderid;
        a.get("Order/CancelOrder", {
            order_id: s,
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
        a.get("Order/DelOrder", {
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
            a.get("order/RefundOrder", {
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
        a.get("order/SignOrder", {
            order_id: i,
            buyer_id: getApp().getCache("userinfo").uid
        }, function(t) {
            0 == t.code ? (e.setData({
                page: 1,
                list: []
            }), e.get_list(), a.alert("收货成功！")) : a.alert(t.msg);
        });
    }
});