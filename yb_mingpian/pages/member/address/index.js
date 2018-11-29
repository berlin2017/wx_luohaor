var t = getApp(), e = t.requirejs("core");

Page({
    data: {
        route: "member_address",
        menu: t.tabBar,
        menu_show: !1,
        loaded: !1,
        list: []
    },
    menu_url: function(t) {
        e.menu_url(t, 2);
    },
    onLoad: function(a) {
        null != a && null != a && this.setData({
            tabbar_index: a.tabbar_index ? a.tabbar_index : -1
        }), e.setting(), "" == t.getCache("userinfo") && (e.toast("您还没登录呢"), setTimeout(function() {
            wx.redirectTo({
                url: "/yb_mingpian/pages/index/index"
            });
        }, 1e3)), this.setData({
            menu: getApp().tabBar,
            config: getApp().config
        }), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        });
    },
    onShow: function() {
        this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getList: function() {
        var a = this;
        e.get("user/AddressList", {
            uid: getApp().getCache("userinfo").uid
        }, function(t) {
            0 == t.code ? a.setData({
                loaded: !0,
                list: t.info,
                show: !0
            }) : a.setData({
                loaded: !0,
                list: [],
                show: !0
            });
        });
    },
    setDefault: function(t) {
        var i = this, s = e.pdata(t).id;
        i.setData({
            loaded: !1
        }), e.get("user/UpdateAddress", {
            id: s,
            uid: getApp().getCache("userinfo").uid,
            is_default: 1
        }, function(t) {
            if (0 != t.code) return i.setData({
                posting: !1
            }), void a.toast(i, t.msg);
            e.toast("设置成功"), i.getList();
        });
    },
    deleteItem: function(t) {
        var i = this, s = e.pdata(t).id;
        e.confirm("删除后无法恢复, 确认要删除吗 ?", function() {
            i.setData({
                loaded: !1
            }), e.get("user/DelAddress", {
                id: s
            }, function(t) {
                if (0 != t.code) return i.setData({
                    posting: !1
                }), void a.toast(i, t.msg);
                e.toast("删除成功"), i.getList();
            });
        });
    }
});