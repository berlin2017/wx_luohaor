var t = getApp(), a = t.requirejs("check"), e = t.requirejs("core");

Page({
    data: {
        route: "member_cart",
        menu: t.tabBar,
        menu_show: !1,
        icons: t.requirejs("icons"),
        show: !1,
        edit_list: [],
        list: [],
        edit: !1,
        merch_list: !1,
        ischeckall: !0,
        member_change: !0,
        delBtnWidth: 160,
        config: t.config
    },
    menu_url: function(t) {
        e.menu_url(t, 2);
    },
    onLoad: function(a) {
        var i = this;
        null != a && null != a && i.setData({
            tabbar_index: a.tabbar_index ? a.tabbar_index : -1
        }), e.setting(), i.initEleWidth(), i.setData({
            menu: getApp().tabBar,
            config: getApp().config
        });
        var c = t.isInArray(getApp().tabBar.list, i.data.route);
        a.key && 1 == a.key && c && i.setData({
            tabbar_index: c,
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        }), 0 <= i.data.tabbar_index && i.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        }), i.get_cart();
    },
    touchS: function(t) {
        1 == t.touches.length && this.setData({
            startX: t.touches[0].clientX
        });
    },
    touchM: function(t) {
        if (1 == t.touches.length) {
            var e = t.touches[0].clientX, a = this.data.startX - e, i = this.data.delBtnWidth, c = "";
            0 == a || a < 0 ? c = "left:0px" : 0 < a && (c = "left:-" + a + "px", i <= a && (c = "left:-" + i + "px"));
            var n = t.currentTarget.dataset.index, r = this.data.list;
            r[n].txtStyle = c, this.setData({
                list: r
            });
        }
    },
    touchE: function(t) {
        if (1 == t.changedTouches.length) {
            var e = t.changedTouches[0].clientX, a = this.data.startX - e, i = this.data.delBtnWidth, c = i / 2 < a ? "left:-" + i + "px" : "left:0px", n = t.currentTarget.dataset.index, r = this.data.list;
            r[n].txtStyle = c, this.setData({
                list: r
            });
        }
    },
    getEleWidth: function(t) {
        try {
            var e = wx.getSystemInfoSync().windowWidth, a = 375 / (t / 2);
            return Math.floor(e / a);
        } catch (t) {
            return !1;
        }
    },
    initEleWidth: function() {
        var t = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: t
        });
    },
    delItem: function(t) {
        var a = this, i = e.data(t).id;
        e.confirm("是否确认删除该商品?", function() {
            e.get("Cart/DelCart", {
                cart_id: i
            }, function(t) {
                0 == t.code ? (e.success("删除成功"), setTimeout(function() {
                    a.setData({
                        edit: !1
                    }), a.get_cart();
                }, 1e3)) : e.alert(t.msg);
            });
        });
    },
    onShow: function() {},
    onPullDownRefresh: function() {
        this.get_cart(), wx.stopPullDownRefresh();
    },
    get_cart: function() {
        var a, i = {}, c = this;
        e.get("Cart/cart", {
            uid: getApp().getCache("userinfo").uid
        }, function(t) {
            for (var e in t.info.forEach(function(t) {
                t.txtStyle = "";
            }), 0 == t.info.length ? c.setData({
                empty: 1
            }) : c.setData({
                empty: !1
            }), t.info) i[t.info[e].cart_id] = !0;
            a = {
                show: !0,
                checkObj: i,
                ischeckall: !0,
                list: t.info || [],
                checkNum: t.info.length
            }, c.setData(a), c.caculate();
        }, !0);
    },
    caculate: function() {
        var t = this, e = 0, a = 0, i = t.data.checkObj;
        t.data.list.forEach(function(t) {
            i[t.cart_id] && t.sku && (a += t.num, e += parseFloat(t.num * t.sku.price));
        }), t.setData({
            order_money: e,
            total: a
        });
    },
    number: function(t) {
        var a = this, i = e.pdata(t), c = i.value, n = i.id;
        if (!t.target.dataset.action) return console.log(11), !1;
        if ("minus" == t.target.dataset.action) {
            if (c <= 1) return !1;
            c = parseInt(c) - 1;
        }
        if ("plus" == t.target.dataset.action) {
            if (c >= i.max) return e.toast("最大购买量 " + i.max + "件！"), !1;
            c = parseInt(c) + 1;
        }
        e.post("Cart/cartNum", {
            cart_id: n,
            num: c
        }, function(t) {
            0 == t.code && a.get_cart();
        });
    },
    checkAllClick: function(t) {
        t = !this.data.ischeckall;
        var e = this.data.checkObj, a = {
            ischeckall: t,
            checkObj: e
        };
        for (var i in e) a.checkObj[i] = t;
        a.checkNum = t ? this.data.list.length : 0, this.setData(a), this.caculate();
    },
    itemClick: function(t) {
        var a = e.pdata(t).id, i = (e.pdata(t).goodsid, this.data.checkObj), c = this.data.checkNum;
        i[a] ? (i[a] = !1, c--) : (i[a] = !0, c++);
        var n = !0;
        for (var r in i) if (!i[r]) {
            n = !1;
            break;
        }
        console.log(i), this.setData({
            checkObj: i,
            ischeckall: n,
            checkNum: c
        }), this.caculate();
    },
    edit: function(t) {
        var i = e.data(t), c = this;
        switch (i.action) {
          case "edit":
            this.setData({
                edit: !0
            });
            break;

          case "complete":
            this.setData({
                edit: !1
            });
            break;

          case "move":
            a.isObject(void 0) || e.post("member/cart/tofavorite", {
                ids: void 0
            }, function(t) {
                c.get_cart();
            });
            break;

          case "delete":
            i = c.data.checkObj;
            var n = [];
            for (var r in i) i[r] && n.push(r);
            if (n.length < 1) return;
            n = n.toString(), e.confirm("是否确认删除该商品?", function() {
                e.post("Cart/DelCart", {
                    cart_id: n
                }, function(t) {
                    0 == t.code ? (e.toast("删除成功"), c.setData({
                        edit: !1
                    }), c.get_cart()) : e.alert(t.msg);
                });
            });
            break;

          case "pay":
            i = c.data.checkObj;
            var s = c.data.list;
            n = [];
            if (s.forEach(function(t) {
                i[t.cart_id] && t.sku && n.push(t.cart_id);
            }), n.length < 1) return;
            n = n.toString(), wx.navigateTo({
                url: "/yb_mingpian/pages/order/create/index?cart_id=" + n + "&uid=" + getApp().getCache("userinfo").uid + "&type=cart"
            });
        }
    },
    onShareAppMessage: function() {
        return e.onShareAppMessage();
    }
});