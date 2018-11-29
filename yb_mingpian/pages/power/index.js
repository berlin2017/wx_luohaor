var t = getApp(), a = t.requirejs("core"), c = t.requirejs("api/index"), e = (t.requirejs("icons"), 
t.requirejs("wxParse/wxParse"));

Page({
    data: {
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
        bookData: {}
    },
    menu_url: function(t) {
        a.menu_url(t, 2);
    },
    formSubmit: function(t) {
        var e = {}, i = t.detail.value, n = i.url ? i.url : "", o = i.appid ? i.appid : "", r = i.path && i.path, s = i.title && i.title;
        r = i.path ? i.path : "", s = i.title ? i.title : "";
        c.to_url(i.key, n, o, r, s), e.formid = t.detail.formId, e.openid = getApp().getCache("userinfo").openid, 
        e.username = getApp().getCache("userinfo").nickName, a.get("Market/getFormid", e, function(t) {
            console.log(t);
        });
    },
    to_url: function(t) {
        var e = a.pdata(t), i = e.url ? e.url : "", n = e.appid ? e.appid : "", o = e.path && e.path, r = e.title && e.title;
        o = e.path ? e.path : "", r = e.title ? e.title : "";
        c.to_url(e.key, i, n, o, r);
    },
    onLoad: function(t) {
        console.log(t);
        var e = this;
        null != t && null != t && e.setData({
            id: t.id,
            tabbar_index: t.tabbar_index ? t.tabbar_index : -1
        }), getApp().get_menu(function(t) {
            e.setData({
                menu: getApp().tabBar
            }), 0 <= e.data.tabbar_index && e.setData({
                showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
            }), e.getList(), a.setting();
        });
    },
    formBook: function(t) {
        var e = this, i = t.detail.value, n = getApp().getCache("userinfo").uid;
        if ("" != i.name) return null == n ? (a.error("请先登录"), void setTimeout(function() {
            a.jump("/yb_mingpian/pages/index/index", 2);
        }, 1e3)) : void (11 == i.phone.length ? (i.user_id = n, a.get("Index/WriteBook", i, function(t) {
            0 == t.code ? (e.setData({
                bookData: {}
            }), a.success("提交成功")) : a.alert(t.msg);
        })) : a.error("手机号格式不正确"));
        a.error("姓名不能为空");
    },
    onShow: function() {},
    getList: function() {
        var a = this, t = a.data.id;
        c.power(t, a, function(t) {
            a.setData({
                index: t.index,
                show: t.show
            });
        });
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
    listenerTime: function(t) {
        this.setData({
            "bookData.book_time": t.detail.value
        });
    },
    onShareAppMessage: function() {
        return a.onShareAppMessage();
    }
});