var app = getApp(), core = app.requirejs("core");

Page({
    data: {
        route: "caregory",
        menu: app.tabBar,
        menu_show: !1,
        curHdIndex: 0,
        category: {},
        cate_type: 0,
        toView: "inToView0"
    },
    menu_url: function(t) {
        core.menu_url(t, 2);
    },
    onPullDownRefresh: function() {
        this.getCategory(), wx.stopPullDownRefresh();
    },
    tabFun: function(t) {
        console.log(t);
        var e = core.data(t).id;
        console.log(e), this.setData({
            curHdIndex: e
        });
    },
    scroll: function(t) {
        for (var e = this, a = 0, o = t.detail.scrollTop, n = e.data.category, r = 0; r < n.length && (0 == e.data.cate_type ? n[r].num = Math.ceil(n[r].cate.length / 3) : n[r].num = Math.ceil(n[r].goods_list.length / 3), 
        !(o < (a += 40 + 80 * n[r].num))); r++) ;
        e.setData({
            scrollTop: o,
            curHdIndex: r
        });
    },
    scrollToViewFn: function(t) {
        var e = t.target.dataset.id;
        this.setData({
            toView: "inToView" + e
        });
    },
    getCategory: function() {
        var e = this, a = [], o = [];
        core.get("goods/GetCate", {}, function(t) {
            0 == t.code ? ((a = t.info).forEach(function(t) {
                t.cate && 0 != t.cate.length && o.push(t.cate_id);
            }), 0 == o.length ? (e.setData({
                cate_type: 1
            }), core.get("goods/CateGoods", {}, function(t) {
                0 == t.code ? (console.log(22), e.setData({
                    category: t.info
                })) : core.alert(t.msg);
            })) : e.setData({
                category: a
            })) : core.alert(t.msg);
        });
    },
    onLoad: function(t) {
        null != t && null != t && this.setData({
            tabbar_index: t.tabbar_index ? t.tabbar_index : -1
        }), this.setData({
            menu: getApp().tabBar
        }), 0 <= this.data.tabbar_index && this.setData({
            showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
        }), core.setting(), this.getCategory();
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return core.onShareAppMessage();
    }
});