var t = getApp(), a = t.requirejs("core"), s = t.requirejs("wxParse/wxParse");

Page({
    onReady: function(e) {
        this.audioCtx = wx.createAudioContext("myAudio");
    },
    data: {
        id: 0,
        dlopenarr: [ "" ],
        like: !1,
        display: !1,
        show: !1,
        source: 1,
        kaiguaninfo: "展开全部名片信息",
        card_id: 0,
        get_phone: !0,
        share: !1,
        news_num: 0,
        fenfa_id: 0
    },
    show_share: function() {
        var e = !this.data.share;
        this.setData({
            share: e
        });
    },
    onGotUserInfo: function(e) {
        var a = this, o = t.getCache("userinfo");
        a.setData({
            display: !1
        }), o || t.getUserInfo(e.detail.userInfo, function(e) {
            1e3 != e ? a.get_card_id(function() {
                a.isLike(), t.userlog(1, "名片"), a.setData({
                    card_id: t.globalData.card_id
                }), a.getInfo();
            }) : a.setData({
                display: !0
            });
        });
    },
    dlopenclose: function(e) {
        var a, t = this, o = e.currentTarget.dataset.id, i = t.data.dlopenarr;
        "open" == i[o] ? (a = "", t.setData({
            kaiguaninfo: "展开全部名片信息"
        })) : (a = "open", t.setData({
            kaiguaninfo: "收起以下名片信息"
        })), i[o] = a, t.setData({
            dlopenarr: i
        });
    },
    onLoad: function(a) {
        t.set_caidan();
        var o = this;
        getApp().getExtC(function() {
            if (a && a.id && (t.globalData.card_id = a.id), a && a.pid && t.setCache("pid", a.pid), 
            a && a.scene) {
                var e = parseInt(a.scene);
                t.globalData.card_id = parseInt(a.scene), a.id = t.globalData.card_id, e < 0 && (e = -e, 
                o.setData({
                    fenfa_id: e
                })), a.source = 2;
            }
            0 == t.globalData.card_id && o.to_cardlist(), o.setData(a), console.log(t.globalData.card_id), 
            t.getCache("userinfo") ? (o.get_card_id(function(e) {
                console.log(e), o.isLike();
            }), o.setData({
                card_id: t.globalData.card_id,
                display: !1
            })) : o.setData({
                card_id: t.globalData.card_id,
                display: !0
            });
        });
    },
    get_card_id: function(o) {
        if (0 == this.data.fenfa_id || 0 < t.globalData.card_id) "function" == typeof o && o(22); else {
            var i = this;
            a.get("Card/sendcard", {
                id: i.data.fenfa_id
            }, function(e) {
                0 == e.code ? (t.globalData.card_id = parseInt(e.info), i.setData({
                    card_id: t.globalData.card_id
                }), "function" == typeof o && o(11)) : a.alert(e.msg);
            });
        }
    },
    onShow: function() {
        var e = this;
        t.getCache("userinfo") && e.get_card_id(function() {
            e.setData({
                card_id: t.globalData.card_id
            }), e.getInfo();
        });
    },
    isLike: function() {
        var o = this;
        a.get("Card/isLike", {
            c_id: t.globalData.card_id,
            user_id: t.getCache("userinfo").uid,
            type_zan: 1
        }, function(e) {
            console.log(e), 0 == e.code && o.setData({
                like: !0
            });
        }), a.get("Card/SaveCard", {
            staff_id: t.globalData.card_id,
            user_id: t.getCache("userinfo").uid,
            source: o.data.source,
            fenfa_id: o.data.fenfa_id
        }, function(e) {
            console.log(e);
        });
    },
    to_cardlist: function() {
        a.jump("/yb_mingpian/pages/card/index");
    },
    getInfo: function() {
        var o = this, e = o.data.id;
        t.get_news_num(o), t.userlog(1, "名片"), a.get("Card/CardInfo", {
            id: t.globalData.card_id,
            user: e
        }, function(e) {
            console.log(e), 0 == e.code && (1 != e.info.is_relay && wx.hideShareMenu(), e.info.profile && s.wxParse("wxParseData", "html", e.info.profile, o, "0"), 
            o.setData({
                show: !0,
                info: e.info
            }));
        }, !o.data.show);
    },
    previewImage: function(e) {
        var a = this.data.info.head_photo;
        wx.previewImage({
            current: a,
            urls: [ a ]
        });
    },
    my_photo: function(e) {
        var t = a.pdata(e).index, o = this.data.info.pic_arr;
        wx.previewImage({
            current: o[t],
            urls: o
        });
    },
    Clipboard: function(e) {
        var o = a.pdata(e);
        t.userlog(3, o.type), a.Clipboard(o.i);
    },
    phone: function(e) {
        t.userlog(5, "电话"), a.phone(e);
    },
    addPhoneContact: function() {
        t.userlog(4, "名片");
        var e = this.data.info;
        wx.addPhoneContact({
            firstName: e.user_name,
            mobilePhoneNumber: e.tel ? e.tel : "",
            weChatNumber: e.wechat_number ? e.wechat_number : "",
            organization: e.bus && e.bus.name ? e.bus.name : "",
            title: e.position ? e.position : "",
            workPhoneNumber: e.phone ? e.phone : ""
        });
    },
    likes: function() {
        var o = this;
        a.get("Card/Zan", {
            c_id: t.globalData.card_id,
            user_id: getApp().getCache("userinfo").uid,
            type_zan: 1
        }, function(e) {
            if (0 == e.code) {
                var a = o.data.info.likes;
                o.data.like ? a-- : a++, o.setData({
                    like: !o.data.like,
                    "info.likes": a
                });
            }
        });
    },
    effect_tag: function(e) {
        var o = this, i = a.pdata(e).index, n = o.data.info.effect_tag;
        n[i] = parseInt(n[i]) + 1, t.getCache("tag_" + i) || a.get("Card/SaveEffectTag", {
            id: t.globalData.card_id,
            data: JSON.stringify(n)
        }, function(e) {
            console.log(e), 0 == e.code && (getApp().setCache("tag_" + i, i, 3600), o.setData({
                "info.effect_tag": n
            }));
        });
    },
    to_goods: function(e) {
        var t = a.pdata(e).id;
        0 == t ? a.jump("/yb_mingpian/pages/product/index") : a.jump("/yb_mingpian/pages/goods/detail/index?id=" + t);
    },
    formSubmit: function(e) {
        var t = {};
        t.formid = e.detail.formId, t.openid = getApp().getCache("userinfo").openid, t.username = getApp().getCache("userinfo").nickName, 
        a.get("Market/getFormid", t, function(e) {
            console.log(e);
        }), a.jump("/yb_mingpian/pages/chats/chats");
    },
    bindconfirm: function(e) {
        var t = {};
        t.formid = e.detail.formId, t.openid = getApp().getCache("userinfo").openid, t.username = getApp().getCache("userinfo").nickName, 
        a.get("Market/getFormid", t, function(e) {
            console.log(e);
        });
    },
    to_poster: function() {
        a.jump("/yb_mingpian/pages/poster/index?id=" + this.data.info.id);
    },
    to_chat: function() {
        a.jump("/yb_mingpian/pages/chats/chats");
    },
    getPhoneNumber: function(o) {
        wx.checkSession({
            success: function() {
                console.log(111111);
            },
            fail: function() {
                console.log(2222222), getAPP().get_sessionKey();
            }
        }), getApp().getCache("sessionKey") || getAPP().get_sessionKey(), console.log(o);
        var i = this, n = {};
        n.staff_id = t.globalData.card_id, n.user_id = getApp().getCache("userinfo").uid, 
        a.get("Card/getPhone", n, function(e) {
            console.log(e), 0 == e.code ? i.to_chat() : "getPhoneNumber:ok" == o.detail.errMsg ? (n.sessionKey = getApp().getCache("sessionKey"), 
            n.iv = o.detail.iv, n.encryptedData = o.detail.encryptedData, a.post("Card/savePhone", n, function(e) {
                i.to_chat();
            })) : i.to_chat();
        }), console.log(o.detail.errMsg), console.log(o.detail.iv), console.log(o.detail.encryptedData);
    },
    getPhoneNumber2: function(o) {
        wx.checkSession({
            success: function() {
                console.log(111111);
            },
            fail: function() {
                console.log(2222222), getAPP().get_sessionKey();
            }
        }), getApp().getCache("sessionKey") || getAPP().get_sessionKey(), console.log(o);
        var i = this, n = {};
        n.staff_id = t.globalData.card_id, n.user_id = getApp().getCache("userinfo").uid, 
        a.get("Card/getPhone", n, function(e) {
            console.log(e), 0 == e.code ? i.addPhoneContact() : "getPhoneNumber:ok" == o.detail.errMsg ? (n.sessionKey = getApp().getCache("sessionKey"), 
            n.iv = o.detail.iv, n.encryptedData = o.detail.encryptedData, a.post("Card/savePhone", n, function(e) {
                i.addPhoneContact();
            })) : i.addPhoneContact();
        }), console.log(o.detail.errMsg), console.log(o.detail.iv), console.log(o.detail.encryptedData);
    },
    onPullDownRefresh: function() {
        this.getInfo(), this.isLike(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {
        t.userlog(2, "名片");
        var e = "你好,我是" + this.data.info.bus.name + " 的 " + this.data.info.user_name + ",这是我的名片请惠存", a = getApp().getCache("userinfo").uid ? getApp().getCache("userinfo").uid : 0;
        return {
            title: e,
            path: "yb_mingpian/pages/cardinfo/index?source=3&id=" + t.globalData.card_id + "&pid=" + a
        };
    }
});