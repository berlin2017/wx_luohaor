function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = getApp(), a = t.requirejs("core"), c = t.requirejs("api/index"), e = (t.requirejs("icons"), 
t.requirejs("wxParse/wxParse"));

Page({
    data: _defineProperty({
        route: "power",
        menu: t.tabBar,
        menu_show: !1,
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        circular: !0,
        icons: t.requirejs("icons"),
        total: 0,
        page: 1,
        show: !1,
        display: !0,
        card_id: 0,
        get_phone: !0,
        hotimg: "/yb_mingpian/static/images/hotdot.jpg",
        notification: "/yb_mingpian/static/images/notification.png",
        default_pic: "/yb_mingpian/static/images/add_pic.jpg",
        background: t.config.background,
        showtabbar: !1,
        markers: [ {
            iconPath: "/yb_mingpian/static/images/red_position_icon.png",
            title: "地理位置",
            latitude: 34.62845,
            longitude: 112.42821,
            width: 50,
            height: 50
        } ],
        video: !1,
        config: t.config,
        id: "0",
        bookData: {},
        bus: {
            name: "公司名称",
            logo: "/yb_mingpian/static/card/pt-img15.png"
        }
    }, "background", "/yb_mingpian/static/card/pt-img67.png"),
    menu_url: function(e) {
        a.menu_url(e, 2);
    },
    formSubmit: function(e) {
        var t = {}, i = e.detail.value, n = i.url ? i.url : "", o = i.appid ? i.appid : "", s = i.path && i.path, r = i.title && i.title;
        s = i.path ? i.path : "", r = i.title ? i.title : "";
        c.to_url(i.key, n, o, s, r), t.formid = e.detail.formId, t.openid = getApp().getCache("userinfo").openid, 
        t.username = getApp().getCache("userinfo").nickName, a.get("Market/getFormid", t, function(e) {
            console.log(e);
        });
    },
    to_url: function(e) {
        var t = a.pdata(e), i = t.url ? t.url : "", n = t.appid ? t.appid : "", o = t.path && t.path, s = t.title && t.title;
        o = t.path ? t.path : "", s = t.title ? t.title : "";
        c.to_url(t.key, i, n, o, s);
    },
    onGotUserInfo: function(e) {
        var a = this, i = t.getCache("userinfo");
        a.setData({
            display: !1
        }), i || t.getUserInfo(e.detail.userInfo, function(e) {
            1e3 != e ? (t.userlog(1, "商城"), t.get_news_num(a)) : a.setData({
                display: !0
            });
        });
    },
    onLoad: function(e) {
        t.set_caidan();
        var a = this;
        console.log(e), e && e.pid && t.setCache("pid", e.pid), e && e.scene && t.setCache("pid", parseInt(e.scene)), 
        getApp().getExtC(function() {
            t.getCache("userinfo") ? (t.userlog(1, "商城"), a.setData({
                display: !1
            })) : a.setData({
                display: !0
            }), a.getList();
        });
    },
    formBook: function(e) {
        var t = this, i = e.detail.value, n = getApp().getCache("userinfo").uid;
        if ("" != i.name) return null == n ? (a.error("请先登录"), void setTimeout(function() {
            a.jump("/yb_mingpian/pages/index/index", 2);
        }, 1e3)) : void (11 == i.phone.length ? (i.user_id = n, a.get("Index/WriteBook", i, function(e) {
            0 == e.code ? (t.setData({
                bookData: {}
            }), a.success("提交成功")) : a.alert(e.msg);
        })) : a.error("手机号格式不正确"));
        a.error("姓名不能为空");
    },
    onShow: function() {
        t.get_news_num(this), this.setData({
            card_id: t.globalData.card_id
        });
    },
    getList: function() {
        var t = this, e = t.data.id;
        c.indexMod(e, function(e) {
            console.log(e), t.setData(e);
        }, "ModShop");
    },
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    navigate: function(e) {
        var t = a.pdata(e);
        t.name && t.lat && t.lng ? a.tx_map(t.lat, t.lng, t.name) : a.toast("不能获取到该位置");
    },
    phone: function(e) {
        a.phone(e);
    },
    formPower: function(e) {
        c.formSubmit(this, e);
    },
    bindPickerChange: function(e) {
        c.bindPickerChange(this, e);
    },
    listen_time_two: function(e) {
        c.listen_time_two(this, e);
    },
    chooseImageTap1: function(e) {
        var t = a.pdata(e).id;
        c.upload(this, t, "form_pic", 1);
    },
    chooseImageTap2: function(e) {
        var t = a.pdata(e).id;
        c.upload(this, t, "form_pic", 0);
    },
    Image_del: function(e) {
        c.Image_del(this, e);
    },
    previewImage: function(e) {
        var t = a.pdata(e).url, i = a.pdata(e).arr;
        a.previewImage(t, i, "imgurl");
    },
    listenerTime: function(e) {
        this.setData({
            "bookData.book_time": e.detail.value
        });
    },
    formSubmit1: function(e) {
        var t = {};
        t.formid = e.detail.formId, t.openid = getApp().getCache("userinfo").openid, t.username = getApp().getCache("userinfo").nickName, 
        a.get("Market/getFormid", t, function(e) {
            console.log(e);
        }), a.jump("/yb_mingpian/pages/chats/chats");
    },
    to_chat: function() {
        a.jump("/yb_mingpian/pages/chats/chats");
    },
    getPhoneNumber: function(i) {
        wx.checkSession({
            success: function() {
                console.log(111111);
            },
            fail: function() {
                console.log(2222222), getAPP().get_sessionKey();
            }
        }), getApp().getCache("sessionKey") || getAPP().get_sessionKey(), console.log(i);
        var n = this, o = {};
        o.staff_id = t.globalData.card_id, o.user_id = getApp().getCache("userinfo").uid, 
        a.get("Card/getPhone", o, function(e) {
            console.log(e), 0 == e.code ? n.to_chat() : "getPhoneNumber:ok" == i.detail.errMsg ? (o.sessionKey = getApp().getCache("sessionKey"), 
            o.iv = i.detail.iv, o.encryptedData = i.detail.encryptedData, a.post("Card/savePhone", o, function(e) {
                n.to_chat();
            })) : n.to_chat();
        }), console.log(i.detail.errMsg), console.log(i.detail.iv), console.log(i.detail.encryptedData);
    },
    to_path: function(e) {
        var t = a.pdata(e).i;
        1 == t ? a.jump("/yb_mingpian/pages/member/cart/index") : 2 == t && a.jump("/yb_mingpian/pages/member/index/index");
    },
    onShareAppMessage: function(e) {
        this.data;
        return {
            path: "/yb_mingpian/pages/shop/index?pid=" + (getApp().getCache("userinfo").uid ? getApp().getCache("userinfo").uid : 0),
            success: function(e) {},
            fail: function(e) {}
        };
    }
});