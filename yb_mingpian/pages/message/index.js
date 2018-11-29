var t = getApp(), a = t.requirejs("core"), c = t.requirejs("api/index"), loading = !1;

Page({
    data: {
        route: "card",
        menu: t.tabBar,
        menu_show: !1,
        page: 1,
        list: [],
        loaded: [],
        show: !1,
        display: !1,
        showtabbar: !1,
        tabbar_index: 0,
        config: t.config,
        card_id: 0,
        get_phone: !0,
        tzuser_id: 0
    },
    onGotUserInfo: function(a) {
        var e = this, i = t.getCache("userinfo");
        e.setData({
            display: !1
        }), i || t.getUserInfo(a.detail.userInfo, function(t) {
            1e3 != t ? t.get_news_num(e) : e.setData({
                display: !0
            });
        });
    },
    menu_url: function(t) {
        a.menu_url(t, 2);
    },
    onLoad: function(a) {
        t.set_caidan();
        var e = this;
        getApp().getExtC(function() {
            null != a && null != a && e.setData({
                tabbar_index: a.tabbar_index ? a.tabbar_index : -1
            }), 0 <= e.data.tabbar_index && e.setData({
                showtabbar: !!getApp().tabBar.IsDiDis && getApp().tabBar.IsDiDis
            });
        });
    },
    onShow: function() {
        t.get_news_num(this), this.card_id == t.globalData.card_id && 0 != t.globalData.card_id || (this.setData({
            list: [],
            page: 1,
            loaded: !1
        }), this.getlist()), this.setData({
            card_id: t.globalData.card_id
        });
    },
    getlist: function() {
        if (!loading) {
            t.userlog(1, "动态"), loading = !0;
            var e = this;
            e.data.page;
            a.get("Card/message", {
                staff_id: t.globalData.card_id,
                page: e.data.page
            }, function(t) {
                loading = !1, 0 == t.code ? e.setData({
                    list: e.data.list.concat(t.info),
                    page: 0 == t.info.length ? e.data.page : e.data.page + 1,
                    loaded: t.info.length < 10,
                    show: !0
                }) : a.alert(t.msg);
            }, !e.data.show);
        }
    },
    click: function(t) {
        var e = a.pdata(t).index;
        this.setData({
            hidden: e != this.data.hidden ? e : -1
        });
    },
    select: function(t) {
        var e = a.pdata(t).status;
        this.setData({
            page: 1,
            list: [],
            loaded: !1,
            status: e
        }), this.getlist();
    },
    previewImage: function(t) {
        var a = t.currentTarget.dataset.id, e = [], i = t.currentTarget.dataset.index, n = this.data.list;
        for (var s in n) if (n[s].id == a) {
            var o = n[s].pic_arr;
            for (var d in console.log(o), o) e.push(o[d]);
            wx.previewImage({
                current: o[i],
                urls: e
            });
        }
    },
    colse_more: function(t) {
        var e = a.pdata(t), i = this.data.list;
        i[e.index].more = !1, this.setData({
            list: i
        });
    },
    show_more: function(t) {
        var e = a.pdata(t), i = this.data.list;
        console.log(e), e.more || i.forEach(function(t) {
            t.more = !1;
        }), i[e.index].more = !e.more, this.setData({
            list: i
        });
    },
    to_article: function(t) {
        var e = a.pdata(t).id;
        e && a.jump("/yb_mingpian/pages/find_info/index?id=" + e);
    },
    thumbs_up: function(t) {
        if (getApp().getCache("userinfo")) {
            var e = this, i = e.data.list, n = t.currentTarget.dataset.index, s = t.currentTarget.dataset.id, o = getApp().getCache("userinfo");
            a.get("Card/Zan", {
                c_id: s,
                user_id: o.uid,
                type_zan: 2
            }, function(t) {
                0 == t.code ? (a.success("点赞成功"), i[n].zan.unshift({
                    user_headimg: o.avatarUrl,
                    nick_name: o.nickName
                })) : a.toast("不能重复点赞"), i[n].more = !1, console.log(i), e.setData({
                    list: i
                });
            });
        } else this.setData({
            display: !0
        });
    },
    formSubmit: function(t) {
        var e = {};
        e.formid = t.detail.formId, e.openid = getApp().getCache("userinfo").openid, e.username = getApp().getCache("userinfo").nickName, 
        a.get("Market/getFormid", e, function(t) {
            console.log(t);
        }), a.jump("/yb_mingpian/pages/chats/chats");
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
        var i = this, n = {};
        n.staff_id = t.globalData.card_id, n.user_id = getApp().getCache("userinfo").uid, 
        a.get("Card/getPhone", n, function(t) {
            console.log(t), 0 == t.code ? i.to_chat() : "getPhoneNumber:ok" == e.detail.errMsg ? (n.sessionKey = getApp().getCache("sessionKey"), 
            n.iv = e.detail.iv, n.encryptedData = e.detail.encryptedData, a.post("Card/savePhone", n, function(t) {
                i.to_chat();
            })) : i.to_chat();
        }), console.log(e.detail.errMsg), console.log(e.detail.iv), console.log(e.detail.encryptedData);
    },
    comm: function(t) {
        if (getApp().getCache("userinfo")) {
            var e = this.data.list, i = a.pdata(t);
            e[i.index].more = !1, this.setData({
                comm: !0,
                list: e,
                in_id: i.id,
                tzuser_id: getApp().getCache("userinfo").uid,
                comm_index: i.index
            });
        } else this.setData({
            display: !0
        });
    },
    show_comm: function() {
        this.setData({
            comm: !1
        });
    },
    comm_submit: function(e) {
        var i = this, n = t.getCache("userinfo"), s = i.data.list, o = e.detail.value;
        loading || (loading = !0, a.loading("评论提交中"), a.get("Card/Comment", {
            in_id: o.in_id,
            details: o.content,
            user_id: n.uid
        }, function(t) {
            a.hideLoading();
            var e = {
                comm: loading = !1
            };
            0 == t.code ? (s[o.index].comment.unshift({
                details: o.content,
                nick_name: n.nickName
            }), e.list = s, i.setData(e), a.success("评论成功")) : a.warning(t.msg);
        }));
    },
    onPullDownRefresh: function() {
        this.setData({
            list: [],
            page: 1,
            loaded: !1
        }), this.getlist(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("加载更多"), this.data.loaded || this.getlist();
    },
    onShareAppMessage: function() {}
});