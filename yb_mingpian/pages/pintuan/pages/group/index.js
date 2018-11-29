var app = getApp(), a = app.requirejs("core");

Page({
    data: {
        currentTab: 0,
        scrollTop: 0,
        page: 0,
        groupList: [],
        loading: !0
    },
    onLoad: function(t) {
        var a = wx.getSystemInfoSync();
        this.setData({
            windowHeight: a.windowHeight
        }), this.setCurrentData();
    },
    onShow: function() {},
    setCurrentData: function() {
        var e = this;
        e.setData({
            loading: !0
        }), a.get("Pintuan/ptGroupList", {
            page: e.data.page,
            status: e.data.currentTab,
            uid: getApp().getCache("userinfo").uid
        }, function(t) {
            console.log(t), 0 == t.code ? (e.setData({
                loading: !1,
                show: !0
            }), 0 < t.info.length && e.setData({
                page: e.data.page + 1,
                groupList: e.data.groupList.concat(t.info)
            }), t.info.length < 10 && e.setData({
                loaded: !0
            })) : a.alert(t.msg);
        }, !0);
    },
    showGoodsDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        a && app.redirect("goods/detail", "gid=" + a);
    },
    showGroupInfo: function(t) {
        var a = t.currentTarget.dataset.id;
        app.redirect("group/detail", "id=" + a);
    },
    showOrderInfo: function(t) {
        var a = t.currentTarget.dataset.id;
        app.redirect("orders/detail", "oid=" + a);
    },
    bindChange: function(t) {
        this.data.page = 0, this.data.groupData = [], this.data.loading = !0, this.data.currentTab = t.detail.current, 
        this.setData({
            loading: !0,
            groupList: [],
            currentTab: this.data.currentTab
        }), this.setCurrentData();
    },
    swichNav: function(t) {
        this.data.currentTab != t.currentTarget.dataset.current && (this.data.currentTab = t.currentTarget.dataset.current, 
        this.setData({
            currentTab: this.data.currentTab
        }));
    },
    onPullDownRefresh: function() {
        this.setData({
            groupList: [],
            page: 1,
            loaded: !1
        }), this.setCurrentData(), wx.stopPullDownRefresh();
    },
    scrolltolower: function() {
        console.log("加载更多"), this.data.loaded || this.setCurrentData();
    }
});