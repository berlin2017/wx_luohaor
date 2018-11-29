var app = getApp(), a = app.requirejs("core"), b = app.requirejs("api/kjb");

Page({
    data: {
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        countDownDay: 0,
        countDownHour: 0,
        countDownMinute: 0,
        countDownSecond: 0,
        list: [],
        show_time: !0
    },
    onLoad: function(i) {
        a.setting(), this.setData(i), this.detail(), this.goodslist();
    },
    detail: function() {
        var t = this, a = t.data.id;
        b.kj_detail(a, t, function(a) {
            if (t.setData(a), a.bargain_info.end_time) {
                var i = a.bargain_info.end_time;
                wx.setNavigationBarTitle({
                    title: a.bargain_info.bargain_name || "活动详情"
                }), b.Countdown(i, function(a) {
                    t.setData(a);
                });
            }
        });
    },
    goodslist: function() {
        var i = this;
        b.kj_list("", 1, 1, i, function(a) {
            i.setData(a);
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            list: []
        }), this.detail(), this.goodslist(), wx.stopPullDownRefresh();
    },
    navigate: function() {
        var i = this.data.about_info;
        i.name && i.lat && i.lng ? a.tx_map(i.lat, i.lng, i.name) : a.toast("获取位置失败");
    },
    url: function(i) {
        var t = a.pdata(i);
        wx.navigateTo({
            url: "/yb_mingpian/pages/kanjia/goods_info/index?id=" + t.id
        });
    },
    shoping: function(i) {
        var t = this;
        a.pdata(i);
        return t.data.show_time ? t.data.bargain_info.bargain_inventory < 1 ? (a.alert("库存不足"), 
        !1) : void wx.navigateTo({
            url: "/yb_mingpian/pages/kanjia/order/create/index?bargain_id=" + t.data.bargain_info.id + "&total=1&uid=" + getApp().getCache("userinfo").uid + "&activity_order_type=0&current_price=" + t.data.bargain_info.original_price
        }) : (a.alert("该活动已经结束"), !1);
    },
    formSubmit: function(i) {
        var t = i.detail.formId, n = i.detail.value.id;
        a.pdata(i);
        return this.data.show_time ? this.data.bargain_info.bargain_inventory < 1 ? (a.alert("库存不足"), 
        !1) : void wx.navigateTo({
            url: "/yb_mingpian/pages/kanjia/discount_info/index?id=" + n + "&form_id=" + t
        }) : (a.alert("该活动已经结束"), !1);
    },
    phone: function(i) {
        a.phone(i);
    }
});