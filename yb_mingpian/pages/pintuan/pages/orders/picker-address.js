var app = getApp();

Page({
    data: {
        addressInfo: {},
        addressVal: [ 0, 0, 0 ],
        addressData: {},
        from: !1
    },
    onLoad: function(e) {
        console.log(e), this.setData({
            from: e.from
        }), this.setAddress();
    },
    onReady: function() {},
    onShow: function() {
        this.setAddress();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    userAddress: function(e) {
        for (var s = e.currentTarget.dataset.id, t = 0; t < this.addressList.length; t++) this.addressList[t].id == s && (app.address = this.addressList[t], 
        wx.navigateBack());
    },
    setAddress: function() {
        var s = this;
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.request.wxRequest({
            url: "address-list",
            success: function(e) {
                s.addressList = e, wx.hideLoading(), s.setData({
                    address: e
                });
            }
        });
    },
    chooseWxAddress: function() {
        var t = this;
        wx.chooseAddress({
            success: function(e) {
                var s = {};
                s.userName = e.userName, s.province = e.provinceName, s.city = e.cityName, s.county = e.countyName, 
                s.address = e.detailInfo, s.telNumber = e.telNumber, app.request.wxRequest({
                    url: "address-edit",
                    data: s,
                    method: "POST",
                    success: function(e) {
                        t.setAddress();
                    }
                });
            }
        });
    },
    setDefault: function(e) {
        var s = this, t = e.currentTarget.dataset.id;
        app.request.wxRequest({
            url: "address-edit&act=setdefault&aid=" + t,
            success: function(e) {
                app.showToast(s, "设置成功"), s.setAddress();
            }
        });
    },
    delAddress: function(e) {
        var s = e.currentTarget.dataset.id, t = this;
        app.request.wxRequest({
            url: "address-edit&act=del&aid=" + s,
            success: function(e) {
                app.showToast(t, "删除成功"), t.setAddress();
            }
        });
    },
    bindblur: function(e) {
        var s = e.currentTarget.dataset.name, t = e.detail.value;
        this.data.addressInfo[s] = t;
    },
    editAddress: function(e) {
        var s = e.currentTarget.dataset.id;
        console.log(s), wx.navigateTo({
            url: "/pages/member/edit-address?id=" + s
        });
    },
    onKeyAddress: function(e) {
        wx.chooseAddress({
            success: function(e) {
                console.log(e);
                var s = {};
                s.userName = e.userName, s.province = e.provinceName, s.city = e.cityName, s.county = e.countyName, 
                s.address = e.detailInfo, s.telNumber = e.telNumber, wx.showLoading({
                    title: "正在保存",
                    mask: !0
                }), app.request.wxAsk({
                    url: "address/edit",
                    data: s,
                    method: "POST",
                    success: function(e) {
                        wx.hideLoading(), 0 == e.code && (app.address = e.data, wx.navigateBack());
                    }
                });
            }
        });
    }
});