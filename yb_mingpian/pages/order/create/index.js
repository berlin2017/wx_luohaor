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
        cart_list: [],
        data: [],
        showPicker: !1,
        pvalOld: [ 0, 0, 0 ],
        pval: [ 0, 0, 0 ],
        areas: [],
        noArea: !0,
        submit: !0,
        coupon_display: !1,
        coupon_num: 0,
        send_type: "express",
        is_mention: 1,
        date: "",
        time: "00:00",
        formid: "",
        button_color: e.config.button_color
    },
    dispatchtype: function(t) {
        var e = this, o = a.pdata(t);
        e.setData(o), e.data.options.type && "cart" == e.data.options.type ? e.cart_caculate() : e.caculate();
    },
    bindDateChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), a.time_str(t.detail.value + " " + this.data.time) < Date.parse(new Date()) / 1e3 ? a.error("不小于当前时间") : this.setData({
            date: t.detail.value
        });
    },
    bindTimeChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            time: t.detail.value
        });
    },
    onLoad: function(t) {
        a.setting();
        var e = this;
        this.data;
        this.setData({
            options: t,
            button_color: getApp().config.button_color,
            font_color: getApp().config.font_color,
            config: getApp().config
        }), a.get("user/About", {
            user_id: getApp().getCache("userinfo").uid
        }, function(t) {
            if (0 == t.code) {
                var a = e.data.send_type;
                2 == t.info.is_mention && (a = "selftake"), e.setData({
                    user_level: t.info.user_level,
                    user_rebate: t.info.user_rebate,
                    is_mention: t.info.is_mention,
                    send_type: a
                });
            }
        }), e.data.options.type && "cart" == e.data.options.type ? a.get("goods/CartGoods", e.data.options, function(t) {
            0 == t.code ? (e.setData({
                cart_list: t.info.info,
                "list.address": t.info.address,
                "list.activity": t.info.activity,
                show: !0
            }), e.cart_caculate()) : a.alert(t.msg);
        }) : a.get("goods/GetGoods", e.data.options, function(t) {
            0 == t.code ? (e.setData({
                list: t.info,
                show: !0
            }), e.caculate()) : a.alert(t.msg);
        });
    },
    onShow: function() {
        var t = this, a = e.getCache("orderAddress");
        a && (this.setData({
            "list.address": a
        }), t.data.options.cart_id ? t.cart_caculate() : t.caculate());
    },
    CouponApi: function(o) {
        var n = this, i = [];
        a.get("Market/UserCoupon", {
            user_id: getApp().getCache("userinfo").uid
        }, function(t) {
            if (0 == t.code && 0 < t.info.length) {
                for (var a = Date.parse(new Date()) / 1e3, e = 0; e < t.info.length; e++) o >= t.info[e].satisfy_money && 0 == t.info[e].status && t.info[e].end_time >= a && i.push(t.info[e]);
                i.sort(function(t, a) {
                    return parseFloat(a.satisfy_money) - parseFloat(t.satisfy_money);
                }), n.setData({
                    coupon: i,
                    coupon_num: i.length
                });
            }
        });
    },
    select: function(t) {
        var e = this, o = e.data.data.order_money, n = e.data.discount_money, i = a.pdata(t);
        1 == i.together ? (e.setData({
            "data.discount_money": 0
        }), n = 0) : (n || (n = 0), e.setData({
            "data.discount_money": n
        }));
        var s = parseFloat(o) - parseFloat(n) - parseFloat(i.coupon_money);
        e.setData({
            "data.coupon_id": i.id,
            "data.coupon_money": i.coupon_money,
            "data.pay_money": parseFloat(s).toFixed(2),
            coupon_display: !1
        });
    },
    open_coupon: function() {
        var t = !this.data.coupon_display;
        this.setData({
            coupon_display: t
        });
    },
    toggle: function(t) {
        var e = a.pdata(t), o = e.id, n = {};
        n[e.type] = 0 == o || void 0 === o ? 1 : 0, this.setData(n);
    },
    phone: function(t) {
        a.phone(t);
    },
    number: function(t) {
        var e = "", o = a.data(t).action;
        "minus" == o ? e = parseInt(this.data.options.total) - 1 : "plus" == o && (e = parseInt(this.data.options.total) + 1), 
        this.setData({
            "options.total": e
        }), this.caculate();
    },
    cart_number: function(t) {
        a.pdata(t).id;
        var e = a.pdata(t).key, o = this.data.cart_list, n = a.data(t).action;
        "minus" == n ? o[e].num = parseInt(o[e].num) - 1 : "plus" == n && (o[e].num = parseInt(o[e].num) + 1), 
        this.setData({
            cart_list: o
        }), this.cart_caculate();
    },
    caculate: function() {
        var t = this, a = 0, e = t.data.list.activity, o = t.data.list.address;
        o.order_money = parseFloat(t.data.options.total * t.data.list.price).toFixed(2), 
        t.CouponApi(o.order_money), console.log(o.order_money);
        for (var n = 0; n < e.length; n++) if (console.log(e[n].satisfy_money), console.log(o.order_money), 
        parseFloat(o.order_money) >= parseFloat(e[n].satisfy_money)) {
            a = e[n].discount_money, o.discount_money = e[n].discount_money, o.discount_id = e[n].id;
            break;
        }
        var i = 0;
        if (t.data.user_level && 0 != t.data.user_level && t.data.user_rebate && t.data.user_rebate < 10 && (i = (i = parseFloat(o.order_money) * (1 - parseFloat(t.data.user_rebate) / 10)).toFixed(2)), 
        o.rebate_money = i, "express" == t.data.send_type && "selftake" != t.data.send_type) if (null != t.data.list.post_fee && null != t.data.list.post_fee) {
            var s = t.data.list.post_fee, r = Math.ceil((parseInt(t.data.options.total) - parseInt(s.bynum_snum)) / parseInt(s.bynum_xnum)), d = 0 < r ? r * parseFloat(s.bynum_xprice) : 0;
            o.shipping_money = parseFloat(s.bynum_sprice) + parseFloat(d);
        } else o.shipping_money = 0; else o.shipping_money = 0;
        o.pay_money = parseFloat(parseInt(t.data.options.total) * parseFloat(t.data.list.price) + o.shipping_money - parseFloat(a) - parseFloat(i)).toFixed(2), 
        parseFloat(o.pay_money) < 0 && (o.pay_money = 0), o.sku_id = t.data.options.sku_id + ":" + t.data.options.total, 
        o.user_name = getApp().getCache("userinfo").nickName, o.buyer_id = getApp().getCache("userinfo").uid, 
        t.setData({
            data: o,
            discount_money: a || 0,
            rebate_money: i
        });
    },
    cart_caculate: function() {
        var n = this, t = 0, a = n.data.list.activity, i = 0, e = this.data.options, o = this.data.cart_list, s = n.data.list.address, r = 0, d = 0, p = 0, u = "";
        o.forEach(function(t) {
            if (r += parseFloat(t.num * t.price.price), null != t.post_fee && null != t.post_fee && "selftake" != n.data.send_type) {
                var a = t.post_fee, e = Math.ceil((parseInt(t.num) - parseInt(a.bynum_snum)) / parseInt(a.bynum_xnum)), o = 0 < e ? e * parseFloat(a.bynum_xprice) : 0;
                d += parseFloat(a.bynum_sprice) + parseFloat(o);
            }
            u += t.sku_id + ":" + t.num + ",", i += t.num;
        }), n.CouponApi(r);
        for (var l = 0; l < a.length; l++) if (r >= a[l].satisfy_money) {
            t = a[l].discount_money, s.discount_money = a[l].discount_money, s.discount_id = a[l].id;
            break;
        }
        var c = 0;
        n.data.user_level && 0 != n.data.user_level && n.data.user_rebate && n.data.user_rebate < 10 && (c = (c = parseFloat(r) * (1 - parseFloat(n.data.user_rebate) / 10)).toFixed(2)), 
        s.rebate_money = c, p = parseFloat(r + d - t - c).toFixed(2), s.order_money = parseFloat(r).toFixed(2), 
        "express" == n.data.send_type ? s.shipping_money = d : s.shipping_money = 0, parseFloat(p) < 0 && (p = 0), 
        s.pay_money = p, s.sku_id = u, s.user_name = getApp().getCache("userinfo").nickName, 
        s.buyer_id = getApp().getCache("userinfo").uid, n.setData({
            data: s,
            discount_money: t || 0,
            rebate_money: c
        }), e.total = i, n.setData({
            options: e
        });
    },
    submit: function(t) {
        var e = this, o = this.data;
        if (e.setData({
            formid: t.detail.formId
        }), o.submit) {
            if ("selftake" == o.send_type) {
                if (!o.data.phone) return a.error("请填写姓名"), !1;
                if (!o.data.phone) return a.error("请填写电话"), !1;
                if (!o.date) return a.error("请选择自提时间"), !1;
                o.data.mention_time = a.time_str(o.date + " " + o.time), o.data.mailing_type = 2;
            } else {
                if (!o.list.address.phone || "" == o.list.address.province) return a.error("请选择收货地址！"), 
                !1;
                o.data.mailing_type = 1;
            }
            a.get("Order/CreateOrder", o.data, function(t) {
                0 == t.code ? (a.get("Wxpush/CreateOrderPush", {
                    order_id: t.info,
                    formid: e.data.formid,
                    uid: getApp().getCache("userinfo").uid
                }, function(t) {
                    console.log(t);
                }), e.setData({
                    order_id: t.info
                }), e.data.options.cart_id && a.get("Cart/DelCart", {
                    cart_id: e.data.options.cart_id
                }, function(t) {
                    t.code, console.log(t);
                }), e.setData({
                    submit: !1
                }), wx.navigateTo({
                    url: "/yb_mingpian/pages/order/pay/index?id=" + t.info
                })) : a.alert(t.msg);
            });
        } else wx.navigateTo({
            url: "/yb_mingpian/pages/order/pay/index?id=" + e.data.order_id
        });
    },
    dataChange: function(t) {
        var a = this.data.data;
        this.data.list;
        switch (t.target.id) {
          case "buyer_message":
            a.buyer_message = t.detail.value;
            break;

          case "consigner":
            a.consigner = t.detail.value;
            break;

          case "phone":
            a.phone = t.detail.value;
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