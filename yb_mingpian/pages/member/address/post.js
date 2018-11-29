var t = getApp(), e = t.requirejs("core"), i = t.requirejs("check");

Page({
    data: {
        id: "",
        posting: !1,
        subtext: "保存地址",
        detail: {
            consigner: "",
            phone: "",
            area: "",
            address: "",
            areaid: ""
        },
        showPicker: !1,
        pvalOld: [ 0, 0, 0 ],
        pval: [ 0, 0, 0 ],
        areas: [],
        street: [],
        streetIndex: 0,
        noArea: !1
    },
    get_wx_address: function() {
        var i = this, r = i.data.detail;
        wx.chooseAddress({
            success: function(e) {
                r.consigner = e.userName, r.phone = e.telNumber, r.address = e.detailInfo, r.province = e.provinceName, 
                r.city = e.cityName, r.area = e.countyName;
                var a = r.province + " " + r.city + " " + r.area, t = i.getIndex(a, i.data.areas);
                r.areaid = i.getareaid(a, i.data.areas), i.setData({
                    pvalOld: t,
                    pval: t,
                    detail: r
                });
            }
        });
    },
    onLoad: function(a) {
        this.setData({
            id: a.id,
            type: a.type,
            order: a.order,
            config: getApp().config
        }), this.getDetail(), a.id || wx.setNavigationBarTitle({
            title: "添加收货地址"
        });
        var t = this;
        e.get("area/GetArea", {}, function(e) {
            console.log(e), t.setData({
                areas: e.areas,
                type: a.type
            });
        });
    },
    getDetail: function() {
        var s = this, a = s.data.id;
        e.get("user/SingleAddress", {
            id: a,
            uid: getApp().getCache("userinfo").uid
        }, function(e) {
            var a = {
                show: !0
            };
            if (!i.isEmptyObject(e.info)) {
                wx.setNavigationBarTitle({
                    title: "编辑收货地址"
                });
                var t = e.info.province + " " + e.info.city + " " + e.info.district, r = s.getIndex(t, s.data.areas);
                a.pval = r, a.pvalOld = r, a.detail = e.info, a.detail.area = e.info.district;
            }
            s.setData(a);
        });
    },
    submit: function(a) {
        var t = this, i = this.data.id, r = e.pdata(a).type, s = t.data.detail;
        return s.uid = getApp().getCache("userinfo").uid, "" != s.consigner && s.consigner ? "" != s.phone && s.phone ? "" != s.city && s.city ? "" != s.address && s.address ? (t.setData({
            posting: !0
        }), void ("add" == r ? (console.log(s), e.get("user/CreateAddress", s, function(a) {
            if (0 != a.code) return t.setData({
                posting: !1
            }), void e.alert(a.msg);
            e.success("添加成功！"), setTimeout(function() {
                "add" == t.data.type && 1 == t.data.order ? wx.redirectTo({
                    url: "/yb_mingpian/pages/member/address/select"
                }) : wx.navigateBack();
            }, 1e3);
        })) : (s.id = i, e.get("user/UpdateAddress", s, function(a) {
            if (0 != a.code) return t.setData({
                posting: !1
            }), void e.alert(a.msg);
            e.success("修改成功！"), setTimeout(function() {
                "member" == t.data.type && 2 == t.data.order ? wx.redirectTo({
                    url: "/yb_mingpian/pages/member/address/select"
                }) : wx.navigateBack();
            }, 1e3);
        })))) : (e.toast("请填写详细地址"), !1) : (e.toast("请选择所在地区"), !1) : (e.toast("请填写联系电话"), 
        !1) : (e.toast("请填写收件人"), !1);
    },
    onChange: function(e) {
        var a = this.data.detail, t = e.currentTarget.dataset.type, r = i.trim(e.detail.value);
        a[t] = r, this.setData({
            detail: a
        });
    },
    selectArea: function(e) {
        var a = e.currentTarget.dataset.area, t = this.getIndex(a, this.data.areas);
        this.setData({
            pval: t,
            pvalOld: t,
            showPicker: !0
        });
    },
    getStreet: function(e, a) {
        if (e && a) {
            if (this.data.detail.province && this.data.detail.city && this.data.openstreet) e[a[0]].city[a[1]].code, 
            e[a[0]].city[a[1]].area[a[2]].code;
        }
    },
    bindChange: function(e) {
        var a = this.data.pvalOld, t = e.detail.value;
        a[0] != t[0] && (t[1] = 0), a[1] != t[1] && (t[2] = 0), this.setData({
            pval: t,
            pvalOld: t
        });
    },
    onCancel: function(e) {
        this.setData({
            showPicker: !1
        });
    },
    onConfirm: function(e) {
        var a = this.data.pval, t = this.data.areas, i = this.data.detail;
        i.province = t[a[0]].name, i.city = t[a[0]].city[a[1]].name, i.areaid = t[a[0]].city[a[1]].area[a[2]].id, 
        i.datavalue = t[a[0]].code + " " + t[a[0]].city[a[1]].code, t[a[0]].city[a[1]].area && 0 < t[a[0]].city[a[1]].area.length ? (i.area = t[a[0]].city[a[1]].area[a[2]].name, 
        i.datavalue += " " + t[a[0]].city[a[1]].area[a[2]].code, this.getStreet(t, a)) : i.area = "", 
        i.street = "", this.setData({
            detail: i,
            streetIndex: 0,
            showPicker: !1
        });
    },
    getIndex: function(e, a) {
        if ("" == i.trim(e) || !i.isArray(a)) return [ 0, 0, 0 ];
        var t = e.split(" "), r = [ 0, 0, 0 ];
        for (var s in a) if (a[s].name == t[0]) {
            for (var n in r[0] = Number(s), a[s].city) if (a[s].city[n].name == t[1]) {
                for (var d in r[1] = Number(n), a[s].city[n].area) if (a[s].city[n].area[d].name == t[2]) {
                    r[2] = Number(d);
                    break;
                }
                break;
            }
            break;
        }
        return console.log(r), r;
    },
    getareaid: function(e, a) {
        console.log(e);
        var t = null;
        if ("" == i.trim(e) || !i.isArray(a)) return t;
        var r = e.split(" ");
        for (var s in console.log(a), a) if (a[s].name == r[0]) {
            for (var n in a[s].city) if (a[s].city[n].name == r[1]) {
                for (var d in a[s].city[n].area) if (a[s].city[n].area[d].name == r[2]) {
                    console.log(a[s].city[n].area[d]), t = a[s].city[n].area[d].id;
                    break;
                }
                break;
            }
            break;
        }
        return console.log(t), t;
    }
});