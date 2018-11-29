var t = getApp(), a = t.requirejs("core"), c = t.requirejs("api/index"), e = (t.requirejs("icons"), 
t.requirejs("wxParse/wxParse"));

Page({
    data: {
        route: "index",
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
        hotimg: "/yb_mingpian/static/images/hotdot.jpg",
        notification: "/yb_mingpian/static/images/notification.png",
        background: t.config.background,
        page_bg_img: "",
        page_bg_color: "",
        showtabbar: !1,
        tabbar_index: 0,
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
        is_copyright: !1,
        bookData: {},
        default_pic: "/yb_mingpian/static/images/add_pic.jpg",
        form: [],
        card_id: 0,
        get_phone: !0,
        data: {}
    },
    formSubmit: function(t) {
        var e = {}, i = t.detail.value, o = i.url ? i.url : "", n = i.appid ? i.appid : "", s = i.path && i.path, r = i.title && i.title;
        s = i.path ? i.path : "", r = i.title ? i.title : "";
        c.to_url(i.key, o, n, s, r), e.formid = t.detail.formId, e.openid = getApp().getCache("userinfo").openid, 
        e.username = getApp().getCache("userinfo").nickName, a.get("Market/getFormid", e, function(t) {
            console.log(t);
        });
    },
    to_url: function(t) {
        var e = a.pdata(t), i = e.url ? e.url : "", o = e.appid ? e.appid : "", n = e.path ? e.path : "", s = e.title ? e.title : "";
        c.to_url(e.key, i, o, n, s);
    },
    menu_url: function(t) {
        a.menu_url(t, 2);
    },
    onLoad: function(e) {
        t.set_caidan();
        var a = this;
        e && e.pid && t.setCache("pid", e.pid), getApp().getExtC(function() {
            t.getCache("userinfo") && (t.userlog(1, "官网"), a.setData({
                display: !1
            })), a.getList();
        });
    },
    formBook: function(t) {
        var e = this, i = t.detail.value;
        "" != i.name ? 11 == i.phone.length ? (i.user_id = getApp().getCache("userinfo").uid, 
        a.get("Index/WriteBook", i, function(t) {
            0 == t.code ? (e.setData({
                bookData: {}
            }), a.success("提交成功")) : a.alert(t.msg);
        })) : a.error("手机号格式不正确") : a.error("姓名不能为空");
    },
    listenerTime: function(t) {
        this.setData({
            "bookData.book_time": t.detail.value
        });
    },
    onShow: function() {
        t.get_news_num(this), this.setData({
            card_id: t.globalData.card_id
        });
    },
    getList: function() {
        var e = this;
        c.indexMod(e, function(t) {
            e.setData(t);
        });
    },
    to_zhaopin: function(t) {
        var e = a.pdata(t).id;
        e && a.jump("/yb_mingpian/pages/zhaopin/index?id=" + e);
    },
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    navigate: function(t) {
        var e = a.pdata(t);
        e.name && e.lat && e.lng ? a.tx_map(e.lat, e.lng, e.name) : a.toast("不能获取到该位置");
    },
    phone: function(t) {
        a.phone(t);
    },
    formPower: function(t) {
        c.formSubmit(this, t);
    },
    bindPickerChange: function(t) {
        c.bindPickerChange(this, t);
    },
    listen_time_two: function(t) {
        c.listen_time_two(this, t);
    },
    chooseImageTap1: function(t) {
        var e = a.pdata(t).id;
        c.upload(this, e, "form_pic", 1);
    },
    chooseImageTap2: function(t) {
        var e = a.pdata(t).id;
        c.upload(this, e, "form_pic", 0);
    },
    Image_del: function(t) {
        c.Image_del(this, t);
    },
    previewImage: function(t) {
        var e = a.pdata(t).url, i = a.pdata(t).arr;
        a.previewImage(e, i, "imgurl");
    },
    copyright: function() {
        var t = this.data.is_copyright;
        this.setData({
            is_copyright: !t
        });
    },
    onShareAppMessage: function(t) {
        this.data;
        return {
            path: "/yb_mingpian/pages/index/index?pid=" + (getApp().getCache("userinfo").uid ? getApp().getCache("userinfo").uid : 0),
            success: function(t) {},
            fail: function(t) {}
        };
    },
    to_chat: function() {
        a.jump("/yb_mingpian/pages/chats/chats");
    },
    getPhoneNumber: function(e) {
        wx.checkSession({
            success: function() {
                console.log(111111);
            },
            fail: function() {
                console.log(2222222), getAPP().get_sessionKey();
            }
        }), getApp().getCache("sessionKey") || getAPP().get_sessionKey(), console.log(e);
        var i = this, o = {};
        o.staff_id = t.globalData.card_id, o.user_id = getApp().getCache("userinfo").uid, 
        a.get("Card/getPhone", o, function(t) {
            console.log(t), 0 == t.code ? i.to_chat() : "getPhoneNumber:ok" == e.detail.errMsg ? (o.sessionKey = getApp().getCache("sessionKey"), 
            o.iv = e.detail.iv, o.encryptedData = e.detail.encryptedData, a.post("Card/savePhone", o, function(t) {
                i.to_chat();
            })) : i.to_chat();
        }), console.log(e.detail.errMsg), console.log(e.detail.iv), console.log(e.detail.encryptedData);
    }
});