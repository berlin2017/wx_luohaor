var t = getApp(), c = t.requirejs("api/index"), a = t.requirejs("core"), s = t.requirejs("wxParse/wxParse"), running = !1;

Page({
    data: {
        show: !1,
        default_pic: "/yb_mingpian/static/images/add_pic.jpg",
        form: [],
        data: {}
    },
    menu_url: function(t) {
        a.menu_url(t, 2);
    },
    onLoad: function(t) {
        a.setting(), this.setData(t), t.id ? this.get_info() : a.alert("未获取到预约信息");
    },
    get_info: function() {
        var i = this, t = i.data.id;
        a.get("Market/bookinfo", {
            id: t
        }, function(t) {
            0 == t.code ? (c.get_form_list(3, t.info.form_id, i), s.wxParse("wxParseData", "html", t.info.content, i, "0"), 
            i.setData({
                info: t.info,
                show: !0
            })) : a.alert(t.msg);
        });
    },
    formPower: function(i) {
        var n = this, o = n.data.form, e = i.detail.value;
        c.validate(e, o, function(i) {
            0 == i && (e = JSON.stringify(c.to_str(e, o)), a.loading("正在提交中..."), a.post("Market/submitbook", {
                data: e,
                form: JSON.stringify(o),
                thing_id: n.data.info.id,
                user_id: t.getCache("userinfo").uid
            }, function(t) {
                a.hideLoading(), 0 == t.code ? (a.success("提交成功"), setTimeout(function() {
                    n.get_info();
                }, 1e3)) : a.alert(t.msg);
            }));
        });
    },
    bindPickerChange: function(t) {
        c.bindPickerChange(this, t);
    },
    listen_time_two: function(t) {
        c.listen_time_two(this, t);
    },
    chooseImageTap1: function(t) {
        var i = a.pdata(t).id;
        c.upload(this, i, "book_pic", 1);
    },
    chooseImageTap2: function(t) {
        var i = a.pdata(t).id;
        c.upload(this, i, "book_pic", 0);
    },
    Image_del: function(t) {
        c.Image_del(this, t);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});