var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, t = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : _typeof(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof(t);
}, e = getApp(), a = e.requirejs("core"), r = e.requirejs("check");

Page({
    data: {
        icons: e.requirejs("icons"),
        list: {},
        data: [],
        showPicker: !1,
        pvalOld: [ 0, 0, 0 ],
        pval: [ 0, 0, 0 ],
        areas: [],
        noArea: !0,
        submit: !0,
        button_color: e.config.button_color
    },
    onLoad: function(t) {
        a.setting();
        var e = this;
        this.data;
        this.setData({
            options: t,
            button_color: getApp().config.button_color
        }), a.get("Area/UserAddress", {
            uid: getApp().getCache("userinfo").uid
        }, function(t) {
            0 == t.code ? (e.setData({
                address: t.info.address
            }), a.get("Bargain/GoodsInfo", {
                id: e.data.options.bargain_id
            }, function(t) {
                0 == t.code ? (e.setData({
                    list: t.info.bargain_info,
                    show: !0
                }), e.caculate()) : a.alert(t.msg);
            }, !0)) : a.alert(t.msg);
        });
    },
    onShow: function() {
        var t = e.getCache("orderAddress");
        t && (this.setData({
            address: t
        }), this.caculate());
    },
    toggle: function(t) {
        var e = a.pdata(t), o = e.id, i = {};
        i[e.type] = 0 == o || void 0 === o ? 1 : 0, this.setData(i);
    },
    phone: function(t) {
        a.phone(t);
    },
    caculate: function() {
        var t = this, a = t.data.address;
        a.order_money = t.data.options.current_price, a.pay_money = t.data.options.current_price, 
        a.total = t.data.options.total, a.user_name = getApp().getCache("userinfo").nickName, 
        a.buyer_id = getApp().getCache("userinfo").uid, a.mch_id = t.data.list.mch_id, a.activity_order_type = t.data.options.activity_order_type ? t.data.options.activity_order_type : 0, 
        a.bargain_id = t.data.options.bargain_id, t.setData({
            data: a
        });
    },
    submit: function() {
        var e = this, t = this.data;
        if (t.submit) {
            if (!t.address.phone || "" == t.address.province) return a.alert("请选择收货地址！"), !1;
            a.get("Bargain/CreateOrder", t.data, function(t) {
                0 == t.code ? (e.setData({
                    submit: !1,
                    order_id: t.info
                }), wx.navigateTo({
                    url: "/yb_mingpian/pages/kanjia/order/pay/index?id=" + t.info
                })) : a.alert(t.msg);
            });
        } else wx.navigateTo({
            url: "/yb_mingpian/pages/kanjia/order/pay/index?id=" + e.data.order_id
        });
    },
    dataChange: function(t) {
        var a = this.data.data;
        this.data.list;
        switch (t.target.id) {
          case "buyer_message":
            a.buyer_message = t.detail.value;
        }
        this.setData({
            data: a
        });
    },
    radioChange: function(t) {
        this.setData({
            data: t
        });
    },
    url: function(t) {
        var e = a.pdata(t).url;
        wx.redirectTo({
            url: e
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    }
});