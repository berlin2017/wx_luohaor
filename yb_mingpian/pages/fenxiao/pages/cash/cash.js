var app = getApp(), a = app.requirejs("core"), loading = !1;

function min(a, e) {
    return a = parseFloat(a), (e = parseFloat(e)) < a ? e : a;
}

Page({
    data: {
        cash_max_day: -1,
        selected: -1
    },
    onLoad: function(a) {},
    onShow: function() {
        var t = this, i = t.data.cash_max_day, n = app.getCache("shareSetting");
        a.get("Distribe/userinfo", {
            uid: app.getCache("userinfo").uid
        }, function(e) {
            0 == e.code ? (n.max_money && 0 != n.max_money && (i = parseFloat(n.max_money) - parseFloat(e.info.today_price)), 
            t.setData({
                user_info: e.info,
                share_setting: n,
                cash_max_day: i,
                show: !0
            })) : a.alert(e.msg, function() {
                a.jump("", 5);
            });
        }, !0);
    },
    onPullDownRefresh: function() {},
    formSubmit: function(e) {
        var t = this, i = parseFloat(parseFloat(e.detail.value.cash).toFixed(2)), n = t.data.user_info.price;
        if (-1 != t.data.cash_max_day && (n = min(n, t.data.cash_max_day)), i) if (n < i) a.alert("提现金额不能超过" + n + "元"); else if (i < parseFloat(t.data.share_setting.min_money)) a.alert("提现金额不能低于" + t.data.share_setting.min_money + "元"); else {
            var s = t.data.selected;
            if (0 == s || 1 == s || 2 == s || 3 == s) {
                if (0 == s || 1 == s || 2 == s) {
                    if (!(d = e.detail.value.name) || null == d) return void a.warning("姓名不能为空");
                    if (!(r = e.detail.value.mobile) || null == r) return void a.warning("账号不能为空");
                }
                if (2 == s) {
                    if (!(o = a.detail.value.bank_name) || null == o) return void a.warning("开户行不能为空");
                } else var o = "";
                if (3 == s) var r = o = "", d = "";
                if (loading) return;
                loading = !0, a.loading("正在提交"), a.get("Distribe/addCash", {
                    price: i,
                    name: d,
                    mobile: r,
                    bank_name: o,
                    pay_type: s,
                    user_id: app.getCache("userinfo").uid
                }, function(e) {
                    a.hideLoading(), loading = !1, 0 == e.code ? (a.success("申请成功"), setTimeout(function() {
                        a.jump("../index/index", 2);
                    }, 1e3)) : a.alert(e.msg);
                });
            } else a.warning("请选择提现方式");
        } else a.warning("请输入提现金额");
    },
    showCashMaxDetail: function() {
        wx.showModal({
            title: "提示",
            content: "今日剩余提现金额=平台每日可提现金额-今日所有用户提现金额"
        });
    },
    select: function(a) {
        var e = a.currentTarget.dataset.index;
        e != this.data.check && this.setData({
            name: "",
            mobile: "",
            bank_name: ""
        }), this.setData({
            selected: e
        });
    }
});