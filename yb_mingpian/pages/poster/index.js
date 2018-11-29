var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        path: ""
    },
    onLoad: function(o) {
        o.id || a.jump("", 5);
        var n = t.siteInfo.siteroot + "?i=" + t.siteInfo.uniacid + "&t=undefined&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=Poster_cardposter&m=yb_mingpian&sign=269f5514d3294577b554cf28092fcf05&staff_id=" + o.id;
        console.log(n), this.setData({
            path: n
        });
    },
    download: function() {
        console.log(3333333);
        a.loading("下载中..."), wx.downloadFile({
            url: this.data.path,
            success: function(o) {
                if (console.log(o), 200 === o.statusCode) {
                    var t = o.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: t,
                        success: function(o) {
                            a.hideLoading(), wx.showToast({
                                title: "保存成功",
                                icon: "success",
                                duration: 2e3
                            });
                        }
                    });
                } else a.hideLoading(), a.alert("下载失败,请稍后重试");
            }
        });
    },
    previewImage: function(o) {
        var t = this.data.path;
        wx.previewImage({
            current: t,
            urls: [ t ]
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});