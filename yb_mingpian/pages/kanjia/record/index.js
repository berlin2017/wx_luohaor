var app = getApp(), a = app.requirejs("core"), b = app.requirejs("api/kjb");

Page({
    data: {
        show: !1,
        list: []
    },
    onLoad: function(t) {
        a.setting(), this.setData(t), this.getList();
    },
    getList: function() {
        var a = this, t = a.data.id;
        b.BargainRecord(t, function(t) {
            a.setData(t);
        });
    },
    onPullDownRefresh: function() {
        this.getList(), wx.stopPullDownRefresh();
    }
});