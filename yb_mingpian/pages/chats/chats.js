var t = getApp(), a = t.requirejs("core"), loading = !1;

Page({
    data: {
        list: [],
        post_message: "",
        post_type: 1,
        pic_show: !1,
        pic_path: "",
        status: !0,
        show_news: !1,
        state: 0,
        send_ok: !1
    },
    onLoad: function(a) {
        var t = this;
        t.getInfo();
        var e = setInterval(function() {
            t.data.status || clearInterval(e), t.getnews();
        }.bind(this), 1e3);
    },
    chooseImageTap1: function(t) {
        var e = a.pdata(t).id;
        this.upload(this, e, "chat_pic");
    },
    onHide: function() {
        console.log(2122);
    },
    onUnload: function() {
        console.log(3344), this.setData({
            status: !1
        });
    },
    getnews: function() {
        var e = this;
        e.data.list;
        wx.request({
            url: t.siteInfo.siteroot + "?i=" + t.siteInfo.uniacid + "&t=undefined&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=Card_timelynews&staff_id=" + t.globalData.card_id + "&user_id=" + t.getCache("userinfo").uid + "&m=yb_mingpian&sign=1d917db727d0aa4e23ca117826fa3153",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if ("request:ok" == t.errMsg) {
                    if ("string" == typeof t.data && 0 <= t.data.indexOf("html") && 0 <= t.data.indexOf("head") && 0 <= t.data.indexOf("body")) return;
                    if ("" == t.data) return;
                    "string" == typeof t.data && (t.data = a.json_parse(t.data)), 0 == t.data.code && (e.data.send_ok && (e.setData({
                        post_type: 1,
                        pic_path: "",
                        post_message: "",
                        pic_show: !1,
                        show_news: !1,
                        state: 0,
                        send_ok: !1
                    }), e.pageScrollToBottom(100 * t.data.info.length)), e.setData({
                        list: t.data.info
                    }));
                }
            }
        });
    },
    bindconfirm: function(e) {
        if (e.detail && e.detail.formId) {
            var o = {};
            o.formid = e.detail.formId, o.openid = getApp().getCache("userinfo").openid, o.username = getApp().getCache("userinfo").nickName, 
            a.get("Market/getFormid", o, function(a) {
                console.log(a);
            });
        }
        if (!loading) {
            var i = this, n = i.data.post_type;
            if (i.setData({
                show_news: !0,
                state: 1
            }), 1 == n) {
                if (!(s = (s = i.data.post_message).replace(/\s*/g, ""))) return void a.warning("内容不能为空");
            } else {
                if ("" == i.data.pic_path) return void a.warning("发送图片失败");
                var s = i.data.pic_path;
            }
            loading = !0, a.post("Card/addnews", {
                staff_id: t.globalData.card_id,
                user_id: t.getCache("userinfo").uid,
                post_message: s,
                post_type: n
            }, function(t) {
                console.log(t), a.hideLoading(), loading = !1, i.setData({
                    send_ok: !0
                }), 1 == t.code && i.setData({
                    state: 2
                });
            });
        }
    },
    getInfo: function() {
        var e = this;
        a.get("Card/CardInfo", {
            id: t.globalData.card_id
        }, function(t) {
            0 == t.code ? (a.ReName(t.info.user_name ? t.info.user_name : "聊天"), e.setData({
                show: !0,
                info: t.info
            })) : a.alert(t.msg);
        });
    },
    show_pic_button: function() {
        var a = this.data.pic_show;
        this.setData({
            pic_show: !a
        });
    },
    pageScrollToBottom: function(t) {
        console.log("滚动到底部"), wx.createSelectorQuery().select("#bd").boundingClientRect(function(a) {
            wx.pageScrollTo({
                scrollTop: t
            });
        }).exec();
    },
    Clipboard: function(e) {
        var o = a.pdata(e);
        t.userlog(3, "微信"), a.Clipboard(o.i);
    },
    phone: function(e) {
        t.userlog(5, "电话"), a.phone(e);
    },
    url: function(t) {
        var e = a.pdata(t).i;
        1 == e ? a.jump("/yb_mingpian/pages/cardinfo/index", 4) : 2 == e ? a.jump("/yb_mingpian/pages/index/index", 4) : 3 == e ? a.jump("/yb_mingpian/pages/shop/index", 4) : 4 == e && a.jump("/yb_mingpian/pages/message/index", 4);
    },
    upload: function(t, e, o) {
        var i = this;
        wx.showActionSheet({
            itemList: [ "从相册中选择", "拍照" ],
            itemColor: "#f7982a",
            success: function(a) {
                a.cancel || (0 == a.tapIndex ? i.chooseWxImage("album", t, e, o) : 1 == a.tapIndex && i.chooseWxImage("camera", t, e, o));
            }
        });
    },
    chooseWxImage: function(t, e, o, i) {
        var n = getApp().siteInfo, s = n.siteroot + "?i=" + n.uniacid + "&t=undefined&v=" + n.version + "&from=wxapp&c=entry&a=wxapp&do=index_uploadFile&path=" + i + "&m=yb_mingpian&sign=5201314";
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ t ],
            success: function(t) {
                wx.uploadFile({
                    url: s,
                    filePath: t.tempFilePaths[0],
                    name: "file_upload",
                    success: function(t) {
                        null != t.data && "" != t.data ? (console.log(t.data), e.setData({
                            pic_path: t.data,
                            post_type: 2
                        }), e.bindconfirm()) : a.error("上传失败，请重试");
                    }
                });
            }
        });
    },
    bindblur: function(a) {
        console.log(a), this.setData({
            post_message: a.detail.value
        });
    }
});