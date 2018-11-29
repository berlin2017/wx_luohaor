var t = getApp(), e = t.requirejs("core"), s = t.requirejs("wxParse/wxParse"), n = 0, r = [], d = [];

Page({
    data: {
        route: "goods_detail",
        menu: t.tabBar,
        menu_show: !1,
        icons: t.requirejs("icons"),
        goods: {},
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        circular: !0,
        advWidth: 0,
        info: "active",
        para: "",
        slider: "",
        buyType: "",
        pickerOption: {},
        specsData: [],
        specsTitle: "",
        tempname: "",
        showPicker: !1,
        total: 1,
        canBuy: !0,
        optionid: 0,
        spec_Show: !0,
        button_color: t.config.button_color,
        font_color: t.config.font_color,
        config: t.config,
        display: !0
    },
    onGotUserInfo: function(a) {
        var e = this, o = t.getCache("userinfo");
        e.setData({
            display: !1
        }), o || t.getUserInfo(a.detail.userInfo, function(t) {
            1e3 != t || e.setData({
                display: !0
            });
        });
    },
    menu_url: function(t) {
        e.menu_url(t, 2);
    },
    onLoad: function(a) {
        t.getCache("userinfo") && this.setData({
            display: !1
        }), null != a && null != a && this.setData({
            tabbar_index: a.tabbar_index ? a.tabbar_index : -1
        }), e.setting(), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        });
        var o = this;
        o.setData({
            menu: getApp().tabBar,
            options: a,
            button_color: getApp().config.button_color,
            font_color: getApp().config.font_color,
            config: getApp().config
        }), wx.getSystemInfo({
            success: function(t) {
                o.setData({
                    advWidth: t.windowWidth
                });
            }
        });
    },
    onShow: function() {
        var t = this.data.options;
        this.getDetail(t), this.GoodsClicks(t);
    },
    url: function() {
        var a = "/yb_mingpian/pages/member/cart/index?key=1";
        wx.navigateTo({
            url: a,
            fail: function(t) {
                0 <= t.errMsg.indexOf("tabbar") && e.jump(a, 4);
            }
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    GoodsClicks: function(t) {
        e.get("goods/GoodsClicks", {
            goods_id: t.id
        }, function(t) {});
    },
    buyNow: function(t) {
        var a = this, e = a.data.optionid;
        1 < a.data.goods.sku.length ? (0 == e && wx.showToast({
            title: "请选择规格",
            icon: "loading",
            duration: 1e3
        }), wx.redirectTo({
            url: "/yb_mingpian/pages/order/create/index?goods_id=" + a.data.options.id + "&total=" + a.data.total + "&sku_id=" + e + "&uid=" + getApp().getCache("userinfo").uid
        })) : wx.redirectTo({
            url: "/yb_mingpian/pages/order/create/index?goods_id=" + a.data.options.id + "&total=" + a.data.total + "&sku_id=" + a.data.goods.sku[0].sku_id + "&uid=" + getApp().getCache("userinfo").uid
        });
    },
    getCart: function(t) {
        var a = this, o = "", i = a.data.optionid;
        if (1 < a.data.goods.sku.length) {
            if (0 == i) return void e.alert("请选择规格！");
            o = i;
        } else o = a.data.goods.sku[0].sku_id;
        e.get("Cart/AddCart", {
            buyer_id: getApp().getCache("userinfo").uid,
            num: a.data.total,
            sku_id: o,
            goods_id: a.data.goods.goods_id,
            goods_name: a.data.goods.goods_name,
            goods_images: a.data.goods.images
        }, function(t) {
            0 == t.code ? (wx.showToast({
                title: "成功添加到购物车",
                icon: "success",
                duration: 1500
            }), a.setData({
                active: "",
                slider: "out",
                "goods.cart": a.data.goods.cart + a.data.total
            })) : e.alert(t.msg);
        });
    },
    selectPicker: function(t) {
        var a = this, e = t.currentTarget.dataset.tap, o = t.currentTarget.dataset.buytype;
        if (a.setData({
            active: "active",
            slider: "in",
            tempname: "select-picker",
            buyType: o
        }), d = this.data.goods.sku, 0 != a.data.goods.goods_spec_format.length) {
            a.setData({
                optionid: d[0].sku_id,
                "goods.stock": d[0].stock,
                "goods.promote_price": d[0].promote_price,
                "goods.cost_price": d[0].cost_price,
                "goods.market_price": d[0].market_price,
                "goods.price": d[0].price,
                "goods.sku_pic": null != d[0].pic ? d[0].pic.img_cover : ""
            }), console.log(d[0]), d[0].stock <= 0 ? a.setData({
                canBuy: !1
            }) : a.setData({
                canBuy: !0
            });
            var i = a.data.goods.goods_spec_format, s = (e = "", []);
            i.forEach(function(t, a) {
                s[a] = {
                    id: t.spec_id,
                    vid: t.value[0].spec_value_id,
                    spec_name: t.value[0].spec_value_name
                }, e += t.value[0].spec_value_name + "， ";
            }), a.setData({
                specsData: s,
                specsTitle: e
            });
        } else d[0].stock <= 0 ? a.setData({
            canBuy: !1
        }) : a.setData({
            canBuy: !0
        }), a.setData({
            "goods.sku_pic": null != d[0].pic ? d[0].pic.img_cover : ""
        });
    },
    specsTap: function(t) {
        var a = this, e = "", o = "", i = t.target.dataset.idx;
        (r = a.data.specsData)[i] = {
            id: t.target.dataset.id,
            vid: t.target.dataset.vid,
            spec_name: t.target.dataset.spec_name
        }, r.forEach(function(t) {
            e += t.spec_name + "， ", o += t.id + ":" + t.vid + ";";
        }), o = o.substring(0, o.length - 1), d.forEach(function(t) {
            t.attr_value_items == o && (a.setData({
                optionid: t.sku_id,
                "goods.stock": t.stock,
                "goods.promote_price": t.promote_price,
                "goods.cost_price": t.cost_price,
                "goods.market_price": t.market_price,
                "goods.price": t.price,
                "goods.sku_pic": null != t.pic ? t.pic.img_cover : ""
            }), t.stock <= 0 ? a.setData({
                canBuy: !1
            }) : a.setData({
                canBuy: !0
            }));
        }), a.setData({
            specsData: r,
            specsTitle: e
        });
    },
    number: function(t) {
        var a = e.data(t), o = e.pdata(t), i = o.value;
        if (!t.target.dataset.action) return !1;
        if ("minus" === a.action) {
            if (!(1 < i && i > o.min)) return e.toast("已是最少购买量");
            i -= 1;
        } else if ("plus" === a.action) {
            if (!(i < o.max)) return e.toast("最多购买" + o.max + "件");
            i += 1;
        }
        this.setData({
            total: i
        });
    },
    emptyActive: function() {
        this.setData({
            active: "",
            slider: "out"
        });
    },
    getDetail: function(t) {
        var a = this, o = "";
        a.setData({
            loading: !0
        }), e.get("goods/GoodsDetail", {
            goods_id: t.id,
            uid: getApp().getCache("userinfo").uid
        }, function(t) {
            console.log(t), 0 == t.code ? (1 == t.info.sku.length && a.setData({
                optionid: -1
            }), o = t.info.min_buy ? t.info.min_buy : 1, s.wxParse("wxParseData", "html", t.info.description, a, "0"), 
            a.setData({
                show: !0,
                goods: t.info,
                total: o
            }), wx.setNavigationBarTitle({
                title: t.info.goods_name || "商品详情"
            })) : e.alert(t.msg);
        });
    },
    goodsTab: function(t) {
        var a = t.currentTarget.dataset.tap;
        "info" == a ? this.setData({
            info: "active",
            para: ""
        }) : "para" == a && this.setData({
            info: "",
            para: "active"
        });
    },
    favorite: function(t) {
        var a = this, o = t.currentTarget.dataset.logprice;
        e.get("goods/Favorites", {
            fav_id: a.data.options.id,
            log_price: o,
            uid: getApp().getCache("userinfo").uid
        }, function(t) {
            0 == t.code ? 1 == t.info.status ? a.setData({
                "goods.favorites": !0
            }) : a.setData({
                "goods.favorites": !1
            }) : e.alert(t.msg);
        });
    },
    onShareAppMessage: function() {
        var t = this.data.goods.goods_name, a = getApp().getCache("userinfo").uid ? getApp().getCache("userinfo").uid : 0;
        return {
            title: t,
            path: "/yb_mingpian/pages/goods/detail/index?id=" + this.data.goods.goods_id + "&pid=" + a
        };
    }
});