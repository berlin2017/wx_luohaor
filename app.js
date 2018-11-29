var e = require("/yb_mingpian/utils/core.js");

App({
    onLaunch: function(e) {
        var a = 0;
        e.query.pid && (a = e.query.pid), console.log(a), this.setCache("pid", a), this.getExtC(function() {});
    },
    userlog: function(a, t) {
        var n = this;
        n.getCache("userinfo") && e.get("Card/behavior", {
            staff_id: n.globalData.card_id,
            user_id: n.getCache("userinfo").uid,
            op_type: a,
            op_name: t
        }, function(e) {
            console.log(e);
        });
    },
    get_news_num: function(a) {
        var t = this;
        e.get("Card/wdnews", {
            user_id: t.getCache("userinfo").uid,
            staff_id: t.globalData.card_id
        }, function(e) {
            0 == e.code && a.setData({
                news_num: e.info
            });
        });
        var n = {};
        n.staff_id = t.globalData.card_id, n.user_id = t.getCache("userinfo").uid, e.get("Card/getPhone", n, function(e) {
            console.log(e), 0 == e.code ? a.setData({
                get_phone: !1
            }) : a.setData({
                get_phone: !0
            }), a.setData({
                phone_status: e.info
            });
        });
    },
    set_caidan: function() {
        wx.request({
            url: this.siteInfo.siteroot + "?i=" + this.siteInfo.uniacid + "&t=undefined&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=index_menu&m=yb_mingpian&sign=1d917db727d0aa4e23ca117826fa3153",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                if ("request:ok" == a.errMsg) {
                    if ("string" == typeof a.data && 0 <= a.data.indexOf("html") && 0 <= a.data.indexOf("head") && 0 <= a.data.indexOf("body")) return void e.error("请求错误！");
                    if ("" == a.data) return void console.log("请求异常！");
                    "string" == typeof a.data && (a.data = e.json_parse(a.data)), console.log(a.data), 
                    0 == a.data.code && a.data.info.forEach(function(e, a) {
                        wx.setTabBarItem({
                            index: a,
                            text: e.name ? e.name : "菜单",
                            iconPath: e.no_select,
                            selectedIconPath: e.is_select,
                            success: function(e) {
                                console.log("修改菜单成功");
                            },
                            fail: function(e) {
                                console.log("修改菜单失败");
                            }
                        });
                    }), wx.showTabBar();
                }
            }
        });
    },
    getExtC: function(e) {
        "function" == typeof e && e();
    },
    requirejs: function(e) {
        return require("yb_mingpian/utils/" + e + ".js");
    },
    get_menu: function(i) {
        var o = this;
        o.getCache("menu") ? i(2) : wx.request({
            url: o.siteInfo.siteroot + "?i=" + o.siteInfo.uniacid + "&t=undefined&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=index_menu&m=yb_mingpian&sign=1d917db727d0aa4e23ca117826fa3153",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                if ("request:ok" == a.errMsg) {
                    if ("string" == typeof a.data && 0 <= a.data.indexOf("html") && 0 <= a.data.indexOf("head") && 0 <= a.data.indexOf("body")) return void e.error("请求错误！");
                    if ("" == a.data) return void console.log("请求异常！");
                    if ("string" == typeof a.data && (a.data = e.json_parse(a.data)), 0 == a.data.code) {
                        null != a.data.info.tabBar.IsDiDis && null != a.data.info.tabBar.IsDiDis || (a.data.info.tabBar.IsDiDis = !0), 
                        o.setCache("menu", a.data.info.tabBar, 2), o.tabBar = a.data.info.tabBar;
                        var t = 0;
                        for (t = 0; t < o.tabBar.list.length; t++) {
                            var n = o.tabBar.list[t];
                            n.imgurl.indexOf("?") < 0 ? n.imgurl += "?tabbar_index=" + t : n.imgurl += "&tabbar_index=" + t;
                        }
                        o.config.background = a.data.info.tabBar.background ? a.data.info.tabBar.background : o.config.background, 
                        o.config.button_color = a.data.info.tabBar.background ? a.data.info.tabBar.background : o.config.button_color, 
                        o.config.alert_color = a.data.info.tabBar.background ? a.data.info.tabBar.background : o.config.alert_color, 
                        o.config.font_color = a.data.info.tabBar.backgroundTextStyle ? a.data.info.tabBar.backgroundTextStyle : o.config.font_color, 
                        o.config.selectedColor = a.data.info.tabBar.selectedColor ? a.data.info.tabBar.selectedColor : o.config.selectedColor;
                    }
                    i(1);
                } else e.alert(a.errMsg);
            }
        });
    },
    getUserInfo: function(t, n) {
        console.log("getUserInfo !!!!!!");
        var i = this, o = "", r = i.getCache("userinfo");
        r ? n && "function" == typeof n && n(r) : wx.login({
            success: function(a) {
                a.code ? (console.log(a), e.get("user/openid", {
                    wx_code: a.code
                }, function(a) {
                    return console.log(a), 0 != a.code ? (e.alert(a.msg), "function" == typeof n && n(1e3), 
                    !1) : a.info.errcode ? (e.alert("errcode:" + a.info.errcode + ";errmsg:" + a.info.errmsg), 
                    !1) : (o = a.info.openid, a.info.session_key, i.setCache("sessionKey", a.info.session_key), 
                    void e.get("user/Login", {
                        wx_openid: o,
                        nick_name: t.nickName,
                        user_headimg: t.avatarUrl,
                        pid: i.getCache("pid")
                    }, function(e) {
                        console.log(e), t.openid = o, t.uid = e.info, i.setCache("userinfo", t), n && "function" == typeof n && n(r);
                    }));
                })) : e.alert("获取用户登录态失败2");
            },
            fail: function() {
                "function" == typeof n && n(1e3), e.alert("获取用户信息失败");
            }
        });
    },
    get_sessionKey: function() {
        wx.login({
            success: function(a) {
                a.code ? (console.log(a), e.get("user/openid", {
                    wx_code: a.code
                }, function(a) {
                    return console.log(a), 0 != a.code ? (e.alert(a.msg), "function" == typeof t && t(1e3), 
                    !1) : a.info.errcode ? (e.alert("errcode:" + a.info.errcode + ";errmsg:" + a.info.errmsg), 
                    !1) : void n.setCache("sessionKey", a.info.session_key);
                })) : e.alert("获取用户登录态失败2");
            }
        });
    },
    isInArray: function(e, a) {
        for (var t = 0; t < e.length; t++) if (a == e[t].key) {
            var n = e[t].imgurl;
            return n.charAt(n.length - 1);
        }
        return !1;
    },
    tabBar: {
        name: "超级名片",
        background: "#F4F4F4",
        backgroundTextStyle: "#ffffff",
        backgroundColor: "#FFF5EE",
        color: "#8b8b8b",
        selectedColor: "#e02e24",
        list: [ {
            imgurl: "/yb_mingpian/pages/index/index",
            name: "首页",
            key: "index",
            page_icon: "/yb_mingpian/static/icon/gray_home.png",
            page_select_icon: "/yb_mingpian/static/icon/red_home.png"
        }, {
            imgurl: "/yb_mingpian/pages/class_article/index",
            name: "发现",
            key: "class_article",
            page_icon: "/yb_mingpian/static/icon/gray_find.png",
            page_select_icon: "/yb_mingpian/static/icon/red_find.png"
        }, {
            imgurl: "/yb_mingpian/pages/product/index",
            name: "商品",
            key: "product",
            page_icon: "/yb_mingpian/static/icon/gray_cate.png",
            page_select_icon: "/yb_mingpian/static/icon/red_cate.png"
        }, {
            imgurl: "/yb_mingpian/pages/member/cart/index",
            name: "购物车",
            key: "cart",
            page_icon: "/yb_mingpian/static/icon/gray_cart.png",
            page_select_icon: "/yb_mingpian/static/icon/red_cart.png"
        }, {
            imgurl: "/yb_mingpian/pages/member/index/index",
            name: "会员中心",
            key: "member_index",
            page_icon: "/yb_mingpian/static/icon/gray_people.png",
            page_select_icon: "/yb_mingpian/static/icon/red_people.png"
        } ]
    },
    getCache: function(e, a) {
        var t = +new Date() / 1e3, n = "";
        t = parseInt(t);
        try {
            (n = wx.getStorageSync(e + this.globalData.appid)).expire > t || 0 == n.expire ? n = n.value : (n = "", 
            this.removeCache(e));
        } catch (e) {
            n = void 0 === a ? "" : a;
        }
        return n || "";
    },
    setCache: function(e, a, t) {
        var n = +new Date() / 1e3, i = !0, o = {
            expire: t ? n + parseInt(t) : 0,
            value: a
        };
        try {
            wx.setStorageSync(e + this.globalData.appid, o);
        } catch (e) {
            i = !1;
        }
        return i;
    },
    removeCache: function(e) {
        var a = !0;
        try {
            wx.removeStorageSync(e + this.globalData.appid);
        } catch (e) {
            a = !1;
        }
        return a;
    },
    ab: function(e) {},
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js"),
    globalData: {
        appid: "liu2417301781",
        userInfo: null,
        card_id: 0,
        app_name: "壹佰小程序"
    },
    config: {
        background: "#8b8b8b",
        button_color: "#1aad19",
        alert_color: "#1aad19",
        font_color: "black",
        selectedColor: "#df2f20"
    },
    redirect: function(e, a) {
        wx.navigateTo({
            url: "/yb_mingpian/pages/pintuan/pages/" + e + "?" + a
        });
    },
    showModal: function(e) {
        var a = wx.createAnimation({
            duration: 200
        });
        a.opacity(0).rotateX(-100).step(), e.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.opacity(1).rotateX(0).step(), e.setData({
                animationData: a
            });
        }.bind(e), 200);
    },
    showToast: function(e, a) {
        var t = {};
        t.toastTitle = a, e.setData({
            toast: t
        });
        var n = wx.createAnimation({
            duration: 100
        });
        n.opacity(0).rotateY(-100).step(), t.toastStatus = !0, t.toastAnimationData = n.export(), 
        e.setData({
            toast: t
        }), setTimeout(function() {
            n.opacity(1).rotateY(0).step(), t.toastAnimationData = n, e.setData({
                toast: t
            });
        }.bind(e), 100), setTimeout(function() {
            t.toastStatus = !1, e.setData({
                toast: t
            });
        }.bind(e), 2e3);
    }
});