var app = getApp(), a = app.requirejs("core"), info = app.getCache("userinfo"), s = app.requirejs("wxParse/wxParse");

module.exports = {
    to_url: function(t, e) {
        var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "", n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "", o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : "";
        if (1 == t) e && 0 < e.length && a.jump(e); else if (2 == t) wx.navigateToMiniProgram({
            appId: i,
            path: n,
            extraData: {
                foo: "bar"
            },
            envVersion: "release",
            success: function(t) {
                console.log("打开成功");
            },
            fail: function(t) {
                a.alert("请绑定小程序");
            }
        }); else {
            if (3 != t) return;
            a.jump("/yb_mingpian/pages/web/index?url=" + escape(n) + "&name=" + o);
        }
    },
    getArea: function() {
        a.get("area/GetArea", {}, function(t) {
            app.globalData.areas = t.areas;
        });
    },
    article_list: function(t, e, i, n, o) {
        var r = {};
        a.get("Article/Article", {
            page: e,
            ident: t,
            class_id: i
        }, function(t) {
            0 == t.code ? (t.info.info ? (0 < t.info.info.length && (r.page = e + 1, r.list = n.data.list.concat(t.info.info), 
            t.info.info.length < 10 && (r.loaded = !0)), 0 == t.info.info.length && (r.loaded = !0)) : r.loaded = !0, 
            r.show = !0, wx.setNavigationBarTitle({
                title: t.info.article_name ? decodeURIComponent(t.info.article_name) : "列表"
            }), r.class_style = t.info.class_style) : a.alert(t.msg, function() {}), "function" == typeof o && o(r);
        }, !0);
    },
    ArticleInfo: function(t, e, i, n) {
        var o = {};
        a.get("Article/ArticleInfo", {
            article_id: e,
            ident: t
        }, function(t) {
            wx.setNavigationBarTitle({
                title: t.info.title ? decodeURIComponent(t.info.title) : "详情"
            }), 0 == t.code ? (s.wxParse("wxParseData", "html", t.info.content, i, "0"), o.detail = t.info, 
            o.show = !0, "function" == typeof n && n(o)) : a.alert(t.msg);
        }, !0);
    },
    ImageInfo: function(t, e, i, n, o) {
        var r = {};
        a.get("Album/Album", {
            page: e,
            ident: t,
            group_id: i
        }, function(t) {
            0 == t.code ? (t.info.info ? (0 < t.info.info.length && (r.page = e + 1, r.list = n.data.list.concat(t.info.info), 
            t.info.info.length < 10 && (r.loaded = !0)), 0 == t.info.info.length && (r.loaded = !0)) : r.loaded = !0, 
            r.show = !0, wx.setNavigationBarTitle({
                title: t.info.group_name ? t.info.group_name : "相册"
            })) : a.alert(t.msg, function() {}), "function" == typeof o && o(r);
        }, !0);
    },
    indexMod: function(e, i) {
        var t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "modindex", n = this, o = {}, r = wx.getSystemInfoSync().windowWidth;
        r = wx.getSystemInfoSync().windowWidth;
        a.get("index/" + t, {}, function(t) {
            "string" == typeof t && (t = a.json_parse(t)), console.log(t), 0 == t.code ? (2 == t.info.type ? wx.setNavigationBarTitle({
                title: "产品"
            }) : 3 == t.info.type && wx.setNavigationBarTitle({
                title: "商城"
            }), t.info.all_data.forEach(function(t) {
                "advert" == t.type && (t.high = r * t.ly_height / t.ly_width), "banner" == t.type && (t.high = r * t.ly_height / 10), 
                "position" == t.type && 2 == t.is_display && e.setData({
                    "markers[0].latitude": t.latitude,
                    "markers[0].longitude": t.longitude,
                    "markers[0].title": t.position_name
                }), "rich_text" == t.type && (s.wxParse("wxParseData_" + t.time_key, "html", t.content, e, "0"), 
                t.wxParseData = e.data["wxParseData_" + t.time_key].nodes), "edit_piclist" == t.type && (t.arr = a.str(t.list)), 
                t.type, "comment" == t.type && n.comment(e, t.is_display), "edit_music" == t.type && n.play_music(t.title, t.author, t.imgurl, t.music_url), 
                "edit_form" == t.type && t.param && "" != t.param && 0 != t.param && (n.get_form_list(2, t.param, e), 
                o.id = t.param);
            }), o.index = t.info.all_data, o.page_type = t.info.name, o.type = t.info.type, 
            o.show = !0, "function" == typeof i && i(o)) : a.alert(t.msg ? t.msg : "数据异常");
        }, !0);
    },
    power: function(t, e, i) {
        var n = this, o = {}, r = wx.getSystemInfoSync().windowWidth;
        a.get("index/power", {
            id: t
        }, function(t) {
            0 == t.code ? (wx.setNavigationBarTitle({
                title: t.info.name ? t.info.name : "万能页面"
            }), t.info.all_data.forEach(function(t) {
                "advert" == t.type && (t.high = r * t.ly_height / t.ly_width), "banner" == t.type && (t.high = r * t.ly_height / 10), 
                "position" == t.type && 2 == t.is_display && e.setData({
                    "markers[0].latitude": t.latitude,
                    "markers[0].longitude": t.longitude,
                    "markers[0].title": t.position_name
                }), "rich_text" == t.type && (s.wxParse("wxParseData_" + t.time_key, "html", t.content, e, "0"), 
                t.wxParseData = e.data["wxParseData_" + t.time_key].nodes), "edit_piclist" == t.type && (t.arr = a.str(t.list)), 
                t.type, "comment" == t.type && n.comment(e, t.is_display), "edit_music" == t.type && n.play_music(t.title, t.author, t.imgurl, t.music_url), 
                "edit_form" == t.type && t.param && "" != t.param && 0 != t.param && (n.get_form_list(3, t.param, e), 
                o.id = t.param);
            }), o.index = t.info.all_data, o.show = !0, "function" == typeof i && i(o)) : a.alert(t.msg);
        }, !0);
    },
    play_music: function(t, e, a, i) {
        if (i && "" != i) {
            var n = wx.getBackgroundAudioManager();
            n.title = t, n.singer = e, n.coverImgUrl = a, n.src = i;
        }
    },
    comment: function(i, t) {
        a.get("Index/CommentList", {
            num: t
        }, function(t) {
            if (0 == t.code) {
                var a = {
                    sroce: t.info.sroce,
                    count: t.info.count
                };
                a.commentlist = t.info.info, i.setData(a);
            } else e.alert(t.msg);
        });
    },
    Article_Class: function(t, i) {
        var e = {};
        wx.getSystemInfo({
            success: function(t) {
                var e = .5 * (t.windowWidth - 20) * .9;
                i.setData({
                    height: e
                });
            }
        }), a.get("Article/ArticleClass", {
            ident_class: t
        }, function(t) {
            0 == t.code ? t.info && (e.list = t.info, e.show = !0, i.setData(e)) : a.alert(t.msg);
        }, !0);
    },
    Album_Class: function(t, i) {
        var e = {};
        wx.getSystemInfo({
            success: function(t) {
                var e = .5 * (t.windowWidth - 20) * .9;
                i.setData({
                    height: e
                });
            }
        }), a.get("Album/AlbumImages", {
            ident_class: t
        }, function(t) {
            0 == t.code ? t.info && (e.list = t.info, e.show = !0, i.setData(e)) : a.alert(t.msg);
        }, !0);
    },
    formSubmit: function(e, t) {
        var i = this, n = e.data.form, o = t.detail.value;
        i.validate(o, n, function(t) {
            0 == t && (o = JSON.stringify(i.to_str(o, n)), a.loading("正在提交中..."), a.post("index/submitform", {
                data: o,
                form: JSON.stringify(n),
                bus_form_id: e.data.form_id,
                user_id: app.getCache("userinfo").uid
            }, function(t) {
                a.hideLoading(), 0 == t.code ? (a.success("提交成功"), setTimeout(function() {
                    e.get_list();
                }, 1e3)) : a.alert(t.msg);
            }));
        });
    },
    bindPickerChange: function(t, e) {
        var a = e.target.id, i = t.data.data;
        i[a] = e.detail.value, t.setData({
            data: i
        });
    },
    listen_time_two: function(t, e) {
        var i = e.target.id, n = e.currentTarget.dataset.key, o = t.data.data;
        if (o[i + "_" + n] = e.detail.value, 2 == n) {
            if (a.time_str(o[i + "_1"]) >= a.time_str(o[i + "_2"])) return void a.error("不小于开始时间");
            o[i] = o[i + "_1"] + "," + o[i + "_2"];
        }
        t.setData({
            data: o
        });
    },
    Image_del: function(e, t) {
        var i = a.pdata(t).index, n = a.pdata(t).key, o = e.data.data;
        a.removeByValue(o[n], i, function(t) {
            o[n] = t, e.setData({
                data: o
            });
        });
    },
    get_form_list: function(i, n, o) {
        app.siteInfo.form;
        var r = {}, l = "提交";
        a.get("index/form", {
            id: n
        }, function(t) {
            var e = t.info.list;
            if (0 == t.code) {
                if (1 == i && (wx.setNavigationBarTitle({
                    title: t.info.title ? decodeURIComponent(t.info.title) : "万能表单"
                }), 0 == e.length)) return void a.alert("表单内容为空");
                e.forEach(function(t) {
                    "picker" == t.module && (r[t.name] = 0), "time_one" == t.module && (r[t.name] = t.default), 
                    "time_two" == t.module && (r[t.name + "_1"] = t.default1, r[t.name + "_2"] = t.default2, 
                    t.default1 && t.default2 ? r[t.name] = t.default1 + "," + t.default2 : r[t.name] = ""), 
                    "pic_arr" == t.module && (r[t.name] = []), "region" == t.module && (r[t.name] = t.default, 
                    r[t.name + "_multi"] = [ 0, 0, 0 ]), "button" == t.module && (l = t.title);
                }), 1 == i && o.setData({
                    show: !0
                }), o.setData({
                    data: r,
                    button_name: l,
                    form: e,
                    form_id: n
                });
            } else a.alert(t.msg);
        }, !0);
    },
    to_str: function(i, n) {
        var t = [];
        for (var e in i) t.push({
            name: e,
            value: i[e]
        });
        return 0 < t.length ? (t.forEach(function(t) {
            for (var e = 0; e < n.length; e++) t.name == n[e].name && "checkbox" == n[e].module && (i[t.name] = i[t.name].join(","));
        }), i) : void a.error("表单不能为空");
    },
    validate: function(t, e, i) {
        var n = [], o = 0;
        for (var r in t) n.push({
            name: r,
            value: t[r]
        });
        if (0 < n.length) {
            for (var l = 0; l < n.length; l++) {
                var s = this.in_array(n[l].name, n[l].value, e);
                if (1 == s.code) {
                    o++, a.error(s.msg);
                    break;
                }
            }
            "function" == typeof i && i(o);
        } else a.error("表单不能为空");
    },
    in_array: function(e, a, t) {
        var i = {
            code: 0
        };
        return t.forEach(function(t) {
            if (t.name == e && t.empty && (!a || 0 == a.length)) return i.code = 1, i.msg = t.title + "不能为空", 
            i;
        }), i;
    },
    upload: function(e, a, i) {
        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0, o = this;
        wx.showActionSheet({
            itemList: [ "从相册中选择", "拍照" ],
            itemColor: "#f7982a",
            success: function(t) {
                t.cancel || (0 == t.tapIndex ? o.chooseWxImage("album", e, a, i, n) : 1 == t.tapIndex && o.chooseWxImage("camera", e, a, i, n));
            }
        });
    },
    chooseWxImage: function(t, e, i, n, o) {
        var r = getApp().siteInfo, l = e.data.data, s = r.siteroot + "?i=" + r.uniacid + "&t=undefined&v=" + r.version + "&from=wxapp&c=entry&a=wxapp&do=index_uploadFile&path=" + n + "&m=yb_mingpian&sign=5201314";
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ t ],
            success: function(t) {
                0 == o ? t.tempFilePaths.forEach(function(t) {
                    wx.uploadFile({
                        url: s,
                        filePath: t,
                        name: "file_upload",
                        success: function(t) {
                            console.log(t.data), null != t.data && "" != t.data ? (l[i] = l[i].concat(t.data), 
                            e.setData({
                                data: l
                            })) : a.error(data.msg);
                        }
                    });
                }) : wx.uploadFile({
                    url: s,
                    filePath: t.tempFilePaths[0],
                    name: "file_upload",
                    success: function(t) {
                        null != t.data && "" != t.data ? (console.log(t.data), l[i] = t.data, e.setData({
                            data: l
                        })) : a.error("上传失败，请重试");
                    }
                });
            }
        });
    },
    versionfunegt: function(t, e) {
        var a = t.replace(".", ""), i = e.replace(".", "");
        return !(parseFloat(a) < parseFloat(i));
    }
};