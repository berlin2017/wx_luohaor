var app = getApp(), a = app.requirejs("core"), loading = !1;

Page({
    data: {
        form: {
            name: "",
            mobile: ""
        },
        show: !1,
        img: "../../images/img-share-un.png",
        agree: 0
    },
    onLoad: function(e) {
        a.ReName(e.title), this.setData({
            share_setting: app.getCache("shareSetting")
        }), this.getInfo();
    },
    getInfo: function() {
        var n = this;
        a.get("Distribe/userinfo", {
            uid: app.getCache("userinfo").uid
        }, function(e) {
            0 == e.code ? n.setData({
                user_info: e.info,
                show: !0
            }) : a.alert(e.msg, function() {
                a.jump("", 5);
            });
        }, !0);
    },
    formSubmit: function(e) {
        var n = this;
        if (n.data.form = e.detail.value, null != n.data.form.name && "" != n.data.form.name) if (null != n.data.form.mobile && "" != n.data.form.mobile) {
            var i = e.detail.value;
            if (loading) return;
            loading = !0, i.form_id = e.detail.formId, 0 != n.data.agree ? (console.log(n.data.agree), 
            a.loading("正在提交"), i.user_id = app.getCache("userinfo").uid, a.get("Distribe/join", i, function(e) {
                a.hideLoading(), loading = !1, 0 == e.code ? (a.success("申请成功"), 1 == e.share_condition ? setTimeout(function() {
                    n.getInfo();
                }, 1e3) : a.jump("../index/index", 2)) : a.alert(e.msg, function() {
                    n.getInfo();
                });
            })) : a.warning("请先阅读并确认分销申请协议！！");
        } else a.warning("请填写联系方式！"); else a.warning("请填写姓名！");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    agreement: function() {
        wx.showModal({
            title: "分销协议",
            content: this.data.share_setting.agree,
            showCancel: !1,
            confirmText: "我已阅读",
            confirmColor: "#ff4544",
            success: function(e) {
                e.confirm && console.log("用户点击确定");
            }
        });
    },
    agree: function() {
        var e = this, a = e.data.agree;
        0 == a ? (a = 1, e.setData({
            img: "../../images/img-share-agree.png",
            agree: a
        })) : 1 == a && (a = 0, e.setData({
            img: "../../images/img-share-un.png",
            agree: a
        }));
    }
});