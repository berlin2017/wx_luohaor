var t = getApp(), e = t.requirejs("core");

Page({
    data: {
        icons: t.requirejs("icons"),
        success: !1,
        successData: {},
        button_color: t.config.button_color
    },
    onLoad: function(t) {
        e.setting(), this.setData({
            options: t,
            button_color: getApp().config.button_color,
            font_color: getApp().config.font_color,
            config: getApp().config
        });
    },
    onShow: function() {
        this.get_list();
    },
    get_list: function() {
        var o = this;
        e.get("pay/OrderInfo", {
            order_id: o.data.options.id
        }, function(t) {
            0 == t.code ? o.setData({
                list: t.info,
                show: !0
            }) : (e.alert(t.msg), setTimeout(function() {
                wx.navigateBack();
            }, 1e3));
        });
    },
    pay: function(t) {
        var o = this;
        o.setData({
            formid: t.detail.formId
        }), e.get("Pay/Pay", {
            out_trade_no: o.data.list.out_trade_no,
            openid: getApp().getCache("userinfo").openid
        }, function(t) {
            console.log(t), 0 == t.code ? wx.requestPayment({
                timeStamp: t.info.timeStamp,
                nonceStr: t.info.nonceStr,
                package: t.info.package,
                signType: "MD5",
                paySign: t.info.paySign,
                success: function(t) {
                    "requestPayment:ok" == t.errMsg ? (wx.setNavigationBarTitle({
                        title: "支付成功"
                    }), o.setData({
                        success: !0,
                        "list.order_status": 1
                    }), e.get("Wxpush/PayOrderPush", {
                        out_trade_no: o.data.list.out_trade_no,
                        formid: o.data.formid,
                        uid: getApp().getCache("userinfo").uid
                    }, function(t) {
                        console.log(t);
                    })) : (e.alert("支付失败！"), wx.redirectTo({
                        url: "/yb_mingpian/pages/order/index"
                    }));
                },
                fail: function(t) {
                    e.alert("您已经取消支付！"), wx.redirectTo({
                        url: "/yb_mingpian/pages/order/index"
                    });
                }
            }) : (e.alert(t.msg), setTimeout(function() {
                wx.navigateBack();
            }, 1e3));
        });
    },
    phone: function(t) {
        e.phone(t);
    }
});