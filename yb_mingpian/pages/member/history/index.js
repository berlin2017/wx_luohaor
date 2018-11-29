var t = getApp(), e = t.requirejs("core");

Page({
    data: {
        icons: t.requirejs("icons"),
        page: 1,
        loading: !1,
        loaded: !1,
        isedit: !1,
        isCheckAll: !1,
        checkObj: {},
        checkNum: 0,
        list: []
    },
    onLoad: function() {
        this.getList();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getList: function() {
        var a = this;
        a.setData({
            loading: !0
        }), e.get("member/history/get_list", {
            page: a.data.page,
            openid: getApp().globalData.openid
        }, function(t) {
            var e = {
                loading: !1,
                loaded: !0,
                total: t.total,
                pagesize: t.pagesize,
                show: !0
            };
            0 < t.list.length && (e.page = a.data.page + 1, e.list = a.data.list.concat(t.list), 
            t.list.length < t.pagesize && (e.loaded = !0)), a.setData(e);
        });
    },
    itemClick: function(t) {
        var a = this, i = e.pdata(t).id, s = e.pdata(t).goodsid;
        if (a.data.isedit) {
            var c = a.data.checkObj, l = a.data.checkNum;
            c[i] ? (c[i] = !1, l--) : (c[i] = !0, l++);
            var o = !0;
            for (var n in c) if (!c[n]) {
                o = !1;
                break;
            }
            a.setData({
                checkObj: c,
                isCheckAll: o,
                checkNum: l
            });
        } else wx.navigateTo({
            url: "/yb_mingpian/pages/goods/detail/index?id=" + s
        });
    },
    btnClick: function(t) {
        var a = this, i = t.currentTarget.dataset.action;
        if ("edit" == i) {
            var s = {};
            for (var c in this.data.list) s[this.data.list[c].id] = !1;
            a.setData({
                isedit: !0,
                checkObj: s,
                isCheckAll: !1
            });
        } else if ("delete" == i) {
            s = a.data.checkObj;
            var l = [];
            for (var c in s) s[c] && l.push(c);
            if (l.length < 1) return;
            e.confirm("删除后不可恢复，确定要删除吗？", function() {
                e.post("member/history/remove", {
                    ids: l
                }, function(t) {
                    e.toast("删除成功"), a.setData({
                        isedit: !1,
                        checkNum: 0
                    }), a.getList();
                });
            });
        } else "finish" == i && a.setData({
            isedit: !1,
            checkNum: 0
        });
    },
    checkAllClick: function() {
        var t = !this.data.isCheckAll, e = this.data.checkObj, a = {
            isCheckAll: t,
            checkObj: e
        };
        for (var i in e) a.checkObj[i] = t;
        a.checkNum = t ? this.data.list.length : 0, this.setData(a);
    }
});