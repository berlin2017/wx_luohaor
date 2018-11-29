var app = getApp(), a = app.requirejs("core"), f = app.requirejs("api/index");

Page({
    data: {
        route: "form",
        menu: app.tabBar,
        menu_show: !1,
        config: app.config,
        default_pic: "/yb_mingpian/static/images/add_pic.jpg",
        show: !1,
        form: [],
        data: {}
    },
    menu_url: function(t) {
        a.menu_url(t, 2);
    },
    formSubmit: function(t) {
        f.formSubmit(this, t);
    },
    bindPickerChange: function(t) {
        f.bindPickerChange(this, t);
    },
    listen_time_two: function(t) {
        f.listen_time_two(this, t);
    },
    chooseImageTap1: function(t) {
        var i = a.pdata(t).id;
        f.upload(this, i, "form_pic", 1);
    },
    chooseImageTap2: function(t) {
        var i = a.pdata(t).id;
        f.upload(this, i, "form_pic", 0);
    },
    Image_del: function(t) {
        f.Image_del(this, t);
    },
    get_list: function() {
        var t = this.data.id;
        "" == app.getCache("userinfo") && (a.toast("您还没登录呢"), setTimeout(function() {
            wx.redirectTo({
                url: "/yb_mingpian/pages/index/index"
            });
        }, 1e3)), f.get_form_list(1, t, this);
    },
    onLoad: function(t) {
        null != t && null != t && this.setData({
            tabbar_index: t.tabbar_index ? t.tabbar_index : -1
        }), a.setting(), this.setData({
            menu: getApp().tabBar
        }), this.setData(t), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        }), this.get_list();
    },
    onShareAppMessage: function() {}
});