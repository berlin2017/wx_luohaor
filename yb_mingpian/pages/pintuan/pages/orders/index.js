var app = getApp(), a = app.requirejs("core");

Page({
    data: {
        currentTab: 0,
        scrollTop: 0,
        scrollLeft: 0,
        page: 1,
        ordersList: [],
        loading: !0
    },
    onLoad: function(t) {
        var a = t.id;
        this.data.currentTab = a || 0, this.systemInfo = wx.getSystemInfoSync(), this.setData({
            currentTab: this.data.currentTab,
            windowHeight: this.systemInfo.windowHeight
        });
    },
    onShow: function(t) {
        0 == this.data.currentTab && this.setCurrentData();
    },
    setCurrentData: function() {
        var e = this;
        e.setData({
            loading: !0
        }), a.get("Pintuan/ptOrderList", {
            page: e.data.page,
            status: e.data.currentTab,
            uid: getApp().getCache("userinfo").uid
        }, function(t) {
            console.log(t), 0 == t.code ? (e.setData({
                loading: !1,
                show: !0
            }), 0 < t.info.length && e.setData({
                page: e.data.page + 1,
                ordersList: e.data.ordersList.concat(t.info)
            }), t.info.length < 10 && e.setData({
                loaded: !0
            })) : a.alert(t.msg);
        }, !0);
    },
    toGroupDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        app.redirect("group/detail", "id=" + a);
    },
    toPay: function(t) {
        wx.showLoading({
            title: "正在提交",
            mask: !0
        });
        var e = this, r = t.currentTarget.dataset;
        a.get("Pintuan/ptPay", {
            oid: r.id,
            openid: getApp().getCache("userinfo").openid
        }, function(t) {
            wx.hideLoading(), 0 == t.code ? wx.requestPayment({
                timeStamp: t.info.timeStamp,
                nonceStr: t.info.nonceStr,
                package: t.info.package,
                signType: "MD5",
                paySign: t.info.paySign,
                success: function(t) {
                    console.log(t), 1 == r.isGroup ? wx.redirectTo({
                        url: "/yb_mingpian/pages/pintuan/pages/group/detail?id=" + r.id
                    }) : (e.setData({
                        ordersList: [],
                        page: 1,
                        loaded: !1
                    }), e.setCurrentData());
                },
                fail: function(t) {}
            }) : a.alert(t.msg, function() {
                wx.redirectTo({
                    url: "/yb_mingpian/pages/pintuan/pages/orders/index"
                });
            });
        });
    },
    confirmReceipt: function(t) {
        var e = this, r = t.currentTarget.dataset.id;
        wx.showModal({
            content: "是否确认收货？",
            success: function(t) {
                t.confirm && a.get("Pintuan/SignOrder", {
                    id: r,
                    uid: getApp().getCache("userinfo").uid
                }, function(t) {
                    0 == t.code ? (a.success("收货成功"), setTimeout(function() {
                        e.setData({
                            ordersList: [],
                            page: 1,
                            loaded: !1
                        }), e.setCurrentData();
                    })) : a.alert(t.msg);
                });
            }
        });
    },
    tuikuan: function(t) {
        var e = this, r = t.currentTarget.dataset.id;
        wx.showModal({
            content: "是否要申请退款？",
            success: function(t) {
                t.confirm && a.get("Pintuan/refundOrder", {
                    id: r,
                    uid: getApp().getCache("userinfo").uid
                }, function(t) {
                    0 == t.code ? (a.success("申请成功"), setTimeout(function() {
                        e.setData({
                            ordersList: [],
                            page: 1,
                            loaded: !1
                        }), e.setCurrentData();
                    })) : a.alert(t.msg);
                });
            }
        });
    },
    showOrderDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        app.redirect("orders/detail", "oid=" + a);
    },
    showGoodsDetial: function(t) {
        var a = t.currentTarget.dataset.id;
        app.redirect("goods/detail", "gid=" + a);
    },
    bindChange: function(t) {
        this.data.page = 0, this.data.ordersList = [], this.data.loading = !0, this.data.currentTab = t.detail.current, 
        this.setCurrentData(), this.setData({
            loading: !0,
            ordersList: [],
            currentTab: this.data.currentTab
        });
    },
    swichNav: function(t) {
        if (this.data.currentTab != t.currentTarget.dataset.current) {
            this.data.currentTab = t.currentTarget.dataset.current;
            var a = this.systemInfo.windowWidth, e = t.currentTarget.offsetLeft, r = this.data.scrollLeft;
            r = a / 2 < e ? e : 0, this.setData({
                scrollLeft: r,
                currentTab: this.data.currentTab
            });
        }
    },
    onPullDownRefresh: function() {
        this.setData({
            ordersList: [],
            page: 1,
            loaded: !1
        }), this.setCurrentData(), wx.stopPullDownRefresh();
    },
    scrolltolower: function() {
        console.log("加载更多"), this.data.loaded || this.setCurrentData();
    }
});