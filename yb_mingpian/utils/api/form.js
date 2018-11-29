var app = getApp(), a = app.requirejs("core"), info = app.getCache("userinfo");

module.exports = {
    get_form_list: function(e, t) {
        app.siteInfo.form;
        var n = {}, i = "提交";
        a.get("index/form", {
            id: e
        }, function(e) {
            if (console.log(e), 0 == e.code) {
                wx.setNavigationBarTitle({
                    title: e.info.title ? decodeURIComponent(e.info.title) : "万能表单"
                });
                var o = e.info.list;
                if (0 == o.length) return void a.alert("表单内容为空");
                o.forEach(function(e) {
                    "picker" == e.module && (n[e.name] = 0), "time_one" == e.module && (n[e.name] = e.default), 
                    "time_two" == e.module && (n[e.name + "_1"] = e.default1, n[e.name + "_2"] = e.default2, 
                    e.default1 && e.default2 ? n[e.name] = e.default1 + "," + e.default2 : n[e.name] = ""), 
                    "pic_arr" == e.module && (n[e.name] = []), "region" == e.module && (n[e.name] = e.default, 
                    n[e.name + "_multi"] = [ 0, 0, 0 ]), "button" == e.module && (i = e.title);
                }), t.setData({
                    data: n,
                    show: !0,
                    button_name: i,
                    form: o
                });
            } else a.alert(e.msg);
        }, !0);
    },
    to_str: function(o, t) {
        var e = [];
        for (var n in o) e.push({
            name: n,
            value: o[n]
        });
        return 0 < e.length ? (e.forEach(function(e) {
            for (var a = 0; a < t.length; a++) e.name == t[a].name && "checkbox" == t[a].module && (o[e.name] = o[e.name].join(","));
        }), o) : void a.error("表单不能为空");
    },
    validate: function(e, o, t) {
        var n = [], i = 0;
        for (var r in e) n.push({
            name: r,
            value: e[r]
        });
        if (0 < n.length) {
            for (var l = 0; l < n.length; l++) {
                var u = this.in_array(n[l].name, n[l].value, o);
                if (1 == u.code) {
                    i++, a.error(u.msg);
                    break;
                }
            }
            "function" == typeof t && t(i);
        } else a.error("表单不能为空");
    },
    in_array: function(a, o, e) {
        var t = {
            code: 0
        };
        return e.forEach(function(e) {
            if (e.name == a && (console.log(a), console.log(o), e.empty && (!o || 0 == o.length))) return t.code = 1, 
            t.msg = e.title + "不能为空", t;
        }), t;
    },
    upload: function(a, o, t) {
        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0, i = this;
        wx.showActionSheet({
            itemList: [ "从相册中选择", "拍照" ],
            itemColor: "#f7982a",
            success: function(e) {
                e.cancel || (0 == e.tapIndex ? i.chooseWxImage("album", a, o, t, n) : 1 == e.tapIndex && i.chooseWxImage("camera", a, o, t, n));
            }
        });
    },
    chooseWxImage: function(e, t, n, o, i) {
        var r = getApp().siteInfo, l = t.data.data, u = r.siteroot + "?i=" + r.uniacid + "&t=undefined&v=" + r.version + "&from=wxapp&c=entry&a=wxapp&do=index_uploadFile&path=" + o + "&m=" + r.name + "&sign=5201314";
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ e ],
            success: function(e) {
                0 == i ? e.tempFilePaths.forEach(function(e) {
                    wx.uploadFile({
                        url: u,
                        filePath: e,
                        name: "file_upload",
                        success: function(e) {
                            if (console.log(e), null != e.data && "" != e.data) {
                                var o = a.json_parse(e.data);
                                console.log(o), 0 == o.code ? (l[n] = l[n].concat(o.info), t.setData({
                                    data: l
                                })) : a.error(o.msg);
                            }
                        }
                    });
                }) : wx.uploadFile({
                    url: u,
                    filePath: e.tempFilePaths[0],
                    name: "file_upload",
                    success: function(e) {
                        if (console.log(e), null != e.data && "" != e.data) {
                            var o = a.json_parse(e.data);
                            0 == o.code ? (l[n] = o.info, t.setData({
                                data: l
                            })) : a.error(o.msg);
                        }
                    }
                });
            }
        });
    }
};